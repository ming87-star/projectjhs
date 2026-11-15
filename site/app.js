/* projectJHS landing page: renders site/games.js, switches KO/EN, and runs the kinetic type. */
(() => {
  'use strict';

  const GAMES = window.PROJECTJHS_GAMES || [];
  const PLAYABLE = GAMES.filter(g => g.stage === 'playable');
  const MAKING = GAMES.filter(g => g.stage === 'making');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  const COPY = {
    ko: {
      skip: '바로 가기로 건너뛰기',
      navLabel: '페이지 안내',
      navPlay: '바로 가기',
      navGames: '게임',
      navMaking: '만드는 중',
      heroLead: '',
      heroTail: '게임을 만듭니다.',
      count: (p, m) => `지금 해 볼 수 있는 게임 <b>${p}</b> · 만들고 있는 게임 <b>${m}</b>`,
      quickTitle: '바로 가기',
      panels: {
        play: { h: '웹에서 바로 하기', sub: '설치하지 않고 브라우저에서 바로 해 볼 수 있어요.' },
        beta: { h: '안드로이드 베타 신청', sub: '출시 전 앱을 먼저 받아 보고 의견을 보내 주세요.' },
        video: { h: '플레이 영상', sub: '눌러서 이 페이지에서 바로 봅니다.' },
      },
      trailer: '트레일러 · 소리 있음',
      clip: '플레이 화면 · 소리 없음',
      gamesTitle: '지금 해 볼 수 있는 게임',
      makingTitle: '만들고 있는 게임',
      makingNote: '아직 다듬고 있는 게임들입니다. 해 볼 수 있는 것에는 단추를 달아 두었습니다.',
      btnPlay: '웹에서 해 보기',
      btnBeta: '안드로이드 베타 신청',
      btnVideo: '영상 보기',
      perk: '베타 선물',
      langs: '지원 언어',
      footPrivacy: '개인정보처리방침',
      footDeletion: '계정·데이터 삭제 안내',
      footContact: '문의',
      footContactText: '문의는 Google Play 스토어 등록정보의 연락처로 주세요.',
      close: '닫기',
      newTab: '새 창에서 열림',
      shot: '게임 화면',
    },
    en: {
      skip: 'Skip to quick links',
      navLabel: 'Sections',
      navPlay: 'Jump in',
      navGames: 'Games',
      navMaking: 'In the works',
      heroLead: 'Making games where you',
      heroTail: '',
      count: (p, m) => `<b>${p}</b> games you can play now · <b>${m}</b> in the works`,
      quickTitle: 'Jump in',
      panels: {
        play: { h: 'Play in your browser', sub: 'No install. Open it and play.' },
        beta: { h: 'Join the Android beta', sub: 'Get the app before launch and tell us what you think.' },
        video: { h: 'Watch gameplay', sub: 'Plays right here on this page.' },
      },
      trailer: 'Trailer · with sound',
      clip: 'Gameplay clip · no sound',
      gamesTitle: 'Play these now',
      makingTitle: 'In the works',
      makingNote: 'Games still being shaped. The ones you can already try have a button.',
      btnPlay: 'Play in browser',
      btnBeta: 'Join the Android beta',
      btnVideo: 'Watch',
      perk: 'Beta gift',
      langs: 'Languages',
      footPrivacy: 'Privacy policies',
      footDeletion: 'Account & data deletion',
      footContact: 'Contact',
      footContactText: 'Please use the contact listed on each game’s Google Play or itch.io page.',
      close: 'Close',
      newTab: 'opens in a new tab',
      shot: 'screenshot',
    },
  };

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.6v14.8L19.6 12z" fill="currentColor"/></svg>',
    beta: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 3h5.6M10.2 3v6L4.7 18.2A1.8 1.8 0 0 0 6.2 21h11.6a1.8 1.8 0 0 0 1.5-2.8L13.8 9V3M7.4 14.5h9.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    video: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.8" y="5" width="18.4" height="14" rx="3.2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M10.2 9.2v5.6l4.7-2.8z" fill="currentColor"/></svg>',
    circlePlay: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".18"/><path d="M9.6 7.6v8.8l7-4.4z" fill="currentColor"/></svg>',
  };

  /* ── language ───────────────────────────────────────── */
  let lang = (() => {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'ko' || q === 'en') return q;
    try {
      const saved = localStorage.getItem('projectjhs-lang');
      if (saved === 'ko' || saved === 'en') return saved;
    } catch (e) { /* storage may be blocked */ }
    const first = (navigator.languages && navigator.languages[0]) || navigator.language || 'ko';
    return /^ko\b/i.test(first) ? 'ko' : 'en';
  })();
  const C = () => COPY[lang];
  const t = v => (v == null ? '' : typeof v === 'string' ? v : (v[lang] || v.ko || ''));
  const pick = v => (v == null ? '' : typeof v === 'string' ? v : (v[lang] || v.ko));
  const hasLat = s => /^[\x00-\x7F‘’“”…·—–]+$/.test(s);

  /* ── tiny DOM helpers ───────────────────────────────── */
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  function h(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function linkOut(a, href) {
    a.href = href;
    if (/^https?:/.test(href)) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    return a;
  }
  function img(src, alt, cls, w, hgt) {
    const i = new Image();
    i.src = src;
    i.alt = alt || '';
    i.decoding = 'async';
    i.loading = 'lazy';
    if (cls) i.className = cls;
    if (w) { i.width = w; i.height = hgt || w; }
    return i;
  }

  /* Split a title into letters: a hidden full-text copy for screen readers,
     and the animated letters (word groups keep Korean words from breaking). */
  function split(el, text, motion) {
    el.textContent = '';
    el.classList.add('kt');
    if (motion) el.dataset.motion = motion;
    el.append(h('span', 'sr', text));
    const box = h('span', 'kt-in');
    box.setAttribute('aria-hidden', 'true');
    let i = 0;
    text.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) { box.append(document.createTextNode(' ')); return; }
      const w = h('span', 'w');
      for (const ch of part) {
        const c = h('span', 'c', ch);
        c.style.setProperty('--i', i++);
        if (motion === 'snap') {
          c.style.setProperty('--sx', `${(Math.round(Math.random() * 6) - 3) * 0.5}em`);
          c.style.setProperty('--sy', `${(Math.round(Math.random() * 4) - 2) * 0.5}em`);
        }
        w.append(c);
      }
      box.append(w);
    });
    el.append(box);
    return el;
  }

  /* Letters animate when they come into view. Anything already on screen plays at once;
     anything below waits, so its motion is seen rather than missed. */
  const ktSeen = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      play(e.target);
      ktSeen.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }) : null;
  function play(el) {
    el.classList.remove('kt-wait', 'kt-play');
    void el.offsetWidth;
    el.classList.add('kt-play');
  }
  function arm(el) {
    if (reduceMotion.matches || !ktSeen) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) play(el);
    else { el.classList.remove('kt-play'); el.classList.add('kt-wait'); ktSeen.observe(el); }
  }
  function pokeOnHover(el) {
    let last = 0;
    el.addEventListener('pointerenter', () => {
      if (reduceMotion.matches || el.classList.contains('kt-wait')) return;
      const now = Date.now();
      if (now - last < 1400) return;
      last = now;
      play(el);
    });
  }

  /* ── static strings in index.html ───────────────────── */
  function renderStatic() {
    document.documentElement.lang = lang;
    $$('[data-t]').forEach(n => { const v = C()[n.dataset.t]; if (typeof v === 'string') n.textContent = v; });
    $$('[data-t-aria]').forEach(n => { const v = C()[n.dataset.tAria]; if (typeof v === 'string') n.setAttribute('aria-label', v); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  /* ── hero: wordmark + rotating line ─────────────────── */
  function buildWordmark() {
    const wm = $('#wordmark');
    let i = 0;
    for (const part of wm.querySelectorAll('span')) {
      const cls = part.classList.contains('wm-hi') ? 'hi' : 'lo';
      const text = part.textContent;
      part.textContent = '';
      part.setAttribute('aria-hidden', 'true');
      for (const ch of text) {
        const l = h('span', `l ${cls}`, ch);
        l.style.setProperty('--i', i++);
        part.append(l);
      }
    }
    if (!finePointer.matches) return;
    const letters = $$('.wordmark .l');
    const hero = $('.hero');
    let raf = 0, px = 0, py = 0;
    const apply = () => {
      raf = 0;
      if (reduceMotion.matches) return;
      wm.classList.add('near');
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), (py - (r.top + r.height / 2)) * 0.7);
        const k = Math.max(0, 1 - d / 340);
        const hi = l.classList.contains('hi');
        l.style.setProperty('--pw', String(Math.round(hi ? 520 + 380 * k : 220 + 680 * k)));
        l.style.setProperty('--ps', `${(hi ? 86 + 50 * k : 64 + 62 * k).toFixed(1)}%`);
      }
    };
    hero.addEventListener('pointermove', e => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    hero.addEventListener('pointerleave', () => {
      wm.classList.remove('near');
      letters.forEach(l => { l.style.removeProperty('--pw'); l.style.removeProperty('--ps'); });
    });
  }

  let rotTimer = 0, rotIndex = 0, heroVisible = true;
  function renderHero() {
    const line = $('#hero-line');
    line.textContent = '';
    const rot = h('a', 'rot');
    if (lang === 'ko') {
      line.append(rot, document.createElement('br'), h('span', 'tail', C().heroTail));
    } else {
      line.append(h('span', 'lead', C().heroLead), document.createElement('br'), rot);
    }
    rotIndex = 0;
    setPhrase(rot, GAMES[0], false);
    $('#hero-count').innerHTML = C().count(PLAYABLE.length, MAKING.length);
    clearInterval(rotTimer);
    if (reduceMotion.matches) return;
    rotTimer = setInterval(() => {
      if (document.hidden || !heroVisible) return;
      rot.classList.remove('in');
      rot.classList.add('out');
      setTimeout(() => {
        rotIndex = (rotIndex + 1) % GAMES.length;
        setPhrase(rot, GAMES[rotIndex], true);
      }, 420);
    }, 3000);
  }
  function setPhrase(rot, g, animate) {
    rot.href = `#${g.id}`;
    rot.style.setProperty('--accent', g.accent);
    split(rot, t(g.phrase) + (lang === 'en' ? '.' : ''));
    rot.classList.remove('kt', 'out');
    if (animate) { rot.classList.remove('in'); void rot.offsetWidth; rot.classList.add('in'); }
  }

  /* ── quick panels ───────────────────────────────────── */
  function renderQuick() {
    const grid = $('#quick-grid');
    grid.textContent = '';
    const groups = [
      ['play', PLAYABLE.filter(g => g.play)],
      ['beta', PLAYABLE.filter(g => g.beta)],
      ['video', PLAYABLE.filter(g => g.video)],
    ];
    for (const [kind, list] of groups) {
      if (!list.length) continue;
      const panel = h('div', `panel panel-${kind}`);
      const head = h('h3', 'panel-h');
      head.insertAdjacentHTML('afterbegin', ICONS[kind]);
      head.append(h('span', 'panel-name', C().panels[kind].h), h('span', 'panel-n', String(list.length)));
      panel.append(head, h('p', 'panel-sub', C().panels[kind].sub));
      const ul = h('ul', 'chips');
      for (const g of list) {
        let chip, note, go;
        if (kind === 'video') {
          chip = h('button', 'chip');
          chip.type = 'button';
          chip.addEventListener('click', () => openPlayer(g, chip));
          note = g.video.clip ? C().clip : C().trailer;
          go = g.video.length;
        } else {
          chip = linkOut(h('a', 'chip'), pick(g[kind].href));
          note = t(g[kind].note);
          go = /^https?:/.test(chip.href) && chip.target ? '↗' : '→';
          if (chip.target) chip.setAttribute('aria-label', `${t(g.short)} — ${C().panels[kind].h} (${C().newTab})`);
        }
        chip.style.setProperty('--accent', g.accent);
        const text = h('span', 'chip-text');
        text.append(h('span', 'chip-name', t(g.short)), h('span', 'chip-note', note));
        chip.append(img(g.icon, '', '', 46), text, h('span', 'chip-go', go));
        const li = h('li');
        li.append(chip);
        ul.append(li);
      }
      panel.append(ul);
      grid.append(panel);
    }
  }

  /* ── marquee ────────────────────────────────────────── */
  let mq = { x: 0, half: 0 };
  function renderMarquee() {
    const track = $('#marquee-track');
    track.textContent = '';
    const run = () => {
      for (const g of GAMES) {
        const name = t(g.title);
        const a = h('a', `mq-item${lang === 'en' && hasLat(name) ? ' lat' : ''}`, name);
        a.href = `#${g.id}`;
        a.tabIndex = -1;
        a.style.setProperty('--accent', g.accent);
        track.append(a, h('span', 'mq-sep'));
      }
    };
    run();
    run();
    requestAnimationFrame(() => { mq.half = track.scrollWidth / 2; });
  }
  function startMarquee() {
    const track = $('#marquee-track');
    const box = $('#marquee');
    if (reduceMotion.matches) return;
    let visible = true, last = performance.now(), lastY = window.scrollY, push = 0;
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      push += (y - lastY) * 7;
      lastY = y;
    }, { passive: true });
    window.addEventListener('resize', () => { mq.half = track.scrollWidth / 2; });
    const frame = now => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      push *= Math.pow(0.04, dt);
      if (visible && mq.half > 0) {
        const speed = 46 + Math.max(-900, Math.min(1400, push));
        mq.x -= speed * dt;
        if (mq.x <= -mq.half) mq.x += mq.half;
        if (mq.x > 0) mq.x -= mq.half;
        track.style.transform = `translate3d(${mq.x.toFixed(1)}px,0,0)`;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /* ── one band per game ──────────────────────────────── */
  const motionWatch = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const e of entries) {
      const n = e.target;
      n._inView = e.isIntersecting;
      if (n.tagName === 'VIDEO') {
        if (e.isIntersecting && !reduceMotion.matches && !saveData) n.play().catch(() => {});
        else n.pause();
      }
    }
  }, { threshold: 0.35 }) : null;

  function screenFor(g) {
    const s = g.screen;
    const wrap = h('div', `screen ${s.shape === 'wide' ? 'wide' : 'tall'}`);
    const shots = pick(s.shots) || [];
    if (s.shape !== 'wide' && s.loop && shots.length >= 2) {
      wrap.append(img(shots[0], '', 'fan l'), img(shots[1], '', 'fan r'));
    }
    const frame = h('div', 'screen-frame');
    if (s.loop) {
      const v = document.createElement('video');
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.preload = 'none';
      v.poster = pick(s.poster);
      v.src = pick(s.loop);
      v.setAttribute('aria-hidden', 'true');
      v.tabIndex = -1;
      frame.append(v);
      if (motionWatch) motionWatch.observe(v);
    } else {
      shots.forEach((src, k) => frame.append(img(src, k === 0 ? `${t(g.short)} — ${C().shot}` : '', `shot${k === 0 ? ' on' : ''}`)));
      if (motionWatch) motionWatch.observe(frame);
      frame.classList.add('slides');
    }
    wrap.append(frame);
    if (g.video) {
      const b = h('button', 'screen-play');
      b.type = 'button';
      b.insertAdjacentHTML('afterbegin', ICONS.circlePlay);
      b.append(h('span', '', C().btnVideo), h('small', '', g.video.length));
      b.addEventListener('click', () => openPlayer(g, b));
      wrap.append(b);
    }
    return wrap;
  }

  function renderWorlds() {
    const root = $('#worlds');
    root.textContent = '';
    for (const g of PLAYABLE) {
      const sec = h('article', `world${g.screen.shape === 'wide' ? ' is-wide' : ''}`);
      sec.id = g.id;
      sec.dataset.id = g.id;
      sec.dataset.motion = g.motion;
      sec.style.setProperty('--accent', g.accent);
      sec.style.setProperty('--art', `url("${new URL(pick(g.art), document.baseURI).href}")`);
      const inner = h('div', 'world-in');
      const text = h('div', 'world-text');

      text.append(h('p', 'world-kicker', t(g.kicker)));
      const title = t(g.title);
      const h3 = h('h3', `world-title${hasLat(title) ? ' lat' : ''}`);
      split(h3, title, g.motion);
      pokeOnHover(h3);
      text.append(h3);
      if (g.gloss && t(g.gloss) && lang !== 'ko') text.append(h('p', 'world-gloss', t(g.gloss)));

      const pills = h('ul', 'pills');
      (g.status[lang] || g.status.ko).forEach((p, k) => pills.append(h('li', `pill${k === 1 ? ' live' : ''}`, p)));
      text.append(pills);
      text.append(h('p', 'world-pitch', t(g.pitch)));
      if (g.detail) text.append(h('p', 'world-detail', t(g.detail)));

      const actions = h('div', 'actions');
      if (g.play) {
        const a = linkOut(h('a', 'btn btn-main'), pick(g.play.href));
        a.insertAdjacentHTML('afterbegin', ICONS.play);
        a.append(h('span', '', C().btnPlay), h('small', '', t(g.play.note)));
        actions.append(a);
      }
      if (g.beta) {
        const a = linkOut(h('a', 'btn btn-line'), pick(g.beta.href));
        a.insertAdjacentHTML('afterbegin', ICONS.beta);
        a.append(h('span', '', C().btnBeta), h('small', '', t(g.beta.note)));
        actions.append(a);
      }
      if (g.video) {
        const b = h('button', 'btn btn-line');
        b.type = 'button';
        b.insertAdjacentHTML('afterbegin', ICONS.video);
        b.append(h('span', '', C().btnVideo), h('small', '', g.video.length));
        b.addEventListener('click', () => openPlayer(g, b));
        actions.append(b);
      }
      text.append(actions);

      if (g.perk) {
        const p = h('p', 'perk');
        p.append(h('b', '', C().perk), document.createTextNode(t(g.perk)));
        text.append(p);
      }
      const meta = h('p', 'world-meta');
      if (g.langs) meta.append(h('span', '', `${C().langs}: ${t(g.langs)}`));
      (g.links || []).forEach(l => meta.append(linkOut(h('a', '', t(l.label)), l.href)));
      if (meta.childNodes.length) text.append(meta);

      const media = h('div', 'world-media');
      media.append(screenFor(g));
      inner.append(text, media);
      sec.append(inner);
      root.append(sec);
    }
  }

  /* ── in the works ───────────────────────────────────── */
  function renderMaking() {
    const grid = $('#making-grid');
    grid.textContent = '';
    for (const g of MAKING) {
      const card = h('article', 'card');
      card.id = g.id;
      card.dataset.id = g.id;
      card.dataset.motion = g.motion;
      card.style.setProperty('--accent', g.accent);
      const art = h('div', 'card-art');
      art.append(img(pick(g.art), '', ''));
      const body = h('div', 'card-body');
      const title = t(g.title);
      const h3 = h('h3', `card-title${hasLat(title) ? ' lat' : ''}`);
      split(h3, title, g.motion);
      pokeOnHover(h3);
      const pills = h('ul', 'pills');
      (g.status[lang] || g.status.ko).forEach(p => pills.append(h('li', 'pill', p)));
      body.append(h3, pills, h('p', 'card-pitch', t(g.pitch)));
      if (g.play) {
        const a = linkOut(h('a', 'btn btn-line card-go'), pick(g.play.href));
        a.insertAdjacentHTML('afterbegin', ICONS.play);
        a.append(h('span', '', t(g.play.label)));
        body.append(a);
      }
      card.append(art, body);
      grid.append(card);
    }
  }

  /* screenshot slideshows advance only while on screen */
  setInterval(() => {
    if (document.hidden || reduceMotion.matches) return;
    $$('.screen-frame.slides').forEach(frame => {
      if (!frame._inView) return;
      const shots = frame.querySelectorAll('.shot');
      if (shots.length < 2) return;
      const on = [...shots].findIndex(s => s.classList.contains('on'));
      shots[on].classList.remove('on');
      shots[(on + 1) % shots.length].classList.add('on');
    });
  }, 3200);

  /* ── video player ───────────────────────────────────── */
  const dlg = $('#player');
  const vid = $('#player-video');
  let returnFocus = null;
  function openPlayer(g, from) {
    returnFocus = from || null;
    dlg.classList.toggle('tall', g.video.shape === 'tall');
    dlg.classList.toggle('wide', g.video.shape !== 'tall');
    $('#player-title').textContent = `${t(g.short)} · ${g.video.length}`;
    vid.poster = pick(g.video.poster) || '';
    vid.src = pick(g.video.src);
    vid.loop = !!g.video.clip;
    vid.muted = false;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    vid.play().catch(() => {});
  }
  function closePlayer() {
    if (typeof dlg.close === 'function' && dlg.open) dlg.close(); else dlg.removeAttribute('open');
  }
  dlg.addEventListener('close', () => {
    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    if (returnFocus) returnFocus.focus();
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) closePlayer(); });
  $('#player-close').addEventListener('click', closePlayer);

  /* ── wiring ─────────────────────────────────────────── */
  function renderAll() {
    renderStatic();
    renderHero();
    renderQuick();
    renderMarquee();
    renderWorlds();
    renderMaking();
    $$('.band-title > span').forEach(n => { split(n, n.textContent); });
    requestAnimationFrame(() => $$('.kt').forEach(n => { if (!n.classList.contains('rot')) arm(n); }));
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem('projectjhs-lang', lang); } catch (e) { /* ignore */ }
    try {
      const u = new URL(location.href);
      u.searchParams.set('lang', lang);
      history.replaceState(null, '', u);
    } catch (e) { /* ignore */ }
    renderAll();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  const bar = $('.bar');
  window.addEventListener('scroll', () => bar.classList.toggle('scrolled', window.scrollY > 8), { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe($('.hero'));
  }

  buildWordmark();
  renderAll();
  startMarquee();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { mq.half = $('#marquee-track').scrollWidth / 2; });
})();
