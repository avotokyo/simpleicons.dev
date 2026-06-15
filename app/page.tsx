export default function Home() {
  return (
    <main>
      <h1>simpleicons.dev</h1>
      <p>Simple Icons SVG API — see README for endpoints.</p>
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
