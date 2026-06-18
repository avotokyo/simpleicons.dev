---
name: workflow-autofix
description: Auto-fix code style and commit via autofix-ci
---

# Autofix Workflow

```yaml
jobs:
  autofix:
    uses: avotokyo/workflows/.github/workflows/ci/autofix.yml@main
```

## Inputs

| Input     | Default          | Description                      |
| --------- | ---------------- | -------------------------------- |
| `command` | `vp check --fix` | Fix command                      |
| `os`      | `ubuntu-latest`  | Runner OS (`workflow_call` only) |

## Example

```yaml
jobs:
  autofix:
    uses: avotokyo/workflows/.github/workflows/ci/autofix.yml@main
    with:
      command: vp check --fix
```
