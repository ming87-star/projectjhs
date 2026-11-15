import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(resolve(root, path), 'utf8');
const html = read('index.html');

function loadGames() {
  const sandbox = { window: {} };
  vm.runInNewContext(read('site/games.js'), sandbox);
  return sandbox.window.PROJECTJHS_GAMES;
}

function strings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (value && typeof value === 'object') Object.values(value).forEach(v => strings(v, out));
  return out;
}

test('the homepage loads its own script, data and styles', () => {
  for (const file of ['site/games.js', 'site/app.js', 'site/style.css', 'assets/favicon.svg', 'assets/og.jpg']) {
    assert.ok(existsSync(resolve(root, file)), `Missing ${file}`);
  }
  assert.match(html, /<script src="site\/games\.js"><\/script>\s*<script src="site\/app\.js"><\/script>/);
  assert.match(html, /name="viewport"/);
});

test('every image and video named in the game list exists', () => {
  const missing = strings(loadGames()).filter(s => s.startsWith('assets/') && !existsSync(resolve(root, s)));
  assert.deepEqual(missing, []);
});

test('links go to https or stay on this site', () => {
  for (const s of strings(loadGames())) {
    if (/^[a-z]+:/i.test(s)) assert.match(s, /^https:\/\//, `Not https: ${s}`);
  }
  for (const href of ['whileclimbing/', 'privacy/how-to-wizard.html', 'privacy/whileclimbing.html', 'privacy/bugs-master.html', 'privacy/bugs-master-deletion.html']) {
    assert.ok(existsSync(resolve(root, href)), `Missing ${href}`);
  }
});

test('each playable game offers a way to play and a way to join the beta, in both languages', () => {
  const games = loadGames();
  const ids = new Set();
  for (const g of games) {
    assert.ok(!ids.has(g.id), `Duplicate id ${g.id}`);
    ids.add(g.id);
    assert.ok(g.title.ko && g.title.en, `${g.id} needs a Korean and an English title`);
    assert.ok(g.pitch.ko && g.pitch.en, `${g.id} needs a Korean and an English pitch`);
    if (g.stage !== 'playable') continue;
    assert.ok(g.play && g.play.href, `${g.id} has no play link`);
    assert.ok(g.beta && g.beta.href, `${g.id} has no beta link`);
    assert.ok(g.icon && g.screen, `${g.id} needs an icon and a screen`);
  }
  assert.ok(games.filter(g => g.stage === 'playable').length >= 5);
});
