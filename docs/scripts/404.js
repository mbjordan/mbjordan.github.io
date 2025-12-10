(() => {
  const canvas = document.getElementById('pit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const w = canvas.width;
  const h = canvas.height;

  let frameIndex = 0;
  let last = 0;
  const frameMs = 200;

  const frames = [
    `  /\\_/\\  \n / >-< \\ \n  > ^ < `,
    `  /\\_/\\  \n / >-< \\ \n  > v < `,
    `  /\\_/\\  \n / >-< \\ \n  >\\_/ < `,
    `  /\\_/\\  \n / >-< \\ \n  > X < `,
  ];

  const drawFrame = (now) => {
    if (!last) last = now;
    const elapsed = now - last;
    if (elapsed >= frameMs) {
      frameIndex = (frameIndex + 1) % frames.length;
      last = now;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, w, h);

    const fontSize = Math.floor(h / 6);
    ctx.font = `${fontSize}px Courier, monospace`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#9aa6a0';
    ctx.imageSmoothingEnabled = false;

    const lines = frames[frameIndex].split('\n');
    const lineHeight = fontSize * 1.05;
    const blockHeight = lines.length * lineHeight;
    let y = (h - blockHeight) / 2;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = ctx.measureText(line);
      const x = (w - m.width) / 2;
      ctx.fillText(line, x, y);

      if (i === 1) {
        const eyeY = y + lineHeight * 0.12;
        const centerX = w / 2;
        const eyeOffset = Math.max(8, m.width * 0.18);
        const baseEye = Math.max(2, Math.floor(fontSize * 0.12));
        const flick = 0.6 + 0.4 * Math.abs(Math.sin(now / 120));
        const eyeSize = Math.max(
          2,
          Math.round(baseEye * (1 + 0.2 * Math.sin(now / 80)))
        );
        ctx.fillStyle = `rgba(192,57,43,${flick.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(centerX - eyeOffset, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + eyeOffset, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#9aa6a0';

        const mouthY = y + lineHeight * 0.9;
        const mouthW = Math.max(20, m.width * 0.4);
        const mouthH = Math.max(6, Math.floor(fontSize * 0.18));
        ctx.save();
        ctx.translate(centerX - mouthW / 2, mouthY);
        ctx.fillStyle = '#922B21';
        ctx.fillRect(0, 0, mouthW, mouthH);
        ctx.fillStyle = '#ffffff';
        const teeth = Math.max(2, Math.floor(mouthW / 8));
        for (let ti = 0; ti < teeth; ti++) {
          const tx = Math.floor(
            (ti + 0.5) * (mouthW / teeth) - mouthW / (teeth * 4)
          );
          ctx.fillRect(
            tx,
            0,
            Math.max(1, Math.floor(mouthW / (teeth * 4))),
            Math.max(1, Math.floor(mouthH * 0.9))
          );
        }
        ctx.restore();
      }

      y += lineHeight;
    }

    if (frameIndex % 2 === 1) {
      const growl = 'GRR!';
      const gFont = `${Math.max(10, Math.floor(h / 14))}px Courier, monospace`;
      ctx.font = gFont;
      ctx.fillStyle = '#c0392b';
      const gm = ctx.measureText(growl);
      const gx = (w - gm.width) / 2 + Math.sin(now / 90) * 2;
      const gy = h - Math.floor(h * 0.18);
      ctx.fillText(growl, gx, gy);
    }

    requestAnimationFrame(drawFrame);
  };

  requestAnimationFrame(drawFrame);
})();
