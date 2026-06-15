# simpleicons.dev

[![npm version](https://npmx.dev/api/registry/badge/version/simpleicons.dev)](https://npmx.dev/package/simpleicons.dev)
[![npm license](https://npmx.dev/api/registry/badge/license/simpleicons.dev)](./LICENSE)
[![npm updated](https://npmx.dev/api/registry/badge/updated/simpleicons.dev)](https://npmx.dev/package/simpleicons.dev)

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

![My Skills](https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3)

## API

| Endpoint     | Description             |
| ------------ | ----------------------- |
| `GET /icons` | Combined multi-icon SVG |

### Render parameters

Applies to `/icons`:

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
```

## Slugs

Find slugs at [simpleicons.org](https://simpleicons.org). Aliases (`aliases.old`, `aliases.aka`, `aliases.loc`) are supported. Unknown slugs return `400`.
