---
name: workflow-publish
description: Build and publish package to npm
---

# Publish Workflow

```yaml
jobs:
  publish:
    uses: avotokyo/workflows/.github/workflows/publish.yml@main
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
    uses: avotokyo/workflows/.github/workflows/publish.yml@main
    with:
      build: vp run build
    permissions:
      contents: write
      id-token: write
```
