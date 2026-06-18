---
name: action-setup
description: Checkout repository and configure Vite+ environment with caching
---

# Setup Action

```yaml
steps:
  - uses: avotokyo/workflows/actions/core/setup@main
    with:
      cache: true
      node-version: "22"
```

## Inputs

| Input                    | Default  | Description            |
| ------------------------ | -------- | ---------------------- |
| `cache`                  | `true`   | Dependency cache       |
| `fetch-all`              | `false`  | Full git history       |
| `node-version`           | `lts/*`  | Node version           |
| `auto-install`           | `true`   | Run `vp install`       |
| `version`                | `latest` | Vite+ version          |
| `working-directory`      | —        | Monorepo package path  |
| `node-version-file`      | —        | `.nvmrc`, etc.         |
| `persist-credentials`    | `false`  | Git credentials        |
| `cache-dependency-path`  | —        | Lockfile for cache key |
| `registry-url` / `scope` | —        | npm auth               |

## Monorepo

```yaml
- uses: avotokyo/workflows/actions/core/setup@main
  with:
    working-directory: packages/foo
    node-version: "22"
```

Pair with [action-run](core-run.md) for custom jobs.
