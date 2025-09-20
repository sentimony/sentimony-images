# Sentimony Records

🎶 **Psychedelic Music Label** with advanced logging system

## Setup

```bash
npm install
npm run netlify:dev
```

## Logging Functions

### Logger Function
- **URL**: `/.netlify/functions/logger`
- **Purpose**: Records all requests with user agent detection
- **Features**: Bot detection, IP tracking, referer analysis

### Status Test Function
- **URL**: `/.netlify/functions/status?status=404`
- **Purpose**: Test different HTTP status codes
- **Usage**: Add `?status=XXX` to simulate any status code

### Edge Function
- **Function**: `block-rules`
- **Purpose**: Blocks PHP/WordPress scanners
- **Logs**: Malicious requests in console

## Log Output Example

```
[2024-01-20T10:30:45.123Z] [USER] 95.67.123.29 => GET / <= google.com/search
[2024-01-20T10:30:46.456Z] [BOT:GOOGLE] 66.249.66.1 => GET /sitemap.xml
```

## Deployment

Deploy to Netlify for full logging and monitoring system.
