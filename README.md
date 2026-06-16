# simpleicons.dev

[![npm version](https://npmx.dev/api/registry/badge/version/simpleicons.dev)](https://npmx.dev/package/simpleicons.dev)
[![npm license](https://npmx.dev/api/registry/badge/license/simpleicons.dev)](./LICENSE)
[![npm package size](https://npmx.dev/api/registry/badge/size/simpleicons.dev)](https://npmx.dev/package/simpleicons.dev)
[![npm deprecated](https://npmx.dev/api/registry/badge/deprecated/simpleicons.dev)](https://npmx.dev/package/simpleicons.dev)

SVG icon API powered by [Simple Icons](https://simpleicons.org). Combine brand icons into a single SVG for GitHub READMEs, resumes, and other Markdown documents.

Icon data from [`simple-icons`](https://www.npmjs.com/package/simple-icons). Use official [slugs](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) as identifiers.

The npm package is a version marker for the deployed service, not a programmatic SDK. API documentation constants live in [`lib/docs.ts`](lib/docs.ts).

## Quick Start

```md
![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)
```

![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)

## API

| Endpoint     | Description             |
| ------------ | ----------------------- |
| `GET /icons` | Combined multi-icon SVG |

### `GET /icons` parameters

| Parameter | Required | Description                                                                          |
| --------- | -------- | ------------------------------------------------------------------------------------ |
| `icons`   | Yes      | Comma-separated official slugs (case-insensitive, trimmed), or `all` (max 100 icons) |
| `perline` | No       | Icons per row, 1–50 (default `15`)                                                   |

> **Note:** `icons=all` expands every official slug (3000+). Requests are capped at 100 icons; use explicit slug lists for large sets.

### Render parameters

Applies to `/icons`:

| Parameter   | Description                           |
| ----------- | ------------------------------------- |
| `theme`     | `dark` (default) or `light`           |
| `color`     | Card background (hex, e.g. `F7DF1E`)  |
| `iconColor` | Icon fill color (hex)                 |
| `viewbox`   | `auto` for raw 24×24 SVG without card |

### Responses

| Status | Description                                                |
| ------ | ---------------------------------------------------------- |
| `200`  | Success — SVG body with `Content-Type: image/svg+xml`      |
| `400`  | Validation error — plain-text message                      |
| `500`  | Render error — plain-text message (e.g. invalid hex color) |

Common validation messages: `Missing icons parameter`, `Theme must be either "light" or "dark"`, `Icons per line must be a number between 1 and 50`, `Unknown icon: …`, `Too many icons requested (max 100)`.

### Examples

```bash
curl "https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light"
curl "https://simpleicons.dev/icons?icons=javascript,react&perline=2"
curl "https://simpleicons.dev/icons?icons=javascript&viewbox=auto"
```

## Slugs

Find official slugs at [simpleicons.org](https://simpleicons.org) or in [slugs.md](https://github.com/simple-icons/simple-icons/blob/master/slugs.md). Only official slugs are accepted. Matching is case-insensitive and comma-separated values are trimmed. Unknown slugs return `400`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). OpenAPI spec: [openapi.yaml](openapi.yaml).
