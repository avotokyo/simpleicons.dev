export default function Home() {
  return (
    <main id="main-content">
      <h1>
        <span translate="no">simpleicons.dev</span>
      </h1>
      <p>Simple Icons SVG API — see README for usage.</p>
      <ul>
        <li>
          <a href="/icons?icons=javascript,react,nodedotjs">/icons</a>
        </li>
        <li>
          <a href="/api/icons">/api/icons</a>
        </li>
        <li>
          <a href="/api/icons/search?q=react">/api/icons/search</a>
        </li>
      </ul>
    </main>
  );
}
