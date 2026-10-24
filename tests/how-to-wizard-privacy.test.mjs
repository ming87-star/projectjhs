import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const pagePath = resolve(root, 'privacy/how-to-wizard.html');
const html = readFileSync(pagePath, 'utf8');

test('the How to Wizard policy is a static page whose local links resolve', () => {
  assert.doesNotMatch(html, /<(script|iframe|form)\b|\son\w+\s*=/i);
  assert.match(html, /name="viewport"/);
  assert.doesNotMatch(html, /확인 필요/);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https:|mailto:|#)/.test(href)) continue;
    const target = resolve(dirname(pagePath), href);
    assert.ok(target.startsWith(root), `Link escapes site: ${href}`);
    assert.ok(existsSync(target), `Missing link: ${href}`);
  }
});

test('the policy names every server feature and the index links to it', () => {
  for (const words of [/Firebase/, /우물 메아리/, /주간 순위/, /오류 보고/, /의견 보내기/, /Google Play 결제/, /광고가 없/]) assert.match(html, words);
  assert.match(readFileSync(resolve(root, 'index.html'), 'utf8'), /privacy\/how-to-wizard\.html/);
});
