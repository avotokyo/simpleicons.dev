# Contributing

Thanks for your interest in simpleicons.dev! This guide covers local development and how to submit changes.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24.15.0
- [pnpm](https://pnpm.io/) 11.x (see `packageManager` in `package.json`)

## Local Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm start
```

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `pnpm dev`        | Start Next.js dev server         |
| `pnpm build`      | Production build                 |
| `pnpm start`      | Serve production build           |
| `pnpm lint`       | Run ESLint                       |
| `pnpm test`       | Unit and route integration tests |
| `pnpm test:watch` | Vitest watch mode                |
| `pnpm test:e2e`   | E2E API tests (Playwright)       |

## Testing

Run the full test suite before opening a pull request:

```bash
pnpm lint
pnpm test
pnpm test:e2e
```

CI runs the same checks on every push and pull request.

- **Unit / integration tests** — Vitest, co-located as `*.test.ts` next to source files
- **E2E tests** — Playwright against the local dev server (`e2e/`)

## Project Layout

```
lib/icons/          Icon registry, rendering, parameter parsing
app/icons/          Multi-icon combined SVG route
app/api/icon/       Single icon route
app/api/icons/      List and search routes
app/api/svgs/       Batch SVG route
e2e/                Playwright API tests
```

## Pull Requests

1. Fork the repository and create a branch from `main`.
2. Make focused changes with tests when behavior changes.
3. Ensure `pnpm lint`, `pnpm test`, and `pnpm test:e2e` pass locally.
4. Open a pull request with a clear description of what changed and why.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
