---
name: action-publish
description: Publish package by type via vp pm
---

# Publish Action

| `type`   | Registry           | Auth / flags                          |
| -------- | ------------------ | ------------------------------------- |
| `npm`    | registry.npmjs.org | `--access public`, OIDC via workflow  |
| `github` | npm.pkg.github.com | `NODE_AUTH_TOKEN` from `github.token` |

```yaml
steps:
  - uses: avotokyo/workflows/actions/release/publish@main
    with:
      type: npm
      stage: false
      tag: ""
```

## Inputs

| Input   | Default | Description                      |
| ------- | ------- | -------------------------------- |
| `type`  | `npm`   | Publish type (`npm` or `github`) |
| `stage` | `false` | `true` → `stage publish`         |
| `tag`   | `""`    | npm dist-tag                     |

Job needs `id-token: write` for `npm`, or `packages: write` for `github`.

Pair with [action-setup](core-setup.md) — set `registry-url: https://npm.pkg.github.com` when using `type: github`.

Prefer [workflow-publish](../workflows/release-publish.md) for full setup + build + publish.
