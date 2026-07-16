// Smoke-tests every SPA route by loading it in a real browser against a
// `vite preview` (production build) server. A page fails if it responds with
// HTTP >= 400, logs a console.error / uncaught pageerror, or never renders an
// <h1> (i.e. the Vue route did not mount). Exits 1 on any failure so CI blocks.
// Assumes `npm run build` already produced dist/. Starts and stops preview
// itself. Set BASE_URL to skip the built-in server and test a running one.

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

// Keep in sync with app/router.ts (catch-all NotFound is excluded on purpose).
const ROUTES = [
  '/',
  '/releases',
  '/artists',
  '/playlists',
  '/videos',
  '/events',
  '/backgrounds',
  '/svg-icons',
  '/svg-images',
]

const PORT = Number(process.env.PORT ?? 4173)
const EXTERNAL_BASE = process.env.BASE_URL
const BASE = EXTERNAL_BASE ?? `http://localhost:${PORT}`

const bold = (s) => `\x1b[1m${s}\x1b[0m`
const red = (s) => `\x1b[31m${s}\x1b[0m`
const green = (s) => `\x1b[32m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`

// Dev/headless noise that must not fail the run.
const IGNORE_CONSOLE = [
  /\[vite\]/i,
  /Unrecognized feature/i,
  /permissions-policy/i,
]

function startPreview() {
  // Run vite's binary directly (not via `npx`) so kill() signals the actual
  // preview process — killing an `npx` wrapper can orphan its vite child and
  // leave the port held, which then trips --strictPort on the next run.
  const bin = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
  const proc = spawn(
    process.execPath,
    [bin, 'preview', '--port', String(PORT), '--strictPort'],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  )
  return proc
}

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url)
      if (res.status < 500) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`preview server did not start within ${timeoutMs}ms`)
}

async function checkRoute(browser, route) {
  const url = BASE + route
  const errors = []
  const page = await browser.newPage()

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (IGNORE_CONSOLE.some((re) => re.test(text))) return
    errors.push(`console.error: ${text}`)
  })
  page.on('pageerror', (err) => {
    errors.push(`pageerror: ${err.message}`)
  })

  let status = 0
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' })
    status = response ? response.status() : 0
    if (status >= 400) errors.push(`http ${status}`)

    try {
      await page.waitForSelector('h1', { state: 'attached', timeout: 8000 })
    } catch {
      errors.push('h1 not rendered')
    }
  } catch (err) {
    errors.push(`navigation failed: ${err.message}`)
  } finally {
    await page.close()
  }

  return { route, status, errors }
}

async function main() {
  let preview
  if (!EXTERNAL_BASE) {
    preview = startPreview()
    preview.on('exit', (code) => {
      if (code && code !== 0) {
        console.error(red(`vite preview exited with code ${code}`))
      }
    })
    try {
      await waitForServer(BASE)
    } catch (err) {
      preview.kill()
      console.error(red(err.message))
      process.exit(1)
    }
  }

  const browser = await chromium.launch({ headless: true })
  const results = []
  try {
    for (const route of ROUTES) {
      results.push(await checkRoute(browser, route))
    }
  } finally {
    await browser.close()
    if (preview) preview.kill()
  }

  let failed = 0
  for (const { route, status, errors } of results) {
    if (errors.length === 0) {
      console.log(`${green('PASS')} ${route} ${dim(`(${status})`)}`)
    } else {
      failed++
      console.log(`${red('FAIL')} ${route}`)
      for (const e of errors) console.log(`  ${red('•')} ${e}`)
    }
  }

  console.log(
    `\n${bold(`${results.length - failed}/${results.length} pages OK`)}`,
  )
  process.exit(failed ? 1 : 0)
}

main().catch((err) => {
  console.error(red(err.stack ?? String(err)))
  process.exit(1)
})
