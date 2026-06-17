---
name: action-upload-codecov
description: Upload coverage reports to Codecov via OIDC
---

# Upload Codecov Action

Step-level. Prefer [workflow-coverage](workflow-coverage.md) for most cases.

```yaml
steps:
  - uses: avotokyo/workflows/actions/upload-codecov@main
```

No inputs. Job needs `id-token: write`.
