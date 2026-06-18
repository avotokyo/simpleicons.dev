---
name: composite-release
description: Full release workflow combining changelog and publish by type
---

# Release (Composite)

Changelog + [workflow-publish](release-publish.md) in parallel.

```yaml
jobs:
  release:
    uses: avotokyo/workflows/.github/workflows/composite/release.yml@main
    permissions:
      contents: write
      id-token: write
```

## Inputs

| Input            | Default | Description                            |
| ---------------- | ------- | -------------------------------------- |
| `github-release` | `true`  | Generate changelog                     |
| `publish`        | `false` | Publish to registry                    |
| `type`           | `npm`   | Publish type (`npm` or `github`)       |
| `stage`          | `false` | Stage publish (pre-release validation) |
| `build`          | `""`    | Pre-publish build command              |
| `tag`            | `""`    | npm dist-tag                           |

## Example (npm)

```yaml
name: Release
on:
  push:
    tags: ["v*"]

jobs:
  release:
    uses: avotokyo/workflows/.github/workflows/composite/release.yml@main
    with:
      publish: true
      build: vp run build
    permissions:
      contents: write
      id-token: write
```

## Example (GitHub Packages)

```yaml
jobs:
  release:
    uses: avotokyo/workflows/.github/workflows/composite/release.yml@main
    with:
      publish: true
      type: github
      build: vp run build
    permissions:
      contents: write
      packages: write
```

Split into atomics: [workflow-changelog](release-changelog.md), [workflow-publish](release-publish.md).
