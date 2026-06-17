---
name: composite-unit-test
description: Full CI workflow combining check and matrix test jobs
---

# Unit Test (Composite)

Check + matrix test in parallel. Default CI entry point.

```yaml
jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/unit-test.yml@main
```

## Inputs

| Input             | Default                               | Description                    |
| ----------------- | ------------------------------------- | ------------------------------ |
| `primary-os`      | `ubuntu-latest`                       | Check runner OS                |
| `os-matrix`       | `'"ubuntu-latest", "windows-latest"'` | Test matrix OS (JSON fragment) |
| `node-versions`   | `"22,24,26"`                          | Test matrix Node versions      |
| `check`           | `vp check`                            | Check command                  |
| `build`           | `vp run build`                        | Build command                  |
| `test`            | `vp test`                             | Test command                   |
| `skip-check`      | `false`                               | Skip check job                 |
| `skip-test`       | `false`                               | Skip test job                  |
| `build-for-check` | `false`                               | Build before check             |

## Examples

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/unit-test.yml@main
```

Test only:

```yaml
with:
  skip-check: true
```

Split into atomics: [workflow-check](workflow-check.md), [workflow-test](workflow-test.md).
