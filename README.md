# Digital Keeper

[![Netlify Status](https://api.netlify.com/api/v1/badges/da7dbd66-5133-4f4f-9d03-8a7acca90aaf/deploy-status)](https://app.netlify.com/projects/sentimony-content/deploys)

JAMstack development of Digital Keeper - a repo for storing content files of Sentimony Records, a psychedelic music label. It keeps here artworks of releases, merch images, event fyers, artists photo, music video covers, logotypes versions, svg icons, website backgrounds.

### Used:
* [Nuxt](https://nuxt.com)
* [Netlify](https://netlify.com)
* [Tailwind](https://tailwindcss.com)
* [Iconify](https://icon-sets.iconify.design)

### Links:

* [content.sentimony.com](https://content.sentimony.com)
* [sentimony-content.netlify.app](https://sentimony-content.netlify.app)

### Monitoring

* [Functions Logs](https://app.netlify.com/projects/sentimony-content/logs/functions/server) or `netlify logs:function server`
* [Edge Functions Logs](https://app.netlify.com/projects/sentimony-content/logs/edge-functions)
* [Requests Left](https://app.netlify.com/projects/sentimony-content/configuration/functions#overview)

### Run

```bash
npm i

npm run dev -- --host 0.0.0.0
```

### Deploy

```bash
netlify deploy --alias stage --context deploy-preview


netlify deploy --prod
```

### Have fun! ;)
