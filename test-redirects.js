#!/usr/bin/env node

/**
 * Тест для правил редиректів з netlify.toml
 * Запуск: node test-redirects.js
 */

import fs from 'fs';
import path from 'path';

// Читаємо netlify.toml
const netlifyToml = fs.readFileSync('netlify.toml', 'utf8');

// Парсимо редиректи з TOML файлу
function parseRedirects(tomlContent) {
  const redirects = [];
  const lines = tomlContent.split('\n');
  let currentRedirect = {};

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '[[redirects]]') {
      if (currentRedirect.from && currentRedirect.to) {
        redirects.push(currentRedirect);
      }
      currentRedirect = {};
    } else if (trimmed.startsWith('from = ')) {
      currentRedirect.from = trimmed.match(/from = "(.+)"/)?.[1];
    } else if (trimmed.startsWith('to = ')) {
      currentRedirect.to = trimmed.match(/to = "(.+)"/)?.[1];
    } else if (trimmed.startsWith('status = ')) {
      currentRedirect.status = parseInt(trimmed.match(/status = (\d+)/)?.[1]);
    }
  }

  // Додаємо останній редирект
  if (currentRedirect.from && currentRedirect.to) {
    redirects.push(currentRedirect);
  }

  return redirects;
}

// Функція для тестування паттернів
function testRedirect(fromPattern, toPattern, testPath) {
  // Замінюємо * на (.*) для regex
  const regexPattern = fromPattern.replace(/\*/g, '(.*)');
  const regex = new RegExp('^' + regexPattern + '$');

  const match = testPath.match(regex);
  if (!match) return null;

  // Замінюємо :splat на захоплену групу
  let result = toPattern;
  if (match[1]) {
    result = result.replace(':splat', match[1]);
  }

  return result;
}

// Тестові випадки
const testCases = [
  // Releases
  { path: '/releases/album-name_th.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/releases/album-name_og.jpg', expected: '/assets/img/releases/album-name_og.jpg' },
  { path: '/releases/album-name_xl.jpg', expected: '/assets/img/releases/album-name_xl.jpg' },

  // Releases old structure
  { path: '/assets/img/releases/micro/album-name.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/assets/img/releases/micro-retina/album-name.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/assets/img/releases/small/album-name.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/assets/img/releases/small-retina/album-name.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/assets/img/releases/medium/album-name.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/assets/img/releases/medium-retina/album-name.jpg', expected: '/assets/img/releases/album-name_th.jpg' },
  { path: '/assets/img/releases/og-image/album-name.jpg', expected: '/assets/img/releases/album-name_og.jpg' },
  { path: '/assets/img/releases/large/album-name.jpg', expected: '/assets/img/releases/album-name_xl.jpg' },

  // Artists
  { path: '/assets/img/artists/micro/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_th.jpg' },
  { path: '/assets/img/artists/micro-retina/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_th.jpg' },
  { path: '/assets/img/artists/small/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_th.jpg' },
  { path: '/assets/img/artists/small-retina/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_th.jpg' },
  { path: '/assets/img/artists/medium/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_th.jpg' },
  { path: '/assets/img/artists/medium-retina/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_th.jpg' },
  { path: '/assets/img/artists/og-image/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_og.jpg' },
  { path: '/assets/img/artists/large/artist-name.jpg', expected: '/assets/img/artists/artist-name-01_xl.jpg' },

  // Backgrounds
  { path: '/assets/img/backgrounds/sombrero-red.jpg);background-image:url(https://content.sentimony.com/assets/img/backgrounds/sombrero-red_1x.jpg);background-image:url(https://content.sentimony.com/assets/img/backgrounds/sombrero-red_2x.jpg', expected: '/assets/img/backgrounds/sombrero-red.jpg' }
];

// Запускаємо тести
console.log('🧪 Тестування правил редиректів\n');

const redirects = parseRedirects(netlifyToml);
console.log(`Знайдено ${redirects.length} правил редиректів\n`);

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  let matched = false;
  let result = null;

  // Шукаємо відповідне правило редиректу
  for (const redirect of redirects) {
    result = testRedirect(redirect.from, redirect.to, testCase.path);
    if (result) {
      matched = true;
      break;
    }
  }

  if (matched && result === testCase.expected) {
    console.log(`✅ ${testCase.path}`);
    console.log(`   → ${result}\n`);
    passed++;
  } else {
    console.log(`❌ ${testCase.path}`);
    console.log(`   Очікувалось: ${testCase.expected}`);
    console.log(`   Отримано:    ${result || 'не знайдено правило'}\n`);
    failed++;
  }
}

console.log(`\n📊 Результати: ${passed} пройдено, ${failed} провалено`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 Всі тести пройдено успішно!');
}