---
name: best-practices-usage
description: Permissions, path conventions, and matrix input format for avotokyo/workflows
---

# Usage Best Practices

## Path Conventions

```yaml
# Workflow — job level
uses: avotokyo/workflows/.github/workflows/<name>.yml@main

# Action — step level
uses: avotokyo/workflows/actions/<name>@main
```

Pin `@main` or a release tag.

## Required Permissions

| Workflow / `type`              | Caller must pass                     |
| ------------------------------ | ------------------------------------ |
| `coverage.yml`                 | `id-token: write`                    |
| `release.yml`, `publish.yml` + `npm` | `contents: write`, `id-token: write` |
| `release.yml`, `publish.yml` + `github` | `contents: write`, `packages: write` |
| `publish-npm.yml`              | `contents: write`, `id-token: write` |
| `publish-github.yml`           | `contents: read`, `packages: write`  |

```yaml
# npm (default)
permissions:
  contents: write
  id-token: write

# GitHub Packages
permissions:
  contents: write
  packages: write
```

## Publish Type Architecture

Publish targets are **one implementation per type**, routed by thin dispatchers:

| Layer    | Entry (with `type`) | Implementation per type                           |
| -------- | ------------------- | ------------------------------------------------- |
| Workflow | `publish.yml`       | `publish-npm.yml`, `publish-github.yml`, …        |
| Action   | —                   | `publish`（`type` 区分 registry）                 |

Callers pass `type` to `publish.yml`; it forwards to the matching implementation workflow.

## Adding a Publish Type

To add e.g. `type: verdaccio`:

1. **Action** — extend `actions/publish/action.yml` with a new `type` branch, or split setup into the per-type workflow only
2. **Workflow** — `.github/workflows/publish-verdaccio.yml` (setup, optional build, publish action)
3. **Dispatcher** — add one conditional job to `.github/workflows/publish.yml`
4. **Docs** — add `workflow-publish-verdaccio.md`, update [workflow-publish](workflow-publish.md) type table

No changes needed in [composite-release](composite-release.md) beyond documenting the new `type` value.

## Matrix Input Format

For `test.yml` / `unit-test.yml`:

```yaml
with:
  os-matrix: '"ubuntu-latest", "windows-latest"' # JSON fragment
  node-versions: "22,24,26" # comma-separated
```

## Choosing a Layer

| Need            | Use                                                                      |
| --------------- | ------------------------------------------------------------------------ |
| Quick CI        | [composite-unit-test](composite-unit-test.md)                            |
| Quick release   | [composite-release](composite-release.md)                                |
| Custom pipeline | Compose [workflow-\*](workflow-check.md) or [action-\*](action-setup.md) |

Read one reference file at a time.
