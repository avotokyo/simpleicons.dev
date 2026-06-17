---
name: action-autofix-commit
description: Commit auto-fix changes via autofix-ci
---

# Autofix Commit Action

Step-level. Prefer [workflow-autofix](workflow-autofix.md) for most cases.

```yaml
steps:
  - uses: avotokyo/workflows/actions/run@main
    with:
      command: vp check --fix
  - uses: avotokyo/workflows/actions/autofix-commit@main
```

No inputs.
