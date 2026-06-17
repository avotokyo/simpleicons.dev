# Contributing

Thanks for your interest in simpleicons.dev! This guide covers local development and how to submit changes.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24.15.0
- [pnpm](https://pnpm.io/) 11.3.0 (see `packageManager` in `package.json`)
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

| Tool      | Role                                        |
| --------- | ------------------------------------------- |
| Next.js   | App runtime (`dev`, `build`, `start`)       |
| Vite Plus | Unit tests (`vp test`) and Oxfmt formatting |
| ESLint    | Linting (`vp run lint`)                     |

Recommended VS Code extension: [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack).

## Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `vp run dev`        | Start Next.js dev server  |
| `vp run build`      | Production build          |
| `vp run start`      | Serve production build    |
| `vp run lint`       | Run ESLint                |
| `vp run test:watch` | Vite Plus test watch mode |

## Testing

Run the full test suite before opening a pull request:

```bash
vp run lint
vp test
```

CI runs the same checks on every push and pull request.

Unit and integration tests use Vite Plus (`vite-plus/test`), co-located as `*.test.ts` next to source files.

## Project Layout

```
app/
  page.tsx            API documentation homepage
  icons/route.ts      GET /icons — multi-icon combined SVG
components/
  quick-start.tsx     Interactive Quick Start preview
lib/
  docs.ts             API documentation constants (single source of truth)
  icons/              Icon registry, SVG rendering, request validation (Zod)
vite.config.ts        Vite Plus test and format configuration
```

## Documentation

API parameter tables and examples are defined in [`lib/docs.ts`](lib/docs.ts). When changing API behavior or docs:

1. **API behavior** — change `lib/icons/*` and add or update tests (`*.test.ts`).
2. **User-facing docs** — update [`lib/docs.ts`](lib/docs.ts) (powers the homepage).
3. **Verify locally** — run `vp run lint` and `vp test` before opening a pull request.

## Pull Requests

1. Fork the repository and create a branch from `main`.
2. Make focused changes with tests when behavior changes.
3. Ensure `vp run lint` and `vp test` pass locally.
4. Open a pull request with a clear description of what changed and why.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
