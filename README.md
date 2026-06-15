# simpleicons.dev

> https://simpleicons.dev

基于 [Simple Icons](https://simpleicons.org) 的 SVG 图标 API。将多个品牌图标拼接为一张 SVG，可直接嵌入 GitHub README、简历等 Markdown 文档。

图标数据来自 [`simple-icons`](https://www.npmjs.com/package/simple-icons) npm 包，使用官方 [slug](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) 作为标识符。

## 快速使用

在 Markdown 中嵌入技能图标条：

```md
[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)
```

[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)

指定浅色主题与每行数量：

```md
![My Skills](https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3)
```

## API 概览

| 端点                                           | 说明         | 响应类型           |
| ---------------------------------------------- | ------------ | ------------------ |
| [`GET /icons`](#get-icons)                     | 多图标拼接   | `image/svg+xml`    |
| [`GET /api/icon/{slug}`](#get-apiiconslug)     | 单个图标     | `image/svg+xml`    |
| [`GET /api/icons`](#get-apiicons)              | 图标列表     | `application/json` |
| [`GET /api/icons/search`](#get-apiiconssearch) | 搜索图标     | `application/json` |
| [`GET /api/svgs`](#get-apisvgs)                | 批量获取 SVG | `application/json` |

### 通用渲染参数

以下参数适用于所有返回 SVG 的端点：

| 参数        | 说明                                               |
| ----------- | -------------------------------------------------- |
| `theme`     | 卡片背景主题：`dark`（默认）或 `light`             |
| `color`     | 覆盖卡片背景色（hex，如 `F7DF1E`）                 |
| `iconColor` | 覆盖图标 path 填充色（hex）                        |
| `viewbox`   | 设为 `auto` 时输出原始 24×24 SVG，不含圆角卡片背景 |

---

## 端点详情

### `GET /icons`

生成多图标拼接 SVG。

**参数**

| 参数        | 必填 | 说明                                   |
| ----------- | ---- | -------------------------------------- |
| `icons`     | 是   | 逗号分隔的 slug，或 `all` 表示全部图标 |
| `perline`   | 否   | 每行图标数量，1–50，默认 `15`          |
| `theme`     | 否   | 见[通用渲染参数](#通用渲染参数)        |
| `color`     | 否   | 见[通用渲染参数](#通用渲染参数)        |
| `iconColor` | 否   | 见[通用渲染参数](#通用渲染参数)        |
| `viewbox`   | 否   | 见[通用渲染参数](#通用渲染参数)        |

```bash
curl "https://simpleicons.dev/icons?icons=javascript,html5,css,react"
curl "https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3"
```

### `GET /api/icon/{slug}`

返回单个图标的 SVG。

```bash
curl "https://simpleicons.dev/api/icon/javascript"
curl "https://simpleicons.dev/api/icon/javascript?color=F7DF1E&viewbox=auto"
```

### `GET /api/icons`

返回所有可用图标的 slug 列表。

```bash
# slug 数组
curl "https://simpleicons.dev/api/icons"

# 完整元数据（slug、title、hex、source 等）
curl "https://simpleicons.dev/api/icons?format=full"
```

| 参数          | 说明                           |
| ------------- | ------------------------------ |
| `format=full` | 返回完整元数据，而非 slug 数组 |

### `GET /api/icons/search`

按 slug 或 title 模糊搜索图标。

| 参数    | 说明                                |
| ------- | ----------------------------------- |
| `q`     | 搜索关键词                          |
| `limit` | 返回数量上限，默认 `50`，最大 `100` |

```bash
curl "https://simpleicons.dev/api/icons/search?q=react"
```

### `GET /api/svgs`

按需返回多个图标的 SVG 字符串，JSON 对象 key 为 slug。

| 参数    | 说明                       |
| ------- | -------------------------- |
| `slugs` | 逗号分隔的 slug 列表       |
| `all=1` | 返回全部图标（响应体较大） |

支持与 SVG 端点相同的渲染参数。

```bash
curl "https://simpleicons.dev/api/svgs?slugs=javascript,react"
```

---

## 图标 slug

使用 [simpleicons.org](https://simpleicons.org) 上的官方 slug：

| 品牌       | slug         |
| ---------- | ------------ |
| JavaScript | `javascript` |
| HTML       | `html5`      |
| CSS        | `css`        |
| React      | `react`      |
| Node.js    | `nodedotjs`  |
| Vue        | `vuedotjs`   |
| Next.js    | `nextdotjs`  |

另支持 simple-icons 内置别名（`aliases.old`、`aliases.aka`、`aliases.loc`）。未知 slug 返回 `400 Unknown icon: ...`。

完整列表：`GET https://simpleicons.dev/api/icons`

---

## 本地开发

```bash
pnpm install
pnpm dev    # http://localhost:3000
pnpm build
pnpm start
```

```
lib/icons/          图标注册、渲染、参数解析
app/icons/          多图标拼接
app/api/icon/       单图标
app/api/icons/      列表与搜索
app/api/svgs/       批量 SVG
```

## 许可

图标版权归各品牌所有者，使用请遵守 [Simple Icons 免责声明](https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md)。
