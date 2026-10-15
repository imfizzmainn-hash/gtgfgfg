# PETID Repository and Prototype Audit

**Audit date:** 2026-10-15  
**Repository:** `imfizzmainn-hash/gtgfgfg`  
**Branch:** `main`  
**Visibility:** Public

## Scope and provenance

The repository was initially empty. It now contains the v4.0 specification, tracking documents, an unchanged standalone v1.8 snapshot, and recovered v1.9/v1.10 architecture and audit notes.

The v1.8 snapshot is historical demo material, not the v1.8.5 package or modular v1.10 source tree. A separate working copy at `workbench/v1.8-recovery/` contains a candidate mitigation for the data-loss issue found in the archived file. The archive remains byte-identical to the recovered source.

## Checks performed

- Inspected the standalone v1.8 HTML and embedded JavaScript.
- Confirmed the original snapshot has no external script or stylesheet dependencies and has 14 inline script blocks.
- Compared the archived file's Git blob ID with the recovered local source; they match.
- Ran `node --check` on all 14 inline scripts in the workbench copy: all passed.
- Ran `node --test workbench/v1.8-recovery/tests/recovery.test.cjs`: 4 tests passed.
- Confirmed the GitHub blobs for the workbench HTML and test file match the local files.
- Did not run a browser, UI, cross-browser, attachment, or end-to-end test suite.

## Findings

### PETID-18-01 — P2 — malformed local data can be overwritten by seed data in the archived snapshot

**File:** `archive/prototypes/v1.8/PETID_Demo_v1_8_PODGLAD.html:104-105`

**Evidence:** `load()` catches JSON parsing errors and silently returns a clone of the seed state. A later `save()` writes that state to the same localStorage key.

**Reproduction:** Set `petid_clinic_demo_v1` to malformed JSON; call `PETIDStore.load(seed)`; then save the returned state. The malformed value is replaced by the seed state. This was confirmed with a Node harness.

**Impact:** Locally saved demo records can be lost if the stored JSON is corrupted and the user performs a later save.

**Candidate mitigation:** `workbench/v1.8-recovery/` preserves the malformed value in `petid_clinic_demo_v1_corrupt_backup`, blocks normal data and workflow writes, shows a persistent warning, and permits writing seed data only through the explicit reset path. Three Node regression tests cover malformed JSON, valid data, and invalid record shape. The workbench UI could not be verified in a browser because no Chromium executable is installed in the environment.

### PETID-18-02 — P1 production-readiness blocker — browser storage is not an authorization boundary

**Evidence:** The demo persists application state and simulated sharing grants in browser storage; attachments use IndexedDB. The UI states there is no login or server-side security.

**Impact:** A browser user can inspect or change local records and simulated grants. This implementation cannot protect real medical or personal data or establish access control between owners and clinics.

**Recommendation:** Keep the demo synthetic-only. Before production use, implement server-side identity, authorization, tenant isolation, secure file storage, and auditable access controls, then test those controls against the v4.0 requirements.

No exploitable XSS issue was confirmed in this limited static review. Several `innerHTML` rendering paths were observed; a complete taint review has not been performed.

## Specification coverage

| Area | Evidence | Status |
|---|---|---|
| Archived v1.8 demo | One unchanged standalone HTML snapshot | Present for limited audit |
| v1.8 recovery workbench | Separate candidate fix and 3 passing Node regression tests | Implemented; browser review pending |
| v1.8.5 source/package | Not recovered; a saved architecture note refers to `legacy-v1.8.5/` | Unverified |
| v1.10 source/package | Audit notes are archived; referenced JS/CSS modules and tests are missing | Incomplete |
| Backend, database, authentication, tenant rules | No implementation evidence | Not present |
| Browser and E2E behavior | Not run | Unverified |
| Production readiness | No production controls demonstrated | Not ready |

## Limitations and next action

This is a preliminary audit of one historical demo, not a complete audit of v1.8.5 or v1.10. The workbench fix has unit-level coverage but has not been launched in a browser. Next, exercise the warning and explicit reset in a browser, then recover the complete v1.8.5 and v1.10 packages before deciding on a development baseline.

**Repository inventory:** complete for the current GitHub contents.  
**Historical v1.8 static review:** one reproducible P2 finding.  
**Recovery mitigation:** implemented in a separate workbench copy; 3 regression tests pass.  
**Audit of v1.8.5/v1.10:** blocked by missing source packages.
