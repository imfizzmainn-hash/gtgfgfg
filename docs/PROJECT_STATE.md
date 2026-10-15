# PETID Project State

**Last updated:** 2026-10-15  
**Current phase:** Source recovery and preliminary audit

## Verified facts

- The GitHub repository is public and uses the `main` branch.
- It was empty before project documentation was added.
- It now contains the v4.0 master specification, project tracking documents, and an archived standalone v1.8 HTML demo.
- The archived snapshot is not the v1.8.5 package or the modular v1.10 source tree.
- All 14 embedded scripts in the archived snapshot pass Node syntax checks.
- A Node harness reproduced a data-recovery issue documented in `docs/AUDIT_REPORT.md`.
- No browser, UI, cross-browser, or E2E tests have been run.
- The repository has no backend, database schema, migrations, or deployment configuration.

## Current status

| Component | Status |
|---|---|
| Master specification | Available as `docs/MASTER_SPEC_v4.0.md` |
| v1.8 standalone demo | Archived for audit; preliminary static review complete |
| v1.8.5 source | Not recovered |
| Modular v1.10 source | Incomplete; shell and audit notes found, referenced modules missing |
| Backend and production access controls | Not present |
| Tests | Syntax checks and one focused Node harness only |
| Production readiness | Not ready |

## Blockers

1. The complete v1.8.5 package and v1.10 source tree are not in this repository.
2. Browser behavior and cross-browser flows remain unverified.
3. The archived demo uses local browser storage and simulated access grants, so it cannot handle real medical or personal data.
4. Open product and architecture decisions in v4.0 still need resolution.

## Next action

Recover the complete v1.8.5 and v1.10 artifacts, including tests, then inventory and run them according to their original instructions. Keep the v1.8 snapshot as historical audit evidence; do not use it as the new application baseline without an explicit baseline decision.
