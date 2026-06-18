---
name: workflow-check
description: Single-OS code check with optional pre-build
---

# Check Workflow

```yaml
jobs:
  check:
    uses: avotokyo/workflows/.github/workflows/ci/check.yml@main
```

## Inputs

| Input             | Default         | Description        |
| ----------------- | --------------- | ------------------ |
| `os`              | `ubuntu-latest` | Runner OS          |
| `check`           | `vp check`      | Check command      |
| `build`           | `vp run build`  | Build command      |
| `build-for-check` | `false`         | Build before check |

## Example

```yaml
jobs:
  check:
    uses: avotokyo/workflows/.github/workflows/ci/check.yml@main
    with:
      build-for-check: true
```
