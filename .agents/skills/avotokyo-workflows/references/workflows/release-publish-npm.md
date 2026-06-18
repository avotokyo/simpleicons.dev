---
name: workflow-publish-npm
description: Build and publish package to npm Registry
---

# Publish NPM Workflow

Atomic workflow for npm Registry. Invoked directly or via [workflow-publish](release-publish.md) with `type: npm`.

```yaml
jobs:
  publish:
    uses: avotokyo/workflows/.github/workflows/release-publish-npm.yml@main
    permissions:
      contents: write
      id-token: write
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
    uses: avotokyo/workflows/.github/workflows/release-publish-npm.yml@main
    with:
      build: vp run build
    permissions:
      contents: write
      id-token: write
```
