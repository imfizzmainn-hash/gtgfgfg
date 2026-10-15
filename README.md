# PETID

PETID is a project for organizing and sharing an animal's health history with clear document provenance and controlled access.

## Project status

This repository contains the PETID Master Development Specification v4.0, project tracking documents, and historical v1.8/v1.9/v1.10 audit materials. The v1.8 standalone demo is preserved for review; the v1.10 source tree and v1.8.5 package are incomplete or missing. Nothing here is a production application.

## Start here

- [Master specification v4.0](docs/MASTER_SPEC_v4.0.md)
- [Repository and prototype audit](docs/AUDIT_REPORT.md)
- [Current project state](docs/PROJECT_STATE.md)
- [Decision register](docs/DECISIONS.md)
- [Backlog](docs/BACKLOG.md)
- [Archived v1.8 snapshot notes](archive/prototypes/v1.8/README.md)
- [Archived v1.8 standalone HTML](archive/prototypes/v1.8/PETID_Demo_v1_8_PODGLAD.html)
- [Recovered v1.10 audit notes](archive/prototypes/v1.10/README.md)

## Development principles

- Audit existing code before replacing or rebuilding it.
- Keep real animal and owner data out of development and demo environments.
- Use synthetic data until the separate production-readiness gate is passed.
- Record what was actually run and tested; never mark unverified work as complete.
