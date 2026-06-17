---
name: action-publish-npm
description: Publish package to npm via vp pm
---

# Publish NPM Action

Step-level. Prefer [workflow-publish](workflow-publish.md) for most cases.

```yaml
steps:
  - uses: avotokyo/workflows/actions/publish-npm@main
    with:
      stage: false
      tag: ""
```

## Inputs

| Input   | Default | Description              |
| ------- | ------- | ------------------------ |
| `stage` | `false` | `true` → `stage publish` |
| `tag`   | `""`    | npm dist-tag             |

Job needs `id-token: write`.
