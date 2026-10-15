# PETID Project State

**Last updated:** 2026-10-15  
**Current phase:** Clickable v2.0 demo implementation and verification  
**Working branch:** prototype-v2-demo

## Verified facts

- The v4.0 master specification and historical audit materials remain available on the repository's default main branch.
- The unchanged v1.8 snapshot and the separate v1.8 recovery workbench remain preserved.
- A separate clickable v2.0 demo is available under prototype/v2-demo/ on prototype-v2-demo.
- The demo includes seven public pages and clinic, owner, and platform-admin views, using synthetic data and browser-local persistence.
- Core domain tests pass: 7 tests. node --check passes for app.js, domain.js, and seed.js.
- A local static-server smoke check returned HTTP 200 for the main page and its JavaScript/CSS assets.
- Browser visual, accessibility, and end-to-end checks have not been completed. The available cloud browser could not reach the local server.
- The Windows launcher has not been run on Windows.
- No production backend, authentication, server-side authorization, database, or deployment configuration is present.

## Current status

| Component | Status |
|---|---|
| Master specification | Available as docs/MASTER_SPEC_v4.0.md |
| v1.8 archived demo | Preserved unchanged as historical audit material |
| v1.8 recovery workbench | Candidate recovery fix; 4 Node tests pass; browser verification pending |
| v1.8.5 and full v1.10 source | Not recovered; historical audit remains incomplete |
| Clickable v2.0 demo | Implemented on prototype-v2-demo; domain tests and syntax checks pass |
| Browser visual and end-to-end QA | Pending |
| Production readiness | Not ready; demo is synthetic-only |

## Current blockers and limits

1. Full browser interaction and responsive layout QA remain unverified.
2. The demo uses local browser storage and simulated roles; it cannot handle real medical or personal data.
3. Historical v1.8.5/v1.10 source packages remain unavailable, so their audit is still incomplete.
4. Production architecture, privacy, legal, identity, and authorization decisions remain open in the v4.0 decision register.

## Next action

Run the v2.0 demo in an environment where a browser can access its local server, then manually verify the quick test path in prototype/v2-demo/README.md. Fix any issues found and record the browser and viewport used. Keep all demo data synthetic; do not treat the prototype as production-ready.
