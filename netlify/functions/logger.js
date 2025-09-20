import { CYAN, DIM, colorsForStatus, paint } from './utils/log-colors.js'
import { detectUserAgent } from './utils/user-agent-detector.js'

export const handler = async (event, context) => {
  // Отримуємо дані з запиту
  const ua = event.headers['user-agent'] || ''
  const method = event.httpMethod || 'GET'
  const path = event.path || '/'
  const query = event.rawQuery ? `?${event.rawQuery}` : ''
  const referer = event.headers.referer || event.headers.referrer || ''

  // IP клієнта
  const ip = event.headers['x-nf-client-connection-ip'] ||
             (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
             'unknown'

  // Детекція агента
  const agentRaw = detectUserAgent(ua)
  const agentColored = agentRaw === 'USER' ? paint(CYAN, '[USER]') : paint(DIM, `[${agentRaw}]`)
  const ipColored = ip ? paint(DIM, ip) : ''

  // Referer обробка
  const from = (() => {
    if (!referer) return ''
    try {
      const u = new URL(referer)
      return `${u.hostname}${u.pathname || '/'}${u.search || ''}${u.hash || ''}`
    } catch { return referer }
  })()

  // Логування запиту
  const timestamp = new Date().toISOString()
  const fullPath = `${path}${query}`

  // Формат: [2024-01-20T10:30:45.123Z] [USER] 95.67.123.29 => GET /page <= google.com
  const left = ipColored ? `${agentColored} ${ipColored}` : `${agentColored}`
  const arrowFwd = paint(DIM, '=>')
  const arrowBack = from ? ` ${paint(DIM, '<=')} ${paint(DIM, from)}` : ''

  console.log(`[${timestamp}] ${left} ${arrowFwd} ${method} ${fullPath}${arrowBack}`)

  // Повертаємо успішну відповідь
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Log recorded',
      timestamp,
      agent: agentRaw,
      ip,
      method,
      path: fullPath,
      referer: from || null
    })
  }
}