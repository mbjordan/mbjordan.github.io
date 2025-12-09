(() => {
  const canvas = document.getElementById('bg');
  const lastBuilt = document.getElementById('last-built');

  if (!canvas || !lastBuilt) return;

  const fontSize = 14;
  const ctx = canvas.getContext('2d');
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();

  let W = (canvas.width = innerWidth);
  let H = (canvas.height = innerHeight);
  let columns = Math.floor(W / fontSize);
  let drops = Array(columns).fill(1);

  const resize = () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    columns = Math.floor(W / fontSize);
    drops = Array(columns).fill(1);
  };

  window.addEventListener('resize', resize);

  const draw = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#77ff7a';
    ctx.font = fontSize + "px Courier, 'Courier New', monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  };

  // Set the last-built date (MM/DD/YYYY
  lastBuilt.textContent = mm + '/' + dd + '/' + yyyy;

  // Draw the matrix effect
  draw();
})();
