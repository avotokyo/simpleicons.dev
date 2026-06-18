---
name: action-upload-codecov
description: Upload coverage reports to Codecov via OIDC
---

# Upload Codecov Action

Step-level. Prefer [workflow-coverage](../workflows/ci-coverage.md) for most cases.

```yaml
steps:
  - uses: avotokyo/workflows/actions/integrations/upload-codecov@main
```

No inputs. Job needs `id-token: write`.
