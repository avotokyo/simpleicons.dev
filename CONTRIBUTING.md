# Contributing

Thanks for your interest in simpleicons.dev! This guide covers local development and how to submit changes.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24.15.0
- [Vite Plus](https://viteplus.dev/) (`vp` CLI)

Install `vp` globally:

```bash
curl -fsSL https://vite.plus | bash
```

## Local Development

```bash
vp install
vp run dev      # http://localhost:3000
vp run build
vp run start
```

## Toolchain

This project uses [Next.js](https://nextjs.org/) for the app and [Vite Plus](https://viteplus.dev/) for the developer toolchain. Test and format settings live in the root `vite.config.ts`; ESLint stays in `eslint.config.ts`.

| Tool        | Role                                        |
| ----------- | ------------------------------------------- |
| Next.js     | App runtime (`dev`, `build`, `start`)       |
| Vite Plus   | Unit tests (`vp test`) and Oxfmt formatting |
| ESLint      | Linting (`vp run lint`)                     |
| Playwright  | E2E API tests (`e2e/`)                      |

Recommended VS Code extension: [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack).

## Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `vp run dev`           | Start Next.js dev server                   |
| `vp run build`         | Production build                           |
| `vp run start`         | Serve production build                     |
| `vp run lint`          | Run ESLint                                 |
| `vp run test`          | Unit and route integration tests           |
| `vp run test:watch`    | Vite Plus test watch mode                  |
| `vp run test:e2e`      | E2E API tests (Playwright)                 |

## Testing

Run the full test suite before opening a pull request:

```bash
vp run lint
vp run test
vp run test:e2e
```

CI runs the same checks on every push and pull request.

- **Unit / integration tests** — Vite Plus (`vite-plus/test`), co-located as `*.test.ts` next to source files
- **E2E tests** — Playwright against the local dev server (`e2e/`)

## Project Layout

```
lib/icons/          Icon registry, SVG rendering, request validation (Zod)
app/icons/          Multi-icon combined SVG route
e2e/                Playwright API tests
vite.config.ts      Vite Plus test and format configuration
```

## Pull Requests

1. Fork the repository and create a branch from `main`.
2. Make focused changes with tests when behavior changes.
3. Ensure `vp run lint`, `vp run test`, and `vp run test:e2e` pass locally.
4. Open a pull request with a clear description of what changed and why.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
