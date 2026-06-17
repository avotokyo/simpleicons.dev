---
name: best-practices-usage
description: Permissions, path conventions, and legacy migration for avotokyo/workflows
---

# Usage Best Practices

## Path Conventions

```yaml
# Workflow — job level
uses: avotokyo/workflows/.github/workflows/<name>.yml@main

# Action — step level
uses: avotokyo/workflows/actions/<name>@main
```

Pin `@main` or a release tag. Do not use legacy `*/action.yml` paths for workflows.

## Required Permissions

| Workflow                     | Caller must pass                     |
| ---------------------------- | ------------------------------------ |
| `coverage.yml`               | `id-token: write`                    |
| `release.yml`, `publish.yml` | `contents: write`, `id-token: write` |

```yaml
permissions:
  contents: write
  id-token: write
```

## Matrix Input Format

For `test.yml` / `unit-test.yml`:

```yaml
with:
  os-matrix: '"ubuntu-latest", "windows-latest"' # JSON fragment
  node-versions: "22,24,26" # comma-separated
```

## Legacy Migration

| Old                                            | New                                                       |
| ---------------------------------------------- | --------------------------------------------------------- |
| `avotokyo/workflows/setup@main`                | `avotokyo/workflows/actions/setup@main`                   |
| `avotokyo/workflows/unit-test/action.yml@main` | `avotokyo/workflows/.github/workflows/unit-test.yml@main` |
| `avotokyo/workflows/coverage/action.yml@main`  | `avotokyo/workflows/.github/workflows/coverage.yml@main`  |
| `avotokyo/workflows/release/action.yml@main`   | `avotokyo/workflows/.github/workflows/release.yml@main`   |
| `avotokyo/workflows/autofix/action.yml@main`   | `avotokyo/workflows/.github/workflows/autofix.yml@main`   |

## Choosing a Layer

| Need            | Use                                                                      |
| --------------- | ------------------------------------------------------------------------ |
| Quick CI        | [composite-unit-test](composite-unit-test.md)                            |
| Quick release   | [composite-release](composite-release.md)                                |
| Custom pipeline | Compose [workflow-\*](workflow-check.md) or [action-\*](action-setup.md) |

Read one reference file at a time.
