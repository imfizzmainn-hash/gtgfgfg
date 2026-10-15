const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '../PETID_Demo_v1_8_RECOVERY.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map(match => match[1]);

function createApp(initial = {}) {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
  };
  const context = { localStorage: storage, structuredClone, console };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(scripts[0], context);
  vm.runInContext(scripts[2], context);
  return { context, storage, values, store: context.PETIDStore, transaction: context.PETIDDemoTransaction };
}

const seed = { patients: [], visits: [], documents: [], vaccinations: [], medications: [] };

test('malformed JSON is quarantined and writes stay blocked until explicit reset', () => {
  const malformed = '{broken-json';
  const app = createApp({ petid_clinic_demo_v1: malformed });
  const data = app.store.load(seed);
  assert.equal(app.store.recoveryRequired(), true);
  assert.equal(app.store.recoveryBackupSaved(), true);
  const backupKey = [...app.values.keys()].find(key => key.startsWith('petid_clinic_demo_v1_corrupt_backup_'));
  assert.ok(backupKey);
  assert.equal(app.values.get(backupKey), malformed);
  assert.throws(() => app.store.save(data), /Zapis zablokowany/);
  assert.throws(() => app.transaction.commit({ petid_clinic_demo_v1: JSON.stringify(data) }), /Zapis zablokowany/);
  assert.equal(app.values.get('petid_clinic_demo_v1'), malformed);

  app.transaction.commit({ petid_clinic_demo_v1: JSON.stringify(seed) }, app.storage, { allowRecoveryReset: true });
  app.store.clearRecoveryLock();
  assert.equal(app.store.recoveryRequired(), false);
  assert.equal(app.store.save(data), true);
  assert.equal(app.values.get(backupKey), malformed);
});

test('valid saved state continues to load and save normally', () => {
  const saved = { ...seed, patients: [{ id: 'p1', name: 'Rex', owner: 'Jan' }] };
  const app = createApp({ petid_clinic_demo_v1: JSON.stringify(saved) });
  const data = app.store.load(seed);
  assert.equal(app.store.recoveryRequired(), false);
  assert.equal(data.patients[0].id, 'p1');
  assert.equal(app.store.save(data), true);
});

test('valid JSON with an invalid record shape is treated as recoverable corruption', () => {
  const raw = JSON.stringify({ patients: 'wrong-shape' });
  const app = createApp({ petid_clinic_demo_v1: raw });
  app.store.load(seed);
  assert.equal(app.store.recoveryRequired(), true);
  const backupKey = [...app.values.keys()].find(key => key.startsWith('petid_clinic_demo_v1_corrupt_backup_'));
  assert.ok(backupKey);
  assert.equal(app.values.get(backupKey), raw);
  assert.throws(() => app.store.save(seed), /Zapis zablokowany/);
});


test('a new corrupt value is preserved without replacing an earlier quarantine copy', () => {
  const earlier = 'previous-corrupt-value';
  const current = '{new-corrupt-value';
  const app = createApp({
    petid_clinic_demo_v1: current,
    petid_clinic_demo_v1_corrupt_backup_old: earlier,
  });
  app.store.load(seed);
  assert.equal(app.values.get('petid_clinic_demo_v1_corrupt_backup_old'), earlier);
  const newBackupKey = [...app.values.keys()].find(key => key.startsWith('petid_clinic_demo_v1_corrupt_backup_') && key !== 'petid_clinic_demo_v1_corrupt_backup_old');
  assert.ok(newBackupKey);
  assert.equal(app.values.get(newBackupKey), current);
});
