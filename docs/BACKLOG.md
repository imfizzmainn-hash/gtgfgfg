# PETID Backlog

## P0 — unblock a trustworthy audit

- [ ] Locate the source for PETID v1.8.5 and v1.10.
- [ ] Inventory existing code, assets, documentation, and Git history.
- [ ] Run the existing prototype using its own instructions.
- [ ] Map screens and routes to verified, demo-only, missing, or broken states.
- [ ] Record the exact commands and results of available tests.
- [ ] Compare the source against Master Specification v4.0.
- [ ] Preserve a known-good baseline before making application changes.

## P1 — after source and product gates

- [ ] Agree on a small, testable MVP vertical slice.
- [ ] Define data ownership, clinic isolation, roles, and access rules for that slice.
- [ ] Implement and test the backend behavior before presenting it as functional UI.
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
**Result:** The repository was empty; application audit and tests remain blocked because source code is absent.

### Next sprint proposal: SOURCE-01 — Recover and audit prior source

**Goal:** establish whether the previous PETID prototype can be safely continued.

**Acceptance criteria:**
- Source files are available and inventoried.
- Existing routes and primary flows are documented.
- The app is run using its existing instructions, if possible.
- Available tests have recorded results.
- A keep / repair / rebuild recommendation is supported by repository evidence.

**Out of scope:** creating replacement application code before the source audit and baseline decision.
