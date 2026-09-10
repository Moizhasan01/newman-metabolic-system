/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* ═══════════════════════════════════════════════════════════════
   CONFIG — the only block you need to edit before launch.
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  currency: '$',
  // Stripe Payment Link / Shopify cart / Lemon Squeezy checkout.
  // '#' keeps the button inert until a real URL is set.
  checkoutUrl: '#',
  // Optional: a distinct link per format. Falls back to checkoutUrl.
  checkoutByFormat: { hardcover: '', paperback: '', signed: '', ebook: '' } as Record<string, string>,
  retailers: { amazon: '#', barnesnoble: '#', bookshop: '#' } as Record<string, string>,
  freeShipFrom: 2
};

export function initNewmanSite(): () => void {
  const teardown: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(
    target: Window | HTMLElement | Element,
    type: string,
    fn: EventListenerOrEventListenerObject,
    opts?: AddEventListenerOptions
  ) => {
    target.addEventListener(type, fn, opts);
    teardown.push(() => target.removeEventListener(type, fn, opts));
    return type as unknown as K;
  };

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const smooth = (t: number) => t * t * (3 - 2 * t);

  document.getElementById('yr')!.textContent = String(new Date().getFullYear());

  /* ── header + progress rail ─────────────────────────────────── */
  const hdr = document.getElementById('hdr')!,
    rail = document.getElementById('rail')!;

  /* ── reveal: elements are visible at rest; only arm what loads below the fold ── */
  (function () {
    const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (RM || !('IntersectionObserver' in window)) return;
    const vh = window.innerHeight;
    const armed = items.filter((el) => el.getBoundingClientRect().top > vh * 0.88);
    armed.forEach((el) => el.classList.add('armed'));
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    armed.forEach((el) => io.observe(el));
    teardown.push(() => io.disconnect());
  })();

  /* ── pinned-section scroll progress ─────────────────────────── */
  function pinP(sec: HTMLElement) {
    const total = sec.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return clamp(-sec.getBoundingClientRect().top / total, 0, 1);
  }
  const secReframe = document.querySelector<HTMLElement>('[data-pin="reframe"]')!;
  const secBallet = document.querySelector<HTMLElement>('[data-pin="ballet"]')!;
  const secMarathon = document.querySelector<HTMLElement>('[data-pin="marathon"]')!;

  /* 2 · the reframe */
  const swap = document.getElementById('swap')!;
  const calNum = document.getElementById('calNum')!,
    calBar = document.getElementById('calBar')!;
  const nutNum = document.getElementById('nutNum')!,
    nutBar = document.getElementById('nutBar')!;
  const CAL0 = 1847;
  function drawReframe(p: number) {
    const strike = smooth(clamp(p / 0.34, 0, 1));
    const show = smooth(clamp((p - 0.30) / 0.34, 0, 1));
    swap.style.setProperty('--strike', strike.toFixed(3));
    swap.style.setProperty('--bshow', show.toFixed(3));
    const cal = Math.round(lerp(CAL0, 0, strike));
    calNum.textContent = cal.toLocaleString();
    calBar.style.width = ((cal / CAL0) * 100).toFixed(1) + '%';
    const nut = Math.round(smooth(clamp((p - 0.26) / 0.6, 0, 1)) * 100);
    nutNum.textContent = nut + '%';
    nutBar.style.width = nut + '%';
  }

  /* 5 · Vitruvian geometry draws itself */
  const vitStage = document.getElementById('vitStage')!;
  const vitLines = [...vitStage.querySelectorAll<SVGElement>('.draw')];
  function drawVit() {
    const r = vitStage.getBoundingClientRect();
    const p = clamp((window.innerHeight * 0.92 - r.top) / (r.height * 0.85), 0, 1);
    vitLines.forEach((el, i) =>
      el.style.setProperty('--p', smooth(clamp(p * 1.15 - i * 0.1, 0, 1)).toFixed(3))
    );
  }

  /* 6 · the marathon runs sideways */
  const htrack = document.getElementById('htrack')!;
  function drawMarathon(p: number) {
    const dist = Math.max(0, htrack.scrollWidth - window.innerWidth);
    htrack.style.transform = 'translate3d(' + (-p * dist).toFixed(1) + 'px,0,0)';
  }

  /* 3 · the grand ballet — the page's centrepiece */
  const stateLine = document.getElementById('stateLine')!;
  const tickRows = [...document.querySelectorAll<HTMLElement>('.tickrow')];
  const STATES = [
    'Starved of real nutrients: the dance falls out of step.',
    'Feed it what it recognises, and the cells find the rhythm.',
    'Thirty trillion in sync — the grand ballet Newman describes.'
  ];
  let balletP = 0,
    lastState = -1;
  function setState(p: number) {
    const i = p < 0.34 ? 0 : p < 0.7 ? 1 : 2;
    if (i !== lastState) {
      lastState = i;
      stateLine.textContent = STATES[i];
      tickRows.forEach((r) => r.classList.toggle('on', +r.dataset['at']! === i));
    }
  }

  const cellCanvas = document.getElementById('cells') as HTMLCanvasElement;
  const cx = cellCanvas.getContext('2d')!;
  type Cell = { ox: number; oy: number; sx: number; sy: number; r: number; ph: number; sp: number };
  let cells: Cell[] = [],
    cw = 0,
    ch = 0,
    dpr = 1;

  function buildCells() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = cellCanvas.clientWidth;
    ch = cellCanvas.clientHeight;
    cellCanvas.width = cw * dpr;
    cellCanvas.height = ch * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const N = cw < 700 ? 620 : 1500;
    const R = Math.min(cw, ch) * 0.42;
    const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle → phyllotaxis
    cells = new Array(N);
    for (let i = 0; i < N; i++) {
      const t = Math.sqrt(i / N); // even area distribution
      const a = i * GA;
      cells[i] = {
        // "fed" position: an ordered phyllotaxis disc — organic order, not a grid
        ox: Math.cos(a) * R * t,
        oy: Math.sin(a) * R * t,
        // "starved" position: scattered, no relation to its neighbours
        sx: (Math.random() - 0.5) * cw * 1.18,
        sy: (Math.random() - 0.5) * ch * 1.5,
        r: 0.7 + Math.random() * 1.5,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 0.9
      };
    }
  }

  function drawCells(time: number) {
    if (!cw) return;
    const p = balletP;
    const order = smooth(clamp((p - 0.08) / 0.62, 0, 1)); // scatter → disc
    const life = smooth(clamp((p - 0.30) / 0.55, 0, 1)); // grey → algae green
    const t = time * 0.001;
    const spin = order * t * 0.055;
    const cosS = Math.cos(spin),
      sinS = Math.sin(spin);
    const midX = cw / 2,
      midY = ch / 2;

    cx.clearRect(0, 0, cw, ch);

    // ambient depth
    const g = cx.createRadialGradient(midX, midY, 0, midX, midY, Math.max(cw, ch) * 0.62);
    g.addColorStop(0, 'rgba(12,58,44,' + (0.30 * life + 0.05).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(4,16,31,0)');
    cx.fillStyle = g;
    cx.fillRect(0, 0, cw, ch);

    // the ballet's connective lines — spiral arms that appear as order returns
    if (order > 0.28) {
      cx.lineWidth = 0.55;
      cx.strokeStyle = 'rgba(79,208,122,' + ((0.20 * (order - 0.28)) / 0.72 * life).toFixed(3) + ')';
      cx.beginPath();
      for (let i = 0; i < cells.length - 1; i += 1) {
        const a = cells[i],
          b = cells[i + 1];
        const ax = a.ox * cosS - a.oy * sinS,
          ay = a.ox * sinS + a.oy * cosS;
        const bx = b.ox * cosS - b.oy * sinS,
          by = b.ox * sinS + b.oy * cosS;
        cx.moveTo(midX + ax, midY + ay);
        cx.lineTo(midX + bx, midY + by);
      }
      cx.stroke();
    }

    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      const rx = c.ox * cosS - c.oy * sinS,
        ry = c.ox * sinS + c.oy * cosS;
      // starved cells drift and jitter; fed cells settle and breathe together
      const jit = (1 - order) * 9;
      const brt = Math.sin(t * c.sp + c.ph);
      const x = midX + lerp(c.sx + Math.sin(t * c.sp * 0.7 + c.ph) * jit, rx, order);
      const y = midY + lerp(c.sy + Math.cos(t * c.sp * 0.6 + c.ph) * jit, ry, order);
      const rad = c.r * (1 + brt * 0.18 * life) * (0.85 + order * 0.35);

      const rr = Math.round(lerp(110, 79, life));
      const gg = Math.round(lerp(124, 208, life));
      const bb = Math.round(lerp(140, 122, life));
      const al = lerp(0.32, 0.9, life) * (0.65 + 0.35 * (brt * 0.5 + 0.5));

      cx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + al.toFixed(3) + ')';
      cx.beginPath();
      cx.arc(x, y, rad, 0, 6.2832);
      cx.fill();
    }
  }

  /* 1 · hero water — undulating light on a Klamath-blue surface */
  const waterCanvas = document.getElementById('water') as HTMLCanvasElement;
  const wx = waterCanvas.getContext('2d')!;
  let ww = 0,
    wh = 0;
  function sizeWater() {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    ww = waterCanvas.clientWidth;
    wh = waterCanvas.clientHeight;
    waterCanvas.width = ww * d;
    waterCanvas.height = wh * d;
    wx.setTransform(d, 0, 0, d, 0, 0);
  }
  function drawWater(time: number) {
    if (!ww) return;
    const t = time * 0.00035;
    const g = wx.createLinearGradient(0, 0, 0, wh);
    g.addColorStop(0, '#0a2748');
    g.addColorStop(0.42, '#0d3a63');
    g.addColorStop(1, '#04101F');
    wx.fillStyle = g;
    wx.fillRect(0, 0, ww, wh);

    const lines = 46;
    for (let i = 0; i < lines; i++) {
      const f = i / lines;
      const y0 = wh * (0.22 + f * 0.92);
      const amp = 5 + f * 26;
      const alpha = (0.035 + 0.10 * Math.pow(f, 1.5)) * (0.7 + 0.3 * Math.sin(t * 2 + i * 0.4));
      wx.strokeStyle =
        'rgba(' +
        Math.round(lerp(150, 95, f)) +
        ',' +
        Math.round(lerp(205, 170, f)) +
        ',255,' +
        alpha.toFixed(3) +
        ')';
      wx.lineWidth = 0.6 + f * 1.5;
      wx.beginPath();
      for (let x = -20; x <= ww + 20; x += 14) {
        const y =
          y0 +
          Math.sin(x * 0.0055 + t * 1.5 + i * 0.55) * amp +
          Math.sin(x * 0.017 - t * 2.4 + i * 0.9) * amp * 0.32;
        x === -20 ? wx.moveTo(x, y) : wx.lineTo(x, y);
      }
      wx.stroke();
    }
  }

  /* ── one rAF loop drives everything ─────────────────────────── */
  let rafId = 0;
  let stopped = false;
  function onResize() {
    sizeWater();
    buildCells();
  }
  function frame(time: number) {
    drawWater(time);
    drawCells(time);
    if (!stopped) rafId = requestAnimationFrame(frame);
  }
  function onScroll() {
    const y = window.scrollY;
    hdr.classList.toggle('solid', y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    rail.style.width = (max > 0 ? (y / max) * 100 : 0).toFixed(2) + '%';
    drawReframe(pinP(secReframe));
    balletP = pinP(secBallet);
    setState(balletP);
    drawMarathon(pinP(secMarathon));
    drawVit();
  }
  on(window, 'scroll', onScroll as EventListener, { passive: true });
  const onWinResize = () => {
    onResize();
    onScroll();
  };
  on(window, 'resize', onWinResize);
  onResize();
  onScroll();

  if (RM) {
    // static, legible frames — no motion, everything still reads
    balletP = 0.85;
    drawWater(0);
    drawCells(0);
    drawReframe(1);
    drawMarathon(0);
    vitLines.forEach((el) => el.style.setProperty('--p', '1'));
  } else {
    rafId = requestAnimationFrame(frame);
    // cover tilts toward the pointer
    const tilt = document.getElementById('tilt')!;
    on(
      window,
      'pointermove',
      ((e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        tilt.style.transform =
          'rotateY(' + (nx * 11).toFixed(2) + 'deg) rotateX(' + (-ny * 7).toFixed(2) + 'deg) translateZ(0)';
      }) as EventListener,
      { passive: true }
    );
  }

  /* ── direct sale ────────────────────────────────────────────── */
  const fmtForm = document.getElementById('fmtForm') as HTMLFormElement;
  const qVal = document.getElementById('qVal')!,
    totalEl = document.getElementById('total')!;
  const checkout = document.getElementById('checkout') as HTMLAnchorElement;
  const shipNote = document.getElementById('shipNote')!;
  /* kept so the "link not set" warning can be undone without losing the price span */
  const checkoutHTML = checkout.innerHTML;
  let qty = 1;
  let restoreTimer: ReturnType<typeof setTimeout> | undefined;

  function checkedInput() {
    return fmtForm.querySelector<HTMLInputElement>('input:checked')!;
  }
  function price() {
    return parseFloat(checkedInput().dataset['price']!);
  }
  function fmtName() {
    return checkedInput().value;
  }
  function money(n: number) {
    return CONFIG.currency + n.toFixed(2);
  }

  function updateCart() {
    /* re-queried each time: the button's contents can be replaced and restored */
    const ctaTotal = document.getElementById('ctaTotal')!;
    const isDigital = fmtName() === 'ebook';
    const line = price() * qty;
    totalEl.textContent = money(line);
    ctaTotal.textContent = money(line);
    qVal.textContent = String(qty);
    shipNote.textContent = isDigital
      ? 'Delivered by email — no shipping.'
      : qty >= CONFIG.freeShipFrom
        ? 'Free US shipping applied.'
        : 'Ships free in the US on orders of 2 or more.';
    const url = (CONFIG.checkoutByFormat[fmtName()] || '').trim() || CONFIG.checkoutUrl;
    checkout.setAttribute('href', url);
    if (url === '#') {
      checkout.setAttribute('aria-disabled', 'true');
      checkout.title = 'Set CONFIG.checkoutUrl to enable checkout';
    } else {
      checkout.removeAttribute('aria-disabled');
      checkout.target = '_blank';
      checkout.rel = 'noopener';
      checkout.removeAttribute('title');
    }
  }
  on(fmtForm, 'change', updateCart);
  on(document.getElementById('qPlus')!, 'click', () => {
    qty = Math.min(qty + 1, 20);
    updateCart();
  });
  on(document.getElementById('qMinus')!, 'click', () => {
    qty = Math.max(qty - 1, 1);
    updateCart();
  });
  on(checkout, 'click', ((e: Event) => {
    if (checkout.getAttribute('href') === '#') {
      e.preventDefault();
      checkout.textContent = 'Checkout link not set yet — see CONFIG';
      restoreTimer = setTimeout(() => {
        checkout.innerHTML = checkoutHTML;
        updateCart();
      }, 2400);
    }
  }) as EventListener);
  const rMap = ['amazon', 'barnesnoble', 'bookshop'];
  document.querySelectorAll<HTMLAnchorElement>('[data-retailer]').forEach((a, i) => {
    const u = CONFIG.retailers[rMap[i]];
    if (u && u !== '#') a.href = u;
  });
  updateCart();

  /* ── email capture (front end only — connect your provider here) ── */
  on(document.getElementById('signupForm')!, 'submit', ((e: Event) => {
    e.preventDefault();
    const msg = document.getElementById('signupMsg')!;
    // TODO: POST to Mailchimp / ConvertKit / Beehiiv, then show this state on success.
    msg.innerHTML = '<span class="ok">On its way.</span> Check your inbox for The Marathon Mindset.';
    (e.target as HTMLFormElement).querySelector('input')!.value = '';
  }) as EventListener);

  return () => {
    stopped = true;
    cancelAnimationFrame(rafId);
    if (restoreTimer) clearTimeout(restoreTimer);
    teardown.forEach((fn) => fn());
  };
}
