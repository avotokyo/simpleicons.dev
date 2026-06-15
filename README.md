# simpleicons.dev

> <https://simpleicons.dev>

SVG icon API powered by [Simple Icons](https://simpleicons.org). Combine brand icons into a single SVG for GitHub READMEs, resumes, and other Markdown documents.

Icon data from [`simple-icons`](https://www.npmjs.com/package/simple-icons). Use official [slugs](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) as identifiers.

## Quick Start

```md
[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)
```

[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)

```md
![My Skills](https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3)
```

## API

| Endpoint                | Description                             |
| ----------------------- | --------------------------------------- |
| `GET /icons`            | Combined multi-icon SVG                 |
| `GET /api/icon/{slug}`  | Single icon SVG                         |
| `GET /api/icons`        | Icon list (`?format=full` for metadata) |
| `GET /api/icons/search` | Search by slug or title (`q`, `limit`)  |
| `GET /api/svgs`         | Batch SVG as JSON (`slugs` or `all=1`)  |

### Render parameters

Applies to all SVG endpoints:

| Parameter   | Description                           |
| ----------- | ------------------------------------- |
| `theme`     | `dark` (default) or `light`           |
| `color`     | Card background (hex, e.g. `F7DF1E`)  |
| `iconColor` | Icon fill color (hex)                 |
| `viewbox`   | `auto` for raw 24×24 SVG without card |

### `GET /icons`

| Parameter | Required | Description                        |
| --------- | -------- | ---------------------------------- |
| `icons`   | Yes      | Comma-separated slugs, or `all`    |
| `perline` | No       | Icons per row, 1–50 (default `15`) |

```bash
curl "https://simpleicons.dev/icons?icons=javascript,html5,css,react"
curl "https://simpleicons.dev/api/icon/javascript?color=F7DF1E&viewbox=auto"
curl "https://simpleicons.dev/api/icons/search?q=react"
```

## Slugs

Find slugs at [simpleicons.org](https://simpleicons.org) or `GET /api/icons`. Aliases (`aliases.old`, `aliases.aka`, `aliases.loc`) are supported. Unknown slugs return `400`.

---

Powered by Vercel
