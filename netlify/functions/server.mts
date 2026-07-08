// Fallback handler for the `/* /.netlify/functions/server 200` rewrite in public/_redirects.
// Real files are served by the CDN before redirects, so every request landing here is either
// a cold load of an SPA route (200) or a miss (404, logged). Logs: Netlify -> Logs -> Functions.

// Keep in sync with the routes in src/router.ts
const SPA_ROUTES = new Set([
  '/',
  '/releases',
  '/artists',
  '/playlists',
  '/videos',
  '/events',
  '/backgrounds',
  '/svg-icons',
  '/svg-images',
])

const BOT_RE = /bot|crawl|spider|slurp|preview|petal|ahrefs|semrush|yandex|facebookexternalhit|bytespider|curl|wget|python|scrapy|go-http|httpclient/i

export default async (request: Request) => {
  const url = new URL(request.url)
  const path = url.pathname

  // Guard against a rewrite loop if index.html ever goes missing from the deploy
  if (path === '/index.html') {
    return new Response('Not Found', { status: 404 })
  }

  const known = SPA_ROUTES.has(path)

  if (!known) {
    const ip =
      request.headers.get('x-nf-client-connection-ip') ||
      (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() ||
      'unknown'
    const ua = request.headers.get('user-agent') || ''
    const tag = ua ? (BOT_RE.test(ua) ? '[BOT]' : '[USER]') : '[BOT?]'

    // log: "[404] [BOT] 1.2.3.4 => /path" ([404] and path in red, the rest gray)
    const gray = '\x1b[90m', red = '\x1b[31m', reset = '\x1b[0m'
    console.log(`${red}[404]${reset} ${gray}${tag} ${ip} =>${reset} ${red}${path}${url.search}${reset}`)
  }

  // Serve the SPA shell; unknown paths get a real 404 status and the app renders NotFound
  const shell = await fetch(new URL('/index.html', url.origin))
  return new Response(shell.body, {
    status: known ? 200 : 404,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public,max-age=0,must-revalidate',
    },
  })
}
