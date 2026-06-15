# simpleicons.dev

基于 [simple-icons](https://simpleicons.org) 的图标 SVG API 服务，由 Next.js 驱动。可将多个品牌图标拼接为一张 SVG，适用于 GitHub README、简历等场景。

图标数据来自 [`simple-icons`](https://www.npmjs.com/package/simple-icons) npm 包，使用官方 [slug](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) 作为标识符。

## 快速开始

```bash
pnpm install
pnpm dev
```

服务默认运行在 [http://localhost:3000](http://localhost:3000)。

生产构建：

```bash
pnpm build
pnpm start
```

## API

### `GET /icons`

生成多图标拼接 SVG，返回 `image/svg+xml`。

**参数**

| 参数 | 必填 | 说明 |
|------|------|------|
| `icons` | 是 | 逗号分隔的图标 slug，或 `all` 表示全部图标 |
| `theme` | 否 | 卡片背景主题：`dark`（默认）或 `light` |
| `perline` | 否 | 每行图标数量，1–50，默认 `15` |
| `color` | 否 | 覆盖卡片背景色（hex，如 `F7DF1E`） |
| `iconColor` | 否 | 覆盖图标 path 填充色（hex） |
| `viewbox` | 否 | 设为 `auto` 时输出原始 24×24 SVG，不含圆角卡片背景 |

**示例**

```bash
curl "http://localhost:3000/icons?icons=javascript,html5,css,react"
curl "http://localhost:3000/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3"
```

**在 README 中使用**

```md
![My Skills](https://your-domain.com/icons?icons=javascript,html5,css,react,nodedotjs)
```

### `GET /api/icon/[slug]`

返回单个图标的 SVG。

**参数**：`theme`、`color`、`iconColor`、`viewbox`（同 `/icons`）

```bash
curl "http://localhost:3000/api/icon/javascript"
curl "http://localhost:3000/api/icon/javascript?color=F7DF1E&viewbox=auto"
```

### `GET /api/icons`

返回所有可用图标的 slug 列表（JSON 数组）。

```bash
curl "http://localhost:3000/api/icons"
```

**参数**

| 参数 | 说明 |
|------|------|
| `format=full` | 返回完整元数据（`slug`、`title`、`hex`、`source` 等） |

```bash
curl "http://localhost:3000/api/icons?format=full"
```

### `GET /api/icons/search`

按 slug 或 title 模糊搜索图标。

| 参数 | 说明 |
|------|------|
| `q` | 搜索关键词 |
| `limit` | 返回数量上限，默认 `50`，最大 `100` |

```bash
curl "http://localhost:3000/api/icons/search?q=react"
```

### `GET /api/svgs`

按需返回多个图标的 SVG 字符串（JSON 对象，key 为 slug）。

| 参数 | 说明 |
|------|------|
| `slugs` | 逗号分隔的 slug 列表 |
| `all=1` | 返回全部图标（响应体较大） |

支持与 `/icons` 相同的 `theme`、`color`、`iconColor`、`viewbox` 参数。

```bash
curl "http://localhost:3000/api/svgs?slugs=javascript,react"
```

## 图标 slug

请使用 [simple-icons 官方 slug](https://simpleicons.org)，例如：

| 技术 | slug |
|------|------|
| JavaScript | `javascript` |
| HTML | `html5` |
| Node.js | `nodedotjs` |
| Vue | `vuedotjs` |
| Next.js | `nextdotjs` |
| React | `react` |

此外支持 simple-icons 内置的别名（`aliases.old`、`aliases.aka`、`aliases.loc`）。未知 slug 将返回 `400 Unknown icon: ...`。

完整列表可通过 `GET /api/icons` 获取。

## 项目结构

```
lib/icons/          # 图标注册、渲染、参数解析
app/icons/          # 多图标拼接 API
app/api/icon/       # 单图标 API
app/api/icons/      # 列表与搜索 API
app/api/svgs/       # 批量 SVG API
```

## 许可

图标版权归各品牌所有者，使用请遵守 [Simple Icons 免责声明](https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md)。
