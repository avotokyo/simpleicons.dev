---
name: avotokyo-workflows
description: Use avotokyo/workflows reusable GitHub Actions for TypeScript/Vite+ projects. Use when wiring CI/CD, choosing check/test/release/coverage workflows, or referencing avotokyo/workflows actions.
metadata:
  author: avotokyo
  version: "2026.6.19"
  source: https://github.com/avotokyo/workflows
---

# avotokyo/workflows

Reusable GitHub Actions for TypeScript / Vite+ (`vp`) projects.

Repo: `avotokyo/workflows`. Pin with `@main` or a release tag.

**Important:** Workflows go in `.github/workflows/` (job-level `uses:`). Actions go in `actions/` (step-level `uses:`). Default commands: `vp check`, `vp run build`, `vp test`.

> Based on avotokyo/workflows, updated 2026-06-19.

## Documentation

| Doc                                   | Audience | Content                                                                   |
| ------------------------------------- | -------- | ------------------------------------------------------------------------- |
| [README](../../README.md)             | Humans   | Quick install, recommended entry points, minimal CI / release examples    |
| [ARCHITECTURE](../../ARCHITECTURE.md) | Humans   | Directory layout, three-layer model, composition patterns                 |
| This skill                            | Agents   | Full component inventory, inputs, permissions, patterns, extension guides |

Read **one** reference file below for the component you need. Do not load all references at once.

## Full Component Inventory

### Composite Workflows

Recommended entry points.

| Name      | Workflow file   | Description                   | Reference                                                          |
| --------- | --------------- | ----------------------------- | ------------------------------------------------------------------ |
| Unit Test | `unit-test.yml` | Check + matrix test CI        | [composite-unit-test](references/workflows/composite-unit-test.md) |
| Release   | `release.yml`   | Changelog + publish by `type` | [composite-release](references/workflows/composite-release.md)     |

### Atomic Workflows

Single-job workflows. Compose manually for finer control.

| Name           | Workflow file                | Description                     | Reference                                                                |
| -------------- | ---------------------------- | ------------------------------- | ------------------------------------------------------------------------ |
| Check          | `ci-check.yml`               | Lint/check on one OS            | [ci-check](references/workflows/ci-check.md)                             |
| Test           | `ci-test.yml`                | Matrix OS × Node test           | [ci-test](references/workflows/ci-test.md)                               |
| Coverage       | `ci-coverage.yml`            | Coverage test + Codecov         | [ci-coverage](references/workflows/ci-coverage.md)                       |
| Autofix        | `ci-autofix.yml`             | Auto-fix and commit             | [ci-autofix](references/workflows/ci-autofix.md)                         |
| Changelog      | `release-changelog.yml`      | GitHub Release changelog        | [release-changelog](references/workflows/release-changelog.md)           |
| Publish        | `release-publish.yml`        | Dispatch publish by `type`      | [release-publish](references/workflows/release-publish.md)               |
| Publish NPM    | `release-publish-npm.yml`    | Build + npm Registry publish    | [release-publish-npm](references/workflows/release-publish-npm.md)       |
| Publish GitHub | `release-publish-github.yml` | Build + GitHub Packages publish | [release-publish-github](references/workflows/release-publish-github.md) |

### Actions

Composite steps for custom jobs.

| Name           | Path                                  | Description                  | Reference                                                                        |
| -------------- | ------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| Setup          | `actions/core/setup`                  | Checkout + Vite+ environment | [core-setup](references/actions/core-setup.md)                                   |
| Run            | `actions/core/run`                    | Execute a shell command      | [core-run](references/actions/core-run.md)                                       |
| Changelog      | `actions/release/changelog`           | Run changelogithub (step)    | [release-changelog](references/actions/release-changelog.md)                     |
| Publish        | `actions/release/publish`             | `vp pm publish` by `type`    | [release-publish](references/actions/release-publish.md)                         |
| Upload Codecov | `actions/integrations/upload-codecov` | Codecov OIDC upload          | [integrations-upload-codecov](references/actions/integrations-upload-codecov.md) |
| Autofix Commit | `actions/integrations/autofix-commit` | autofix-ci commit            | [integrations-autofix-commit](references/actions/integrations-autofix-commit.md) |

## Best Practices

| Topic | Description                                                        | Reference                                                         |
| ----- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Usage | Permissions, paths, matrix format, CI + coverage, choosing a layer | [best-practices-usage](references/guides/best-practices-usage.md) |

## Quick Reference

```yaml
# Workflow — under jobs
jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/unit-test.yml@main

# Action — under steps
steps:
  - uses: avotokyo/workflows/actions/core/setup@main
```
