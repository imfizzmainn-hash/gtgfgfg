# PETID

PETID is a project for organizing and sharing an animal's health history with clear document provenance and controlled access.

## Project status

The default branch contains the PETID Master Development Specification v4.0, historical audit materials, project tracking documents, an unchanged archived v1.8 snapshot, and a separate v1.8 recovery workbench. The clickable v2.0 demo is in the [prototype-v2-demo branch](https://github.com/imfizzmainn-hash/gtgfgfg/tree/prototype-v2-demo/prototype/v2-demo). Its domain tests and syntax checks pass; browser visual QA is pending. Nothing here is a production application.

## Start here

- [Master specification v4.0](docs/MASTER_SPEC_v4.0.md)
- [Repository and prototype audit](docs/AUDIT_REPORT.md)
- [Current project state](docs/PROJECT_STATE.md)
- [Decision register](docs/DECISIONS.md)
- [Backlog](docs/BACKLOG.md)
- [Archived v1.8 snapshot](archive/prototypes/v1.8/README.md)
- [Recovered v1.10 audit notes](archive/prototypes/v1.10/README.md)
- [v1.8 recovery workbench and tests](workbench/v1.8-recovery/README.md)

## Development principles

- Audit existing code before replacing or rebuilding it.
- Keep real animal and owner data out of development and demo environments.
- Use synthetic data until the separate production-readiness gate is passed.
- Record what was actually run and tested; never mark unverified work as complete.
