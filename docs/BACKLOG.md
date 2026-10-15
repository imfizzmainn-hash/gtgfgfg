# PETID Backlog

## P0 — preserve evidence and historical source

- [x] Archive the recovered standalone v1.8 HTML snapshot unchanged.
- [x] Keep the v1.8 recovery workbench separate from the archive.
- [x] Run Node syntax checks on the 14 inline scripts in the workbench copy.
- [x] Reproduce the malformed-localStorage recovery issue.
- [x] Add recovery regression tests (4 tests pass).
- [ ] Verify the recovery workbench warning and reset flow in a browser.
- [ ] Recover the complete v1.8.5 package and v1.10 source tree if they become available.
- [ ] Complete the historical source audit if those packages are recovered.

## P1 — finish and verify clickable v2.0 demo

- [x] Build a standalone, no-dependency browser demo on prototype-v2-demo.
- [x] Add seven public pages and clinic, owner, and platform-admin demo views.
- [x] Implement synthetic patient, visit, correction, document-provenance, care-record, and owner-request flows.
- [x] Keep signed visit notes immutable and append corrections.
- [x] Keep demo data local; add export, reset, and corrupted-storage recovery handling.
- [x] Add a Windows 11 launcher and run instructions.
- [x] Pass 7 domain tests, JavaScript syntax checks, and the local HTTP asset smoke check.
- [ ] Run the documented manual path in a real browser and inspect responsive layouts.
- [ ] Verify the Windows launcher on Windows 11 with Node.js 20 or newer.
- [ ] Fix and retest issues found in browser QA.

## P2 — production discovery, only after prototype review

- [ ] Resolve data ownership, clinic isolation, roles, and access rules.
- [ ] Define backend identity, authorization, audit, and retention requirements.
- [ ] Validate clinic usability and the cost of duplicate data entry.
- [ ] Evaluate document import and selected clinic-system integrations.
- [ ] Revisit pricing and hosting assumptions using current evidence.

## P3 — deferred by v4.0

- [ ] OCR and advanced AI agents.
- [ ] Payments, scheduling, inventory, native mobile apps, and broad integrations.
- [ ] International expansion and automatic cross-clinic data access.

## Current sprint

### DEMO-02 — clickable v2.0 prototype

**Status:** Implemented; code-level checks pass. Browser visual and end-to-end QA remain pending.

**Scope:** Synthetic data and local browser storage only. Role switching is simulated. No production backend, real authentication, server-side authorization, secure file storage, or real form submission.

**Next:** Run the quick path in prototype/v2-demo/README.md in a browser that can access the local server. Record the browser, viewport, and results before calling the prototype visually verified.
