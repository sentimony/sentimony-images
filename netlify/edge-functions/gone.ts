// 410 Gone для ресурсів, які прибрано назавжди (наприклад /sitemap.xml
// після міграції на SPA). Edge-функція короткозамикає запит ще до SPA-фолбеку.
export default async () =>
  new Response("410 Gone\n", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
