# PETID Backlog

## P0 — establish a trustworthy baseline

- [ ] Recover the complete v1.8.5 package, including its legacy directory.
- [ ] Recover the complete v1.10 source tree (`js/`, `css/`, and `tests/`).
- [x] Archive the recovered standalone v1.8 HTML snapshot unchanged.
- [x] Run syntax checks on the 14 inline scripts in the workbench copy.
- [x] Reproduce the malformed-localStorage recovery issue.
- [x] Add a separate recovery workbench and 3 Node regression tests.
- [ ] Verify the workbench warning and reset flow in a browser.
- [ ] Run recovered prototypes using their original instructions.
- [ ] Map routes and flows to verified, demo-only, missing, or broken states.
- [ ] Compare complete source against Master Specification v4.0.
- [ ] Decide which version, if any, is a safe development baseline.

## P1 — after source and product gates

- [ ] Agree on a small, testable MVP vertical slice.
- [ ] Define data ownership, clinic isolation, roles, and access rules for that slice.
- [ ] Implement and test backend behavior before presenting it as functional UI.
- [ ] Add integration and authorization tests for the agreed flow.

## P2 — after MVP validation

- [ ] Evaluate document import and selected clinic-system integrations.
- [ ] Validate clinic usability and the cost of duplicate data entry.
- [ ] Revisit pricing and hosting assumptions using current evidence.

## P3 — deferred by v4.0

- [ ] OCR and advanced AI agents.
- [ ] Payments, scheduling, inventory, native mobile apps, and broad integrations.
- [ ] International expansion and automatic cross-clinic data access.

## Current sprint

### AUDIT-01 — Repository inventory

**Status:** Complete for the available GitHub repository.

### SOURCE-01 — Recover and audit prior source

**Status:** In progress; preliminary v1.8 audit and separate recovery workbench completed.

**Remaining:** browser-test the workbench; recover v1.8.5 and v1.10 packages; run their instructions and tests; audit routes and flows; make a documented baseline decision.

**Out of scope:** creating replacement application code before the source audit and baseline decision.
