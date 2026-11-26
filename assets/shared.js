/* Út Điệu — общее ядро трёх сайтов: языки, звук, WhatsApp, анимации.
   Настройки, которые можно менять, собраны в CONFIG. */
(function () {
  const CONFIG = {
    whatsapp: '84767907799',          // номер WhatsApp без «+»
    // Приблизительные курсы: сколько донгов в 1 единице валюты. Обновляйте при необходимости.
    rates: { USD: 26000, RUB: 325, KRW: 18.6, CNY: 3650 },
    currencyByLang: { ru: 'RUB', en: 'USD', ko: 'KRW', zh: 'CNY', vi: null },
  };
  const LANGS = ['ru', 'en', 'vi', 'ko', 'zh'];
  const NAMES = { ru: 'Русский', en: 'English', vi: 'Tiếng Việt', ko: '한국어', zh: '中文' };
  const STAR = '0,-10 2.25,-3.09 9.51,-3.09 3.63,1.18 5.88,8.09 0,3.82 -5.88,8.09 -3.63,1.18 -9.51,-3.09 -2.25,-3.09';
  const bars = (x, y, r) => `<g transform="translate(${x},${y}) rotate(${r})" fill="#111"><rect x="-5" y="-3.6" width="10" height="1.7"/><rect x="-5" y="-.85" width="10" height="1.7"/><rect x="-5" y="1.9" width="10" height="1.7"/></g>`;
  const FLAGS = {
    ru: '<rect width="60" height="40" fill="#fff"/><rect y="13.33" width="60" height="13.34" fill="#0039A6"/><rect y="26.67" width="60" height="13.33" fill="#D52B1E"/>',
    en: '<rect width="60" height="40" fill="#012169"/><path d="M0,0L60,40M60,0L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0L60,40M60,0L0,40" stroke="#C8102E" stroke-width="3"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="12"/><path d="M30,0V40M0,20H60" stroke="#C8102E" stroke-width="7"/>',
    vi: `<rect width="60" height="40" fill="#DA251D"/><polygon points="${STAR}" transform="translate(30,20) scale(1.15)" fill="#FFDE00"/>`,
    ko: `<rect width="60" height="40" fill="#fff"/><g transform="rotate(33 30 20)"><path d="M21,20a9,9 0 0 1 18,0a4.5,4.5 0 0 1-9,0a4.5,4.5 0 0 0-9,0z" fill="#CD2E3A"/><path d="M39,20a9,9 0 0 1-18,0a4.5,4.5 0 0 1 9,0a4.5,4.5 0 0 0 9,0z" fill="#0047A0"/></g>${bars(13, 9, -56)}${bars(47, 9, 56)}${bars(13, 31, 56)}${bars(47, 31, -56)}`,
    zh: `<rect width="60" height="40" fill="#DE2910"/><g fill="#FFDE00"><polygon points="${STAR}" transform="translate(12,12) scale(.62)"/><polygon points="${STAR}" transform="translate(23,5) scale(.2)"/><polygon points="${STAR}" transform="translate(27,10) scale(.2)"/><polygon points="${STAR}" transform="translate(27,16) scale(.2)"/><polygon points="${STAR}" transform="translate(23,21) scale(.2)"/></g>`,
  };
  const flag = (l) => `<span class="flag"><svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice">${FLAGS[l]}</svg></span>`;
  const WA_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l1.3-4.6A8.5 8.5 0 1 1 8 19.2z"/><path d="M9.3 8c-.8 1.2.2 3.3 1.8 4.9s3.7 2.6 4.9 1.8"/></svg>';

  const S = window.SITE || {};
  const root = S.root || '';
  const COMMON = {
    wa_btn: ['Написать в WhatsApp', 'Message on WhatsApp', 'Nhắn qua WhatsApp', 'WhatsApp 문의', 'WhatsApp 咨询'],
    snd: ['Включить атмосферу', 'Turn on ambience', 'Bật nhạc nền', '분위기 음악 켜기', '开启氛围音乐'],
    cross_k: ['Не только спа', 'More than a spa', 'Không chỉ là spa', '스파 그 이상', '不止是水疗'],
    cross_h: ['Ещё у Út Điệu', 'More from Út Điệu', 'Dịch vụ khác của Út Điệu', 'Út Điệu의 다른 서비스', 'Út Điệu 的其他服务'],
    x_spa_t: ['Спа и массаж', 'Spa & massage', 'Spa & massage', '스파 & 마사지', '水疗与按摩'],
    x_spa_p: ['Тело, стопы, волосы, ногти', 'Body, feet, hair, nails', 'Toàn thân, chân, gội đầu, móng', '바디, 발, 헤어, 네일', '身体、足部、洗发、美甲'],
    x_laundry_t: ['Прачечная', 'Laundry', 'Giặt sấy', '세탁 서비스', '洗衣服务'],
    x_laundry_p: ['Стирка и сушка — 30.000 ₫ за кг', 'Wash & dry — 30.000 ₫ per kg', 'Giặt và sấy — 30.000 ₫/kg', '세탁·건조 — kg당 30.000 ₫', '洗衣烘干 — 每公斤 30.000 ₫'],
    x_car_t: ['Аренда VinFast VF3', 'VinFast VF3 rental', 'Thuê xe VinFast VF3', 'VinFast VF3 렌트', '租 VinFast VF3'],
    x_car_p: ['Электромобиль без водителя — весь остров ваш', 'Self-drive electric car — the island is yours', 'Xe điện tự lái — khám phá cả đảo', '셀프 드라이브 전기차로 섬 전체를', '自驾电动车，畅游全岛'],
    rate_note: ['Цены указаны в донгах. Пересчёт в другую валюту приблизительный.', 'Prices are in Vietnamese dong. Other currencies are approximate.', 'Giá tính bằng đồng Việt Nam.', '가격은 베트남 동 기준이며, 환산 금액은 대략적입니다.', '价格以越南盾计，其他货币为约数。'],
    foot_addr: ['Tổ 3, Ông Lang, Phú Quốc, Вьетнам', 'Tổ 3, Ông Lang, Phú Quốc, Vietnam', 'Tổ 3, Ông Lang, Đặc khu Phú Quốc, An Giang', 'Tổ 3, Ông Lang, 푸꾸옥, 베트남', 'Tổ 3, Ông Lang, 富国岛, 越南'],
  };
  const dict = Object.assign({}, COMMON, S.dict || {});
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  let lang = null;

  const t = (k) => { const v = dict[k]; if (!v) return k; const x = v[LANGS.indexOf(lang)]; return x == null ? v[1] : x; };
  const dots = (n, sep) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const fmt = (k) => dots(k * 1000, '.') + ' ₫';
  function approx(k) {
    const c = CONFIG.currencyByLang[lang]; if (!c) return '';
    const v = k * 1000 / CONFIG.rates[c];
    if (c === 'USD') return '≈ $' + Math.round(v);
    if (c === 'RUB') return '≈ ' + dots(Math.round(v / 10) * 10, ' ') + ' ₽';
    if (c === 'KRW') return '≈ ' + dots(Math.round(v / 100) * 100, ',') + '원';
    return '≈ ¥' + Math.round(v);
  }
  const wa = (text) => 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text + '\n(My language: ' + NAMES[lang || 'en'] + ')');

  function apply() {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll('[data-wa]').forEach((el) => { el.href = wa(S.hello || 'Hello! I have a question.'); el.target = '_blank'; el.rel = 'noopener'; });
    if (dict.title) document.title = t('title');
    const lb = document.getElementById('langBtn'); if (lb) lb.innerHTML = flag(lang) + lang;
    const sn = document.querySelector('.snd span'); if (sn) sn.textContent = t('snd');
    if (S.onLang) S.onLang(lang);
  }
  function setLang(l) { lang = l; store.set('ud_lang', l); apply(); }

  /* ---------- language gate ---------- */
  const HI = ['Добро пожаловать', 'Welcome', 'Xin chào', '환영합니다', '欢迎光临'];
  const SUB = ['Выберите язык', 'Choose your language', 'Chọn ngôn ngữ', '언어를 선택하세요', '请选择语言'];
  let gateTimer;
  function openGate() {
    if (document.querySelector('.gate')) return;
    const g = document.createElement('div'); g.className = 'gate';
    g.innerHTML = (S.gateLogo || '') + `<div class="gate-hi">${HI[1]}</div><div class="gate-sub">${SUB[1]}</div><div class="gate-list">` +
      LANGS.map((l, i) => `<button data-l="${l}" style="animation-delay:${.25 + i * .08}s">${flag(l)}${NAMES[l]}</button>`).join('') + '</div>';
    document.body.appendChild(g); document.body.style.overflow = 'hidden';
    const hi = g.querySelector('.gate-hi'), sub = g.querySelector('.gate-sub'); let i = 1;
    gateTimer = setInterval(() => { hi.style.opacity = sub.style.opacity = 0; setTimeout(() => { i = (i + 1) % 5; hi.textContent = HI[i]; sub.textContent = SUB[i]; hi.style.opacity = 1; sub.style.opacity = .65; }, 400); }, 2000);
    g.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      clearInterval(gateTimer); setLang(b.dataset.l);
      g.classList.add('out'); document.body.style.overflow = ''; window.scrollTo(0, 0);
      setTimeout(() => g.remove(), 800); observe();
    });
  }

  /* ---------- reveal on scroll ---------- */
  let revBound = false;
  function observe() {
    const check = () => {
      const h = window.innerHeight;
      document.querySelectorAll('.rv:not(.in)').forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < h * .92 && r.bottom > 0) el.classList.add('in'); });
    };
    if (!revBound) { revBound = true; window.addEventListener('scroll', check, { passive: true }); window.addEventListener('resize', check); setInterval(check, 600); }
    check();
  }

  /* ---------- ambient sound (generated in the browser, no audio files) ---------- */
  let ctx, master, noteTimer, sndOn = false;
  function buildAudio() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const bus = ctx.createGain(), dly = ctx.createDelay(1.5), fb = ctx.createGain(), lp = ctx.createBiquadFilter();
    dly.delayTime.value = .52; fb.gain.value = .45; lp.type = 'lowpass'; lp.frequency.value = 1800;
    bus.connect(master); bus.connect(dly); dly.connect(lp); lp.connect(fb); fb.connect(dly); lp.connect(master);
    const a = S.audio || { drone: [110, 164.81], scale: [220, 246.94, 293.66, 329.63, 392, 440, 587.33], gap: [1400, 3200] };
    a.drone.forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = f; o.detune.value = i * 4; g.gain.value = .05; o.connect(g); g.connect(bus); o.start(); });
    const note = () => {
      if (sndOn) {
        const f = a.scale[Math.floor(Math.random() * a.scale.length)], now = ctx.currentTime;
        const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(.11, now + .03); g.gain.exponentialRampToValueAtTime(.0005, now + 3.5);
        o.connect(g); g.connect(bus); o.start(now); o.stop(now + 3.6);
      }
      noteTimer = setTimeout(note, a.gap[0] + Math.random() * (a.gap[1] - a.gap[0]));
    };
    note();
  }
  function toggleSound(btn) {
    sndOn = !sndOn; btn.classList.toggle('on', sndOn); btn.classList.add('mini');
    if (sndOn) { if (!ctx) buildAudio(); ctx.resume(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(.7, ctx.currentTime + 1.5); }
    else if (ctx) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6); setTimeout(() => { if (!sndOn) ctx.suspend(); }, 700); }
  }

  /* ---------- boot ---------- */
  window.UD = { t, fmt, approx, wa, flag, WA_ICON, get lang() { return lang; }, observe };
  document.addEventListener('DOMContentLoaded', () => {
    // cross-links to the sister sites
    const cx = document.getElementById('cross');
    if (cx) {
      const all = { spa: [root || './', '🌿'], laundry: [root + 'laundry/', '🫧'], car: [root + 'car/', '🚙'] };
      cx.innerHTML = `<div class="w"><div class="kick rv" data-i18n="cross_k"></div><h2 class="h2 rv" data-i18n="cross_h"></h2><div class="cross-grid">` +
        Object.keys(all).filter((k) => k !== S.id).map((k) => `<a class="xcard x-${k} rv" href="${all[k][0]}"><span class="ico">${all[k][1]}</span><span><b data-i18n="x_${k}_t"></b><small data-i18n="x_${k}_p"></small></span><span class="arr">→</span></a>`).join('') + '</div></div>';
    }
    // floating buttons
    const fab = document.createElement('a'); fab.className = 'fab'; fab.setAttribute('data-wa', ''); fab.setAttribute('aria-label', 'WhatsApp'); fab.innerHTML = WA_ICON; document.body.appendChild(fab);
    const snd = document.createElement('button'); snd.className = 'snd'; snd.innerHTML = '<div class="bars"><i></i><i></i><i></i><i></i></div><span></span>';
    snd.addEventListener('click', () => toggleSound(snd)); document.body.appendChild(snd);
    setTimeout(() => snd.classList.add('mini'), 9000);
    // header
    const hdr = document.querySelector('.hdr');
    if (hdr) { const f = () => hdr.classList.toggle('solid', window.scrollY > 30); f(); window.addEventListener('scroll', f, { passive: true }); }
    const lb = document.getElementById('langBtn'); if (lb) lb.addEventListener('click', openGate);
    // conversion event for ads: any click that opens WhatsApp
    document.addEventListener('click', (e) => { if (e.target.closest('a[href*="wa.me"]') && window.fbq) window.fbq('track', 'Contact'); });
    // language: ?lang=xx from an ad link → saved choice → gate
    const q = new URLSearchParams(location.search).get('lang'), saved = store.get('ud_lang');
    const pick = LANGS.includes(q) ? q : LANGS.includes(saved) ? saved : null;
    if (pick) { setLang(pick); observe(); } else { lang = 'en'; apply(); openGate(); }
  });
})();
