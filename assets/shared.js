/* Út Điệu — общее ядро трёх сайтов: языки, звук, WhatsApp, анимации.
   Настройки, которые можно менять, собраны в CONFIG. */
(function () {
  const CONFIG = {
    whatsapp: '84767907799',          // номер WhatsApp без «+»
    // Приблизительные курсы: сколько донгов в 1 единице валюты. Обновляйте при необходимости.
    rates: { USD: 26000, RUB: 325, KRW: 18.6, CNY: 3650, KZT: 50, UZS: 2.1, EUR: 30000 },
    currencyByLang: { ru: 'RUB', en: 'USD', ko: 'KRW', zh: 'CNY', vi: null, kk: 'KZT', uz: 'UZS', de: 'EUR', fr: 'EUR' },
  };
  const LANGS = ['ru', 'en', 'vi', 'ko', 'zh', 'kk', 'uz', 'de', 'fr'];
  const NAMES = { ru: 'Русский', en: 'English', vi: 'Tiếng Việt', ko: '한국어', zh: '中文', kk: 'Қазақша', uz: 'Oʻzbekcha', de: 'Deutsch', fr: 'Français' };
  const STAR = '0,-10 2.25,-3.09 9.51,-3.09 3.63,1.18 5.88,8.09 0,3.82 -5.88,8.09 -3.63,1.18 -9.51,-3.09 -2.25,-3.09';
  const bars = (x, y, r) => `<g transform="translate(${x},${y}) rotate(${r})" fill="#111"><rect x="-5" y="-3.6" width="10" height="1.7"/><rect x="-5" y="-.85" width="10" height="1.7"/><rect x="-5" y="1.9" width="10" height="1.7"/></g>`;
  const FLAGS = {
    ru: '<rect width="60" height="40" fill="#fff"/><rect y="13.33" width="60" height="13.34" fill="#0039A6"/><rect y="26.67" width="60" height="13.33" fill="#D52B1E"/>',
    en: '<rect width="60" height="40" fill="#012169"/><path d="M0,0L60,40M60,0L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0L60,40M60,0L0,40" stroke="#C8102E" stroke-width="3"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="12"/><path d="M30,0V40M0,20H60" stroke="#C8102E" stroke-width="7"/>',
    vi: `<rect width="60" height="40" fill="#DA251D"/><polygon points="${STAR}" transform="translate(30,20) scale(1.15)" fill="#FFDE00"/>`,
    ko: `<rect width="60" height="40" fill="#fff"/><g transform="rotate(33 30 20)"><path d="M21,20a9,9 0 0 1 18,0a4.5,4.5 0 0 1-9,0a4.5,4.5 0 0 0-9,0z" fill="#CD2E3A"/><path d="M39,20a9,9 0 0 1-18,0a4.5,4.5 0 0 1 9,0a4.5,4.5 0 0 0 9,0z" fill="#0047A0"/></g>${bars(13, 9, -56)}${bars(47, 9, 56)}${bars(13, 31, 56)}${bars(47, 31, -56)}`,
    zh: `<rect width="60" height="40" fill="#DE2910"/><g fill="#FFDE00"><polygon points="${STAR}" transform="translate(12,12) scale(.62)"/><polygon points="${STAR}" transform="translate(23,5) scale(.2)"/><polygon points="${STAR}" transform="translate(27,10) scale(.2)"/><polygon points="${STAR}" transform="translate(27,16) scale(.2)"/><polygon points="${STAR}" transform="translate(23,21) scale(.2)"/></g>`,
    kk: '<rect width="60" height="40" fill="#00AFCA"/><circle cx="32" cy="17" r="5.5" fill="#FEC50C"/><circle cx="32" cy="17" r="8.5" fill="none" stroke="#FEC50C" stroke-width="2" stroke-dasharray="1.3 1.7"/><path d="M19 27q13 7 26 0q-13 3-26 0z" fill="#FEC50C"/><path d="M6 3v34" stroke="#FEC50C" stroke-width="3" stroke-dasharray="3 2"/>',
    uz: '<rect width="60" height="40" fill="#fff"/><rect width="60" height="12.5" fill="#0099B5"/><rect y="27.5" width="60" height="12.5" fill="#1EB53A"/><rect y="12.5" width="60" height="1.2" fill="#CE1126"/><rect y="26.3" width="60" height="1.2" fill="#CE1126"/><circle cx="10" cy="6.3" r="4" fill="#fff"/><circle cx="11.6" cy="6.3" r="3.4" fill="#0099B5"/><g fill="#fff"><circle cx="18" cy="3.5" r=".8"/><circle cx="21" cy="3.5" r=".8"/><circle cx="24" cy="3.5" r=".8"/><circle cx="21" cy="6.3" r=".8"/><circle cx="24" cy="6.3" r=".8"/><circle cx="24" cy="9.1" r=".8"/></g>',
    de: '<rect width="60" height="40" fill="#FFCE00"/><rect width="60" height="26.67" fill="#DD0000"/><rect width="60" height="13.33" fill="#111"/>',
    fr: '<rect width="60" height="40" fill="#fff"/><rect width="20" height="40" fill="#0055A4"/><rect x="40" width="20" height="40" fill="#EF4135"/>',
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
    rev_k: ['Отзывы гостей', 'Guest reviews', 'Đánh giá của khách', '고객 리뷰', '客人评价'],
    rev_n: ['108 отзывов на Google Maps', '108 reviews on Google Maps', '108 đánh giá trên Google Maps', 'Google 지도 리뷰 108개', 'Google 地图 108 条评价'],
    rev_all: ['Все отзывы на Google', 'All reviews on Google', 'Xem tất cả trên Google', 'Google에서 모두 보기', '在 Google 查看全部'],
    foot_addr: ['Tổ 3, Ông Lang, Phú Quốc, Вьетнам', 'Tổ 3, Ông Lang, Phú Quốc, Vietnam', 'Tổ 3, Ông Lang, Đặc khu Phú Quốc, An Giang', 'Tổ 3, Ông Lang, 푸꾸옥, 베트남', 'Tổ 3, Ông Lang, 富国岛, 越南'],
  };
  const COMMON_X = {
    wa_btn: ['WhatsApp-қа жазу', 'WhatsAppga yozish', 'Per WhatsApp schreiben', 'Écrire sur WhatsApp'],
    snd: ['Әуенді қосу', 'Musiqani yoqish', 'Ambiente einschalten', "Activer l'ambiance"],
    cross_k: ['Тек спа емес', 'Faqat spa emas', 'Mehr als ein Spa', "Plus qu'un spa"],
    cross_h: ['Út Điệu-дің басқа қызметтері', 'Út Điệu ning boshqa xizmatlari', 'Mehr von Út Điệu', 'Aussi chez Út Điệu'],
    x_spa_t: ['Спа және массаж', 'Spa va massaj', 'Spa & Massage', 'Spa & massage'],
    x_spa_p: ['Дене, табан, шаш, тырнақ', 'Tana, oyoq, soch, tirnoq', 'Körper, Füße, Haare, Nägel', 'Corps, pieds, cheveux, ongles'],
    x_laundry_t: ['Кір жуу', 'Kir yuvish', 'Wäscherei', 'Laverie'],
    x_laundry_p: ['Жуу және кептіру — кг 30.000 ₫', 'Yuvish va quritish — kg 30.000 ₫', 'Waschen & Trocknen — 30.000 ₫ pro kg', 'Lavage & séchage — 30.000 ₫ le kg'],
    x_car_t: ['VinFast VF3 жалға алу', 'VinFast VF3 ijarasi', 'VinFast VF3 mieten', 'Location VinFast VF3'],
    x_car_p: ['Жүргізушісіз электромобиль — бүкіл арал сіздікі', 'Haydovchisiz elektromobil — butun orol sizniki', 'E-Auto zum Selbstfahren — die Insel gehört Ihnen', "Voiture électrique sans chauffeur — l'île est à vous"],
    rate_note: ['Бағалар донгпен көрсетілген. Басқа валютаға аудару шамамен.', 'Narxlar dongda. Boshqa valyutadagi qiymat taxminiy.', 'Preise in vietnamesischen Dong. Andere Währungen sind Richtwerte.', 'Prix en dongs vietnamiens. Les autres devises sont approximatives.'],
    rev_k: ['Қонақтар пікірі', 'Mehmonlar fikri', 'Gästebewertungen', 'Avis des clients'],
    rev_n: ['Google Maps-та 108 пікір', 'Google Maps’da 108 ta sharh', '108 Bewertungen auf Google Maps', '108 avis sur Google Maps'],
    rev_all: ['Барлық пікір Google-да', 'Barcha sharhlar Google’da', 'Alle Bewertungen auf Google', 'Tous les avis sur Google'],
    foot_addr: ['Tổ 3, Ông Lang, Phú Quốc, Вьетнам', 'Tổ 3, Ông Lang, Phú Quốc, Vyetnam', 'Tổ 3, Ông Lang, Phú Quốc, Vietnam', 'Tổ 3, Ông Lang, Phú Quốc, Vietnam'],
  };
  const dict = Object.assign({}, COMMON, S.dict || {});
  // дополнительные языки [kk, uz, de, fr] дописываются к основным пяти
  [COMMON_X, S.extra || {}].forEach((x) => Object.keys(x).forEach((k) => { if (dict[k]) dict[k] = dict[k].slice(0, 5).concat(x[k]); }));
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
    if (c === 'EUR') return '≈ €' + Math.round(v);
    if (c === 'KZT') return '≈ ' + dots(Math.round(v / 100) * 100, ' ') + ' ₸';
    if (c === 'UZS') return '≈ ' + dots(Math.round(v / 1000) * 1000, ' ') + ' soʻm';
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
    renderReviews();
    if (S.onLang) S.onLang(lang);
  }
  /* отзывы с Google Maps: сначала на языке гостя, потом английские, потом остальные */
  const MAPS = 'https://maps.google.com/?cid=10207953114541808885', RATING = '4.9';
  function renderReviews() {
    const tr = document.getElementById('revTrack'); if (!tr || !S.reviews) return;
    const pref = [lang, { kk: 'ru', uz: 'ru' }[lang], 'en'];
    const rank = (r) => { const i = pref.indexOf(r.l); return i < 0 ? 9 : i; };
    tr.innerHTML = S.reviews.slice().sort((a, b) => rank(a) - rank(b)).map((r) =>
      `<figure class="rev"><div class="rev-s">★★★★★</div><blockquote lang="${r.l}">${r.t}</blockquote><figcaption><b>${r.n}</b><span>Google</span></figcaption></figure>`).join('');
    tr.scrollLeft = 0;
  }
  function setLang(l) { lang = l; store.set('ud_lang', l); apply(); }

  /* ---------- language gate ---------- */
  const HI = ['Добро пожаловать', 'Welcome', 'Xin chào', '환영합니다', '欢迎光临', 'Қош келдіңіз', 'Xush kelibsiz', 'Willkommen', 'Bienvenue'];
  const SUB = ['Выберите язык', 'Choose your language', 'Chọn ngôn ngữ', '언어를 선택하세요', '请选择语言', 'Тілді таңдаңыз', 'Tilni tanlang', 'Sprache wählen', 'Choisissez votre langue'];
  let gateTimer;
  function openGate(first) {
    if (document.querySelector('.gate')) return;
    const g = document.createElement('div'); g.className = 'gate'; if (first) g.style.animation = 'none';
    g.innerHTML = (S.gateLogo || '') + `<div class="gate-txt"><div class="gate-hi">${HI[1]}</div><div class="gate-sub">${SUB[1]}</div></div><div class="gate-list">` +
      LANGS.map((l, i) => `<button data-l="${l}" class="${l === lang && !first ? 'cur' : ''}" style="animation-delay:${.15 + i * .05}s">${flag(l)}<span>${NAMES[l]}</span></button>`).join('') + '</div>';
    document.body.appendChild(g); document.body.style.overflow = 'hidden';
    const txt = g.querySelector('.gate-txt'), hi = g.querySelector('.gate-hi'), sub = g.querySelector('.gate-sub'); let i = 1;
    gateTimer = setInterval(() => { txt.classList.add('hide'); setTimeout(() => { i = (i + 1) % HI.length; hi.textContent = HI[i]; sub.textContent = SUB[i]; txt.classList.remove('hide'); }, 350); }, 2200);
    let done = false;
    g.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || done) return; done = true;
      clearInterval(gateTimer); b.classList.add('picked'); g.classList.add('chosen');
      // сначала подсвечиваем выбор, затем меняем тексты под закрытой шторкой и поднимаем её
      setTimeout(() => {
        setLang(b.dataset.l);
        if (first) window.scrollTo({ top: 0, behavior: 'instant' });
        document.body.style.overflow = ''; g.classList.add('out'); observe();
        setTimeout(() => g.remove(), 900);
      }, 380);
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
  window.UD = { t, fmt, approx, wa, flag, WA_ICON, get lang() { return lang; }, observe, pick: (a) => { const x = a[LANGS.indexOf(lang)]; return x == null ? a[1] : x; } };
  document.addEventListener('DOMContentLoaded', () => {
    // cross-links to the sister sites
    const cx = document.getElementById('cross');
    if (cx) {
      const all = { spa: [root || './', '🌿'], laundry: [root + 'laundry/', '🫧'], car: [root + 'car/', '🚙'] };
      cx.innerHTML = `<div class="w"><div class="kick rv" data-i18n="cross_k"></div><h2 class="h2 rv" data-i18n="cross_h"></h2><div class="cross-grid">` +
        Object.keys(all).filter((k) => k !== S.id).map((k) => `<a class="xcard x-${k} rv" href="${all[k][0]}"><span class="ico">${all[k][1]}</span><span><b data-i18n="x_${k}_t"></b><small data-i18n="x_${k}_p"></small></span><span class="arr">→</span></a>`).join('') + '</div></div>';
    }
    // reviews
    const rs = document.getElementById('reviews');
    if (rs && S.reviews) rs.innerHTML = `<div class="w"><div class="kick rv" data-i18n="rev_k"></div><a class="rev-top rv" href="${MAPS}" target="_blank" rel="noopener"><b>${RATING}</b><span><i>★★★★★</i><small data-i18n="rev_n"></small></span></a></div><div class="rev-track rv" id="revTrack"></div><div class="w"><a class="btn ghost rev-all rv" href="${MAPS}" target="_blank" rel="noopener" data-i18n="rev_all"></a></div>`;
    document.querySelectorAll('[data-rate]').forEach((el) => { el.href = MAPS; el.target = '_blank'; el.rel = 'noopener'; el.innerHTML = `<i>★</i> ${RATING} · <span data-i18n="rev_n"></span>`; });
    // floating buttons
    const fab = document.createElement('a'); fab.className = 'fab'; fab.setAttribute('data-wa', ''); fab.setAttribute('aria-label', 'WhatsApp'); fab.innerHTML = WA_ICON; document.body.appendChild(fab);
    const snd = document.createElement('button'); snd.className = 'snd'; snd.innerHTML = '<div class="bars"><i></i><i></i><i></i><i></i></div><span></span>';
    snd.setAttribute('aria-label', 'Sound');
    snd.addEventListener('click', () => toggleSound(snd));
    const lb0 = document.getElementById('langBtn');
    if (lb0) { const r = document.createElement('div'); r.className = 'hdr-r'; lb0.replaceWith(r); r.append(snd, lb0); } else document.body.appendChild(snd);
    setTimeout(() => snd.classList.add('mini'), 9000);
    // header
    const hdr = document.querySelector('.hdr');
    if (hdr) { const f = () => hdr.classList.toggle('solid', window.scrollY > 30); f(); window.addEventListener('scroll', f, { passive: true }); }
    const lb = document.getElementById('langBtn'); if (lb) lb.addEventListener('click', () => openGate(false));
    // conversion event for ads: any click that opens WhatsApp
    document.addEventListener('click', (e) => { if (e.target.closest('a[href*="wa.me"]') && window.fbq) window.fbq('track', 'Contact'); });
    // language: ?lang=xx from an ad link → saved choice → gate
    const q = new URLSearchParams(location.search).get('lang'), saved = store.get('ud_lang');
    const pick = LANGS.includes(q) ? q : LANGS.includes(saved) ? saved : null;
    if (pick) { setLang(pick); observe(); } else { lang = 'en'; apply(); openGate(true); }
  });
})();
