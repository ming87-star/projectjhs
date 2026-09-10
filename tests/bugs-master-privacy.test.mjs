import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(resolve(root, path), 'utf8');
const current = read('privacy/bugs-master.html');
const archive = read('privacy/bugs-master-20260903.html');
const preview = read('privacy/bugs-master-preview.html');

test('current policy and proposed advertising update stay distinct', () => {
  assert.match(current, /시행일: 2026년 9월 3일/);
  assert.match(current, /현재 공개 버전에 적용되는 방침/);
  assert.match(current, /bugs-master-preview.html/);
  assert.match(preview, /아직 시행 전/);
  assert.match(preview, /bugs-master-20260903.html/);
  assert.match(preview, /만 14세 미만/);
  assert.match(preview, /ming87@gmail.com/);
  assert.deepEqual(current.match(/<section>[\s\S]*?<\/section>/g), archive.match(/<section>[\s\S]*?<\/section>/g));
});

test('all policy pages are static and their local links resolve', () => {
  for (const name of ['bugs-master.html', 'bugs-master-preview.html', 'bugs-master-20260903.html', 'bugs-master-deletion.html']) {
    const pagePath = resolve(root, 'privacy', name);
    const html = readFileSync(pagePath, 'utf8');
    assert.doesNotMatch(html, /<(script|iframe|form)\b|\son\w+\s*=/i);
    assert.match(html, /name="viewport"/);
    assert.match(html, /https:\/\/bugs-master\.ald-stark\.chatgpt\.site\/game\/account-deletion.html/);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (/^(https:|mailto:|#)/.test(href)) continue;
      const target = resolve(dirname(pagePath), href);
      assert.ok(target.startsWith(root), `Link escapes site: ${href}`);
      assert.ok(existsSync(target), `Missing link: ${href}`);
    }
  }
});

test('homepage retains existing game link and adds Bugs Master link', () => {
  const html = read('index.html');
  assert.match(html, /href="privacy\/whileclimbing.html"/);
  assert.match(html, /href="privacy\/bugs-master.html"/);
  assert.match(html, /href="privacy\/bugs-master-deletion.html"/);
  assert.ok(existsSync(resolve(root, 'privacy/whileclimbing.html')));
});

test('deletion guide separates account, cloud save and local data', () => {
  const html = read('privacy/bugs-master-deletion.html');
  for (const id of ['account', 'game-data', 'local', 'retention', 'help']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /계정은 유지하고 클라우드 게임 기록만 삭제/);
  assert.match(html, /클라우드 기록 삭제/);
  assert.match(html, /이 기기의 기록 삭제/);
  assert.match(html, /Google 계정 전체를 삭제하는 기능이 아닙니다/);
  assert.match(html, /최대 180일/);
  assert.match(html, /수 주간/);
  assert.match(html, /이메일 요청은 자동 삭제가 아닙니다/);
  assert.match(html, /비밀번호, 인증번호, 신분증은 보내지 마세요/);
  assert.match(html, /ming87@gmail.com/);
  assert.doesNotMatch(html, /모든.*즉시.*영구 삭제/);
  for (const [, href] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.match(html, new RegExp(`id="${href}"`));
  }
});
