# PETID Backlog

## P0 — establish a trustworthy baseline

- [ ] Recover the complete v1.8.5 package, including its legacy directory.
- [ ] Recover the complete v1.10 source tree (`js/`, `css/`, and `tests/`).
- [x] Archive the recovered standalone v1.8 HTML snapshot as historical audit material.
- [x] Run syntax checks on the 14 inline scripts in that snapshot.
- [x] Reproduce the malformed-localStorage recovery issue with a Node harness.
- [ ] Run the complete available prototypes using their original instructions.
- [ ] Map routes and flows to verified, demo-only, missing, or broken states.
- [ ] Compare the complete source against Master Specification v4.0.
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

**Status:** In progress; preliminary review completed for one standalone v1.8 snapshot.

**Completed:** archived the snapshot; syntax-checked its 14 inline scripts; reproduced one P2 local-data recovery issue.

**Remaining:** recover v1.8.5 and v1.10 packages; run their original instructions and tests; audit routes and flows; make a documented baseline decision.

**Out of scope:** creating replacement application code before the source audit and baseline decision.
