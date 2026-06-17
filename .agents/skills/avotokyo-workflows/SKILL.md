---
name: avotokyo-workflows
description: Use avotokyo/workflows reusable GitHub Actions for TypeScript/Vite+ projects. Use when wiring CI/CD, choosing check/test/release/coverage workflows, or referencing avotokyo/workflows actions.
metadata:
  author: avotokyo
  version: "2026.6.17"
  source: https://github.com/avotokyo/workflows
---

# avotokyo/workflows

Reusable GitHub Actions for TypeScript / Vite+ (`vp`) projects.

Repo: `avotokyo/workflows`. Pin with `@main` or a release tag.

**Important:** Workflows go in `.github/workflows/` (job-level `uses:`). Actions go in `actions/` (step-level `uses:`). Default commands: `vp check`, `vp run build`, `vp test`.

> Based on avotokyo/workflows, updated 2026-06-17.

## Composite Workflows

Recommended entry points. Read one file when implementing.

| Topic     | Description             | Reference                                                |
| --------- | ----------------------- | -------------------------------------------------------- |
| Unit Test | Check + matrix test CI  | [composite-unit-test](references/composite-unit-test.md) |
| Release   | Changelog + npm publish | [composite-release](references/composite-release.md)     |

## Workflows

Single-job reusable workflows. Compose manually when you need finer control.

| Topic     | Description              | Reference                                              |
| --------- | ------------------------ | ------------------------------------------------------ |
| Check     | Lint/check on one OS     | [workflow-check](references/workflow-check.md)         |
| Test      | Matrix OS × Node test    | [workflow-test](references/workflow-test.md)           |
| Coverage  | Coverage test + Codecov  | [workflow-coverage](references/workflow-coverage.md)   |
| Changelog | GitHub Release changelog | [workflow-changelog](references/workflow-changelog.md) |
| Publish   | Build + npm publish      | [workflow-publish](references/workflow-publish.md)     |
| Autofix   | Auto-fix and commit      | [workflow-autofix](references/workflow-autofix.md)     |

## Actions

Composite steps for custom jobs.

| Topic          | Description                  | Reference                                                    |
| -------------- | ---------------------------- | ------------------------------------------------------------ |
| Setup          | Checkout + Vite+ environment | [action-setup](references/action-setup.md)                   |
| Run            | Execute a shell command      | [action-run](references/action-run.md)                       |
| Changelog      | Run changelogithub (step)    | [action-changelog](references/action-changelog.md)           |
| Publish NPM    | vp pm publish (step)         | [action-publish-npm](references/action-publish-npm.md)       |
| Upload Codecov | Codecov OIDC upload (step)   | [action-upload-codecov](references/action-upload-codecov.md) |
| Autofix Commit | autofix-ci commit (step)     | [action-autofix-commit](references/action-autofix-commit.md) |

## Best Practices

| Topic                   | Description                        | Reference                                                  |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------- |
| Permissions & Migration | Required permissions, legacy paths | [best-practices-usage](references/best-practices-usage.md) |

## Quick Reference

```yaml
# Workflow — under jobs
jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/unit-test.yml@main

# Action — under steps
steps:
  - uses: avotokyo/workflows/actions/setup@main
```

Read **one** reference file for the component you need. Do not load all references at once.
