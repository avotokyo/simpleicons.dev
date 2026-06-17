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

## Choosing a Layer

| Need            | Use                                                                      |
| --------------- | ------------------------------------------------------------------------ |
| Quick CI        | [composite-unit-test](composite-unit-test.md)                            |
| Quick release   | [composite-release](composite-release.md)                                |
| Custom pipeline | Compose [workflow-\*](workflow-check.md) or [action-\*](action-setup.md) |

Read one reference file at a time.
