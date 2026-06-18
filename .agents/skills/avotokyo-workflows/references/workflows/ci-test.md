---
name: workflow-test
description: Matrix OS and Node version unit testing
---

# Test Workflow

```yaml
jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/ci-test.yml@main
```

## Inputs

| Input           | Default                               | Description                    |
| --------------- | ------------------------------------- | ------------------------------ |
| `os-matrix`     | `'"ubuntu-latest", "windows-latest"'` | JSON array fragment for matrix |
| `node-versions` | `"22,24,26"`                          | Comma-separated Node versions  |
| `build`         | `vp run build`                        | Build command                  |
| `test`          | `vp test`                             | Test command                   |

## Example

```yaml
jobs:
  test:
    uses: avotokyo/workflows/.github/workflows/ci-test.yml@main
    with:
      os-matrix: '"ubuntu-latest"'
      node-versions: "22"
```

`os-matrix` must be a JSON array **fragment** with inner quotes, e.g. `'"ubuntu-latest", "windows-latest"'`.
