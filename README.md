<h1>
  <img src="app/logo.png" width="40" height="40" alt="" valign="middle" />
  simpleicons.dev
</h1>

SVG icon API powered by [Simple Icons](https://simpleicons.org). Combine brand icons into a single SVG for GitHub READMEs, resumes, and other Markdown documents.

Icon data from [`simple-icons`](https://www.npmjs.com/package/simple-icons). Use official [slugs](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) as identifiers.

The npm package is a version marker for the deployed service, not a programmatic SDK.

## Quick Start

Paste this into your Markdown:

```md
![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)
```

![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)

Replace the `icons` value with a comma-separated list of slugs from [simpleicons.org](https://simpleicons.org).

## Examples

Light theme (shown above):

```md
![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)
```

![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)

Dark theme:

```md
![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=dark)
```

![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs&theme=dark)

Two icons per row:

```md
![My Skills](https://simpleicons.dev/icons?icons=javascript,react&perline=2)
```

![My Skills](https://simpleicons.dev/icons?icons=javascript,react&perline=2)

Single icon without card background:

```md
![JavaScript](https://simpleicons.dev/icons?icons=javascript&viewbox=auto)
```

![JavaScript](https://simpleicons.dev/icons?icons=javascript&viewbox=auto)

More options: [simpleicons.dev](https://simpleicons.dev)
