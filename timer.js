/* animations.js
   Provides:
   - small background particles
   - functions startCelebration() to show overlay, run snow + confetti
   - designed to be lightweight and mobile-friendly
*/

// small background particles (always running)
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const PARTS = Math.max(18, Math.round(W/60)); // scale with width
  const parts = [];
  for (let i=0;i<PARTS;i++) {
    parts.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.6+0.6, s: Math.random()*0.6+0.2 });
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    for (let p of parts) {
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.y += p.s;
      p.x += Math.sin(p.y/50)*0.3;
      if (p.y > H+10) { p.y = -10; p.x = Math.random()*W; }
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
})();

// celebration effects (snow + confetti). start only when requested.
(function() {
  const confCanvas = document.getElementById('confetti');
  if (!confCanvas) {
    window.startCelebration = ()=>{ document.getElementById('celebration').classList.add('show'); };
    return;
  }
  const ctx = confCanvas.getContext('2d');
  let W = confCanvas.width = window.innerWidth;
  let H = confCanvas.height = window.innerHeight;

  // Snow storage (small)
  let snow = [];
  let snowAnimId = null;
  function initSnow(count=50) {
    snow = [];
    for (let i=0;i<count;i++) snow.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.6+0.6, d: Math.random()*0.7+0.2 });
  }
  function drawSnow() {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    for (let s of snow) {
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
      s.y += s.d + 0.3;
      s.x += Math.sin(s.y/40)*0.3;
      if (s.y > H+8) s.y = -8;
    }
    snowAnimId = requestAnimationFrame(drawSnow);
  }

  // Confetti: one short burst and fade
  function burstConfetti() {
    const pieces = [];
    const N = 80;
    for (let i=0;i<N;i++) {
      pieces.push({
        x: Math.random()*W,
        y: -10,
        vx: (Math.random()-0.5)*6,
        vy: Math.random()*3+2,
        r: Math.random()*5+2,
        color: `hsl(${Math.round(Math.random()*360)},80%,55%)`,
        life: 0,
        ttl: 90 + Math.round(Math.random()*60)
      });
    }
    let frames = 0;
    function drawPieces() {
      ctx.clearRect(0,0,W,H);
      // draw snow behind if active (so confetti and snow can overlap nicely)
      for (let s of snow) {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
      }
      for (let p of pieces) {
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life++;
      }
      frames++;
      if (frames < 220) requestAnimationFrame(drawPieces);
      else {
        // stop (cleanup) — keep snow loop if active
        // clear pieces by redrawing snow only
      }
    }
    drawPieces();
  }

  // start and stop functions
  let celebrationRunning = false;
  window.startCelebration = function() {
    if (celebrationRunning) return;
    celebrationRunning = true;
    // show overlay
    const overlay = document.getElementById('celebration');
    overlay.classList.add('show');
    // prepare snow and run snow loop
    W = confCanvas.width = window.innerWidth;
    H = confCanvas.height = window.innerHeight;
    initSnow(50);
    if (snowAnimId) cancelAnimationFrame(snowAnimId);
    drawSnow();
    // burst confetti once after small delay
    setTimeout(burstConfetti, 300);
    // optional: stop snow after some time (but we keep it faint)
    setTimeout(()=>{
      // gradually reduce opacity of snow by clearing and drawing less frequently
      // here we do nothing to keep a soft background snow
    }, 8000);
  };

  window.addEventListener('resize', () => {
    W = confCanvas.width = window.innerWidth;
    H = confCanvas.height = window.innerHeight;
  });
})();
