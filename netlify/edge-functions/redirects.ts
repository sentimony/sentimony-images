export default async (request: Request) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // IP клієнта з Edge заголовка (fallback на X-Forwarded-For)
  const ip =
    request.headers.get("x-nf-client-connection-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";

  // Кольори для логування
  const gray = "\x1b[90m", magenta = "\x1b[35m", green = "\x1b[32m", reset = "\x1b[0m";

  // Releases thumbnails - старі розміри на нові _th.jpg
  if (/^\/assets\/img\/releases\/(micro|micro-retina|small|small-retina|medium|medium-retina)\/(.+)\.jpg$/.test(path)) {
    const match = path.match(/^\/assets\/img\/releases\/(micro|micro-retina|small|small-retina|medium|medium-retina)\/(.+)\.jpg$/);
    if (match) {
      const filename = match[2];
      const newPath = `/assets/img/releases/${filename}_th.jpg`;
      console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
      return Response.redirect(`${url.origin}${newPath}`, 301);
    }
  }

  // Releases OG images - старі og-image на нові _og.jpg
  if (/^\/assets\/img\/releases\/og-image\/(.+)\.jpg$/.test(path)) {
    const match = path.match(/^\/assets\/img\/releases\/og-image\/(.+)\.jpg$/);
    if (match) {
      const filename = match[1];
      const newPath = `/assets/img/releases/${filename}_og.jpg`;
      console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
      return Response.redirect(`${url.origin}${newPath}`, 301);
    }
  }

  // Releases large images - старі large на нові _xl.jpg
  if (/^\/assets\/img\/releases\/large\/(.+)\.jpg$/.test(path)) {
    const match = path.match(/^\/assets\/img\/releases\/large\/(.+)\.jpg$/);
    if (match) {
      const filename = match[1];
      const newPath = `/assets/img/releases/${filename}_xl.jpg`;
      console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
      return Response.redirect(`${url.origin}${newPath}`, 301);
    }
  }

  // Artists thumbnails - старі розміри на нові -01_th.jpg
  if (/^\/assets\/img\/artists\/(micro|micro-retina|small|small-retina|medium|medium-retina)\/(.+)\.jpg$/.test(path)) {
    const match = path.match(/^\/assets\/img\/artists\/(micro|micro-retina|small|small-retina|medium|medium-retina)\/(.+)\.jpg$/);
    if (match) {
      const filename = match[2];
      const newPath = `/assets/img/artists/${filename}-01_th.jpg`;
      console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
      return Response.redirect(`${url.origin}${newPath}`, 301);
    }
  }

  // Artists OG images - старі og-image на нові -01_og.jpg
  if (/^\/assets\/img\/artists\/og-image\/(.+)\.jpg$/.test(path)) {
    const match = path.match(/^\/assets\/img\/artists\/og-image\/(.+)\.jpg$/);
    if (match) {
      const filename = match[1];
      const newPath = `/assets/img/artists/${filename}-01_og.jpg`;
      console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
      return Response.redirect(`${url.origin}${newPath}`, 301);
    }
  }

  // Artists large images - старі large на нові -01_xl.jpg
  if (/^\/assets\/img\/artists\/large\/(.+)\.jpg$/.test(path)) {
    const match = path.match(/^\/assets\/img\/artists\/large\/(.+)\.jpg$/);
    if (match) {
      const filename = match[1];
      const newPath = `/assets/img/artists/${filename}-01_xl.jpg`;
      console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
      return Response.redirect(`${url.origin}${newPath}`, 301);
    }
  }

  // Generic releases redirect - загальний редирект для /releases/ (тільки якщо починається)
  if (path.startsWith('/releases/')) {
    const filename = path.substring('/releases/'.length);
    const newPath = `/assets/img/releases/${filename}`;
    console.log(`${gray}${ip} => ${magenta}${path} => ${green}${newPath}${reset}`);
    return Response.redirect(`${url.origin}${newPath}`, 301);
  }

  // Загальна умова: якщо після .jpg є символ ) - прибираємо все що після .jpg
  if (path.includes('.jpg)')) {
    const cleanPath = path.split('.jpg')[0] + '.jpg';
    console.log(`${gray}${ip} => ${magenta}${path} => ${green}${cleanPath}${reset}`);
    return Response.redirect(`${url.origin}${cleanPath}`, 301);
  }

  // Якщо жоден редирект не спрацював, передаємо далі
  return;
};
