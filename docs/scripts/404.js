(() => {
  const canvas = document.getElementById('pit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const size = Math.max(64, Math.min(256, canvas.width));

  const img = new Image();
  img.src = 'favicon.ico';

  let t = 0;

  const pixelScale = 8;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img.complete && img.naturalWidth) {
      const sw = Math.max(8, Math.floor(size / pixelScale));
      const sh = sw;

      const off = document.createElement('canvas');
      off.width = sw;
      off.height = sh;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, sw, sh);

      const wobble = Math.sin(t * 2) * 6;
      const bob = Math.sin(t * 1.5) * 6;
      const sx = 0.96 + Math.sin(t * 1.8) * 0.04;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 + bob);
      ctx.rotate((wobble * Math.PI) / 180);
      ctx.scale(sx, sx);

      ctx.imageSmoothingEnabled = false;
      const dw = sw * pixelScale;
      const dh = sh * pixelScale;
      ctx.drawImage(off, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2,
        canvas.height - 18,
        46,
        12,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    t += 0.03;
    requestAnimationFrame(draw);
  };

  img.addEventListener('load', () => {
    draw();
  });
})();
