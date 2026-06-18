---
name: workflow-coverage
description: Run coverage tests and upload to Codecov
---

# Coverage Workflow

```yaml
jobs:
  coverage:
    uses: avotokyo/workflows/.github/workflows/ci/coverage.yml@main
    permissions:
      id-token: write
```

## Inputs

| Input   | Default                  | Description      |
| ------- | ------------------------ | ---------------- |
| `test`  | `vp test run --coverage` | Coverage command |
| `build` | `vp run build`           | Pre-test build   |

## Example

```yaml
jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/composite/unit-test.yml@main

  coverage:
    needs: test
    uses: avotokyo/workflows/.github/workflows/ci/coverage.yml@main
    permissions:
      id-token: write
```
