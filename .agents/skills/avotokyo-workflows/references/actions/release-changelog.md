---
name: action-changelog
description: Run changelogithub to generate GitHub Release changelog
---

# Changelog Action

Step-level. Prefer [workflow-changelog](../workflows/release-changelog.md) for most cases.

```yaml
steps:
  - uses: avotokyo/workflows/actions/core/setup@main
    with:
      fetch-all: true
      cache: false
  - uses: avotokyo/workflows/actions/release/changelog@main
```

No inputs. Requires `fetch-all: true` on setup beforehand.
