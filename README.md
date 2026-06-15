# simpleicons.dev

> https://simpleicons.dev

An SVG icon API powered by [Simple Icons](https://simpleicons.org). Combines multiple brand icons into a single SVG image, ready to embed in GitHub README files, resumes, and other Markdown documents.

Icon data comes from the [`simple-icons`](https://www.npmjs.com/package/simple-icons) npm package. Official [slugs](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) are used as identifiers.

## Quick Start

Embed a skills icon bar in Markdown:

```md
[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)
```

[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)

Light theme with custom icons per line:

```md
![My Skills](https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3)
```

## API Overview

| Endpoint                                       | Description             | Response Type      |
| ---------------------------------------------- | ----------------------- | ------------------ |
| [`GET /icons`](#get-icons)                     | Combined multi-icon SVG | `image/svg+xml`    |
| [`GET /api/icon/{slug}`](#get-apiiconslug)     | Single icon             | `image/svg+xml`    |
| [`GET /api/icons`](#get-apiicons)              | Icon list               | `application/json` |
| [`GET /api/icons/search`](#get-apiiconssearch) | Search icons            | `application/json` |
| [`GET /api/svgs`](#get-apisvgs)                | Batch SVG retrieval     | `application/json` |

### Common Render Parameters

These parameters apply to all endpoints that return SVG:

| Parameter   | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `theme`     | Card background theme: `dark` (default) or `light`                    |
| `color`     | Override card background color (hex, e.g. `F7DF1E`)                   |
| `iconColor` | Override icon path fill color (hex)                                   |
| `viewbox`   | Set to `auto` to output raw 24×24 SVG without rounded card background |

---

## Endpoints

### `GET /icons`

Generate a combined multi-icon SVG.

**Parameters**

| Parameter   | Required | Description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| `icons`     | Yes      | Comma-separated slugs, or `all` for every icon            |
| `perline`   | No       | Icons per row, 1–50, default `15`                         |
| `theme`     | No       | See [Common Render Parameters](#common-render-parameters) |
| `color`     | No       | See [Common Render Parameters](#common-render-parameters) |
| `iconColor` | No       | See [Common Render Parameters](#common-render-parameters) |
| `viewbox`   | No       | See [Common Render Parameters](#common-render-parameters) |

```bash
curl "https://simpleicons.dev/icons?icons=javascript,html5,css,react"
curl "https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3"
```

### `GET /api/icon/{slug}`

Return a single icon SVG.

```bash
curl "https://simpleicons.dev/api/icon/javascript"
curl "https://simpleicons.dev/api/icon/javascript?color=F7DF1E&viewbox=auto"
```

### `GET /api/icons`

Return a list of all available icon slugs.

```bash
# Slug array
curl "https://simpleicons.dev/api/icons"

# Full metadata (slug, title, hex, source, etc.)
curl "https://simpleicons.dev/api/icons?format=full"
```

| Parameter     | Description                                |
| ------------- | ------------------------------------------ |
| `format=full` | Return full metadata instead of slug array |

### `GET /api/icons/search`

Fuzzy search icons by slug or title.

| Parameter | Description                          |
| --------- | ------------------------------------ |
| `q`       | Search query                         |
| `limit`   | Max results, default `50`, max `100` |

```bash
curl "https://simpleicons.dev/api/icons/search?q=react"
```

### `GET /api/svgs`

Return SVG strings for multiple icons as a JSON object keyed by slug.

| Parameter | Description                       |
| --------- | --------------------------------- |
| `slugs`   | Comma-separated slug list         |
| `all=1`   | Return all icons (large response) |

Supports the same render parameters as SVG endpoints.

```bash
curl "https://simpleicons.dev/api/svgs?slugs=javascript,react"
```

---

## Icon Slugs

Use official slugs from [simpleicons.org](https://simpleicons.org):

| Brand      | Slug         |
| ---------- | ------------ |
| JavaScript | `javascript` |
| HTML       | `html5`      |
| CSS        | `css`        |
| React      | `react`      |
| Node.js    | `nodedotjs`  |
| Vue        | `vuedotjs`   |
| Next.js    | `nextdotjs`  |

Built-in aliases from simple-icons (`aliases.old`, `aliases.aka`, `aliases.loc`) are also supported. Unknown slugs return `400 Unknown icon: ...`.

Full list: `GET https://simpleicons.dev/api/icons`

---

## Local Development

```bash
pnpm install
pnpm dev    # http://localhost:3000
pnpm build
pnpm start
```

### Testing

```bash
pnpm test          # Unit + route integration tests (Vitest)
pnpm test:watch    # Vitest watch mode
pnpm test:e2e      # E2E API tests (Playwright)
```

### Project Layout

```
lib/icons/          Icon registry, rendering, parameter parsing
app/icons/          Multi-icon combined SVG
app/api/icon/       Single icon
app/api/icons/      List and search
app/api/svgs/       Batch SVG
```

## License

Icon copyrights belong to their respective brand owners. Use in accordance with the [Simple Icons disclaimer](https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md).
