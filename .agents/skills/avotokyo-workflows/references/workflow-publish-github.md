---
name: workflow-publish-github
description: Build and publish package to GitHub Packages
---

# Publish GitHub Workflow

Atomic workflow for GitHub Packages. Invoked directly or via [workflow-publish](workflow-publish.md) with `type: github`.

```yaml
jobs:
  publish:
    uses: avotokyo/workflows/.github/workflows/publish-github.yml@main
    permissions:
      contents: read
      packages: write
```

## Inputs

| Input   | Default | Description                       |
| ------- | ------- | --------------------------------- |
| `build` | `""`    | Pre-publish build (skip if empty) |
| `stage` | `false` | Stage publish                     |
| `tag`   | `""`    | npm dist-tag                      |

## Example

```yaml
jobs:
  publish:
    uses: avotokyo/workflows/.github/workflows/publish-github.yml@main
    with:
      build: vp run build
    permissions:
      contents: read
      packages: write
```
