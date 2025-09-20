import { colorsForStatus, paint } from './utils/log-colors.js'

export const handler = async (event, context) => {
  const method = event.httpMethod || 'GET'

  if (method !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // Симуляція різних статусів для тестування логів
  const { status } = event.queryStringParameters || {}
  const testStatus = parseInt(status) || 200

  const { statusC, linkC } = colorsForStatus(testStatus)
  const statusBox = statusC ? paint(statusC, `[${testStatus}]`) : `[${testStatus}]`

  console.log(`Test status response: ${statusBox}`)

  return {
    statusCode: testStatus,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: `Test response with status ${testStatus}`,
      timestamp: new Date().toISOString(),
      colored_status: statusBox
    })
  }
}