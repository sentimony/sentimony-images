export function detectUserAgent(ua) {
  const knownTools = [
    { re: /lighthouse|chrome-lighthouse|pagespeed/i, tag: 'TOOL:LIGHTHOUSE' },
    { re: /headlesschrome/i, tag: 'TOOL:HEADLESS' },
    { re: /cypress/i, tag: 'TOOL:CYPRESS' },
    { re: /postman|insomnia/i, tag: 'TOOL:APICLIENT' },
    { re: /curl|wget/i, tag: 'TOOL:CLI' },
    { re: /axios|httpclient|node-fetch|python-requests|go-http-client/i, tag: 'TOOL:HTTP' },
  ]

  const knownBots = [
    { re: /googlebot|adsbot-google|apis-google|google-inspectiontool/i, tag: 'BOT:GOOGLE' },
    { re: /bingbot|adidxbot|bingpreview/i, tag: 'BOT:BING' },
    { re: /duckduckbot/i, tag: 'BOT:DUCKDUCKGO' },
    { re: /baiduspider/i, tag: 'BOT:BAIDU' },
    { re: /yandex(bot|images|media)/i, tag: 'BOT:YANDEX' },
    { re: /facebookexternalhit|facebookcatalog|facebot/i, tag: 'BOT:FACEBOOK' },
    { re: /twitterbot/i, tag: 'BOT:TWITTER' },
    { re: /linkedinbot/i, tag: 'BOT:LINKEDIN' },
    { re: /slackbot/i, tag: 'BOT:SLACK' },
    { re: /discordbot/i, tag: 'BOT:DISCORD' },
    { re: /telegrambot/i, tag: 'BOT:TELEGRAM' },
    { re: /ahrefsbot/i, tag: 'BOT:AHREFS' },
    { re: /semrush(bot)?/i, tag: 'BOT:SEMRUSH' },
    { re: /mj12bot/i, tag: 'BOT:MAJESTIC' },
    { re: /petalbot/i, tag: 'BOT:PETAL' },
    { re: /screaming frog|screamingfrogseo/i, tag: 'BOT:SCREAMINGFROG' },
    { re: /uptime|pingdom|site24x7|newrelicpinger|updown\.io/i, tag: 'BOT:UPTIME' },
  ]

  const genericBotRe = /bot|crawler|spider|crawling|scrapy|urlpreview|linkcheck|validator|monitor|probe/i

  return knownTools.find(k => k.re.test(ua))?.tag ??
         knownBots.find(k => k.re.test(ua))?.tag ??
         (genericBotRe.test(ua) ? 'BOT' : 'USER')
}