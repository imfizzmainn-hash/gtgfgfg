# PETID v1.8 recovery workbench

This is a separate working copy of the archived v1.8 standalone demo. The original under `archive/prototypes/v1.8/` remains unchanged.

## Change in this copy

The data adapter now detects malformed JSON and invalid record shapes, preserves the original raw value in `petid_clinic_demo_v1_corrupt_backup`, and blocks regular saves. The dashboard shows a persistent warning. The existing “Przywróć dane demonstracyjne” action is the explicit reset path; it can write the fictional seed data and unlock normal saves. The quarantine copy is retained after reset.

This is a local demo recovery improvement. It does not add authentication, server storage, tenant isolation, or production security.

## Verification

Run from this directory:

```sh
node --test tests/recovery.test.cjs
```

The tests cover malformed JSON preservation and write blocking, normal load/save, and invalid JSON record shape. All 14 inline scripts also pass `node --check`.

No browser or end-to-end test has been run yet.
