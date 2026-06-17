---
name: composite-release
description: Full release workflow combining changelog and npm publish
---

# Release (Composite)

Changelog + npm publish in parallel. Default release entry point.

```yaml
jobs:
  release:
    uses: avotokyo/workflows/.github/workflows/release.yml@main
    permissions:
      contents: write
      id-token: write
```

## Inputs

| Input            | Default | Description                            |
| ---------------- | ------- | -------------------------------------- |
| `github-release` | `true`  | Generate changelog                     |
| `publish`        | `false` | Publish to npm                         |
| `stage`          | `false` | Stage publish (pre-release validation) |
| `build`          | `""`    | Pre-publish build command              |
| `tag`            | `""`    | npm dist-tag                           |

## Example

```yaml
name: Release
on:
  push:
    tags: ["v*"]

jobs:
  release:
    uses: avotokyo/workflows/.github/workflows/release.yml@main
    with:
      publish: true
      build: vp run build
    permissions:
      contents: write
      id-token: write
```

Split into atomics: [workflow-changelog](workflow-changelog.md), [workflow-publish](workflow-publish.md).
