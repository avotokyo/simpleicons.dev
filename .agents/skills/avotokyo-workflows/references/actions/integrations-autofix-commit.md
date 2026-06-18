---
name: action-autofix-commit
description: Commit auto-fix changes via autofix-ci
---

# Autofix Commit Action

Step-level. Prefer [workflow-autofix](../workflows/ci-autofix.md) for most cases.

```yaml
steps:
  - uses: avotokyo/workflows/actions/core/run@main
    with:
      command: vp check --fix
  - uses: avotokyo/workflows/actions/integrations/autofix-commit@main
```

No inputs.
