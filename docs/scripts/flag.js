(() => {
  const qs = (id) => document.getElementById(id);

  const canvas = qs('America-flag');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let dpr = Math.max(1, window.devicePixelRatio || 1);

  let off, offCtx;
  const SCALE = 0.2;

  const setSizes = () => {
    const wrap = canvas.parentElement || document.body;
    const cssWidth =
      Math.min(wrap.clientWidth || window.innerWidth, window.innerWidth - 40) *
      SCALE;
    const cssHeight = Math.round((cssWidth * 10) / 19);

    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    const w = Math.max(1, Math.round(cssWidth * dpr));
    const h = Math.max(1, Math.round(cssHeight * dpr));
    canvas.width = w;
    canvas.height = h;
    ctx.imageSmoothingEnabled = false;

    off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    offCtx = off.getContext('2d');
    offCtx.imageSmoothingEnabled = false;
    drawFlag(offCtx, w, h);
  };

  const drawFlag = (c, w, h) => {
    c.clearRect(0, 0, w, h);

    const stripeH = h / 13;
    for (let i = 0; i < 13; i++) {
      c.fillStyle = i % 2 === 0 ? '#B22234' : '#FFFFFF';
      c.fillRect(0, Math.round(i * stripeH), w, Math.round(stripeH + 1));
    }

    const cantonH = Math.round(stripeH * 7);
    const cantonW = Math.round(h * 0.76);
    c.fillStyle = '#3C3B6E';
    c.fillRect(0, 0, cantonW, cantonH);

    const rows = 9;
    const colsMax = 6;
    const starSize = Math.max(
      1,
      Math.floor(Math.min(cantonW / 20, stripeH / 3))
    );
    const vGap = cantonH / (rows + 1);
    const hGap6 = cantonW / (colsMax + 1);
    const hGap5 = cantonW / (5 + 1);

    for (let r = 0; r < rows; r++) {
      const isSix = r % 2 === 0;
      const cols = isSix ? 6 : 5;
      const hGap = isSix ? hGap6 : hGap5;
      for (let cIdx = 0; cIdx < cols; cIdx++) {
        const x = Math.round(hGap * (cIdx + 1) - starSize / 2);
        const y = Math.round(vGap * (r + 1) - starSize / 2);
        c.fillStyle = '#FFFFFF';
        c.fillRect(x, y, starSize, starSize);
      }
    }
  };

  let t = 0;

  const animate = () => {
    if (!off) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const slices = Math.max(60, Math.floor(w / 3));
    const sliceW = Math.max(1, Math.floor(w / slices));
    const amp = Math.max(2, Math.round(h * 0.03));
    const freq = 2.2;

    for (let x = 0; x < w; x += sliceW) {
      const phase = (x / w) * Math.PI * 2 * freq + t;
      const yOff = Math.round(
        Math.sin(phase) * amp * Math.sin((x / w) * Math.PI)
      );
      ctx.drawImage(off, x, 0, sliceW, h, x, yOff, sliceW, h);
    }

    t += 0.04;
    requestAnimationFrame(animate);
  };

  const init = () => {
    setSizes();
    animate();
  };

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      setSizes();
    }, 120);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
