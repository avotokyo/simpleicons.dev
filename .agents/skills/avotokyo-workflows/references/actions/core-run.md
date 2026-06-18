---
name: action-run
description: Execute a shell command in a composite step
---

# Run Action

```yaml
steps:
  - uses: avotokyo/workflows/actions/core/run@main
    with:
      command: vp run build
```

## Inputs

| Input     | Required | Description          |
| --------- | -------- | -------------------- |
| `command` | yes      | Shell command to run |

Use step-level `if:` in the workflow to skip when empty. Pair with [action-setup](core-setup.md).
