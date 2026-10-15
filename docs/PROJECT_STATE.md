# PETID Project State

**Last updated:** 2026-10-15  
**Current phase:** Source recovery and preliminary audit

## Verified facts

- The GitHub repository is public and uses the `main` branch.
- It contains the v4.0 master specification, project tracking documents, the unchanged archived v1.8 snapshot, and recovered v1.9/v1.10 notes.
- A separate v1.8 recovery workbench contains a candidate guard for malformed local data and a persistent UI warning.
- All 14 inline scripts in the workbench pass Node syntax checks.
- The workbench recovery test suite passes: 3 tests.
- The archive was verified byte-identical to the recovered v1.8 source.
- No browser, UI, cross-browser, or E2E tests have been run.
- No backend, database schema, migrations, or deployment configuration is present.

## Current status

| Component | Status |
|---|---|
| Master specification | Available as `docs/MASTER_SPEC_v4.0.md` |
| v1.8 archived demo | Preserved unchanged as historical audit material |
| v1.8 recovery workbench | Candidate recovery fix; 3 Node tests pass; browser verification pending |
| v1.8.5 source | Not recovered |
| Modular v1.10 source | Incomplete; notes recovered, referenced modules missing |
| Backend and production access controls | Not present |
| Production readiness | Not ready |

## Blockers

1. The complete v1.8.5 package and v1.10 source tree are not available.
2. The recovery warning and reset flow still need browser verification.
3. The demo uses browser storage and simulated grants, so it cannot handle real medical or personal data.
4. Open product and architecture decisions in v4.0 still need resolution.

## Next action

Verify the workbench recovery flow in a browser with malformed JSON and a deliberately invalid data shape. Then recover the complete v1.8.5/v1.10 packages and audit them before choosing a baseline. Keep the v1.8 archive unchanged.
