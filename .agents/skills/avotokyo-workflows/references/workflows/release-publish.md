---
name: workflow-publish
description: Dispatch publish by type to per-registry workflows
---

# Publish Workflow (Dispatcher)

Routes `type` to a per-registry atomic workflow. Add a new publish target by adding a workflow + one job here.

| `type`   | Atomic workflow      | Reference                                            |
| -------- | -------------------- | ---------------------------------------------------- |
| `npm`    | `publish-npm.yml`    | [workflow-publish-npm](release-publish-npm.md)       |
| `github` | `publish-github.yml` | [workflow-publish-github](release-publish-github.md) |

```yaml
jobs:
  publish:
    uses: avotokyo/workflows/.github/workflows/release/publish.yml@main
    with:
      type: npm
    permissions:
      contents: write
      id-token: write
```

## Inputs

| Input   | Default | Description                      |
| ------- | ------- | -------------------------------- |
| `type`  | `npm`   | Publish type (`npm` or `github`) |
| `build` | `""`    | Pre-publish build                |
| `stage` | `false` | Stage publish                    |
| `tag`   | `""`    | npm dist-tag                     |

## Example (GitHub Packages)

```yaml
jobs:
  publish:
    uses: avotokyo/workflows/.github/workflows/release/publish.yml@main
    with:
      type: github
      build: vp run build
    permissions:
      contents: write
      packages: write
```

See [best-practices-usage](best-practices-usage.md#adding-a-publish-type) to add a new type.
