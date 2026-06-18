---
name: workflow-changelog
description: Generate GitHub Release changelog
---

# Changelog Workflow

```yaml
jobs:
  changelog:
    uses: avotokyo/workflows/.github/workflows/release-changelog.yml@main
```

No inputs. Sets `contents: write` internally.

Usually invoked via [composite-release](composite-release.md) with `github-release: true`.
