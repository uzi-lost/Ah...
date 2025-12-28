/* PARTICLES AND CONFETTI */

// Particles for background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i=0; i<60; i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    d: Math.random()*1
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  for(let i=0;i<particles.length;i++){
    let p = particles[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
  }
  ctx.fill();
  moveParticles();
}

let angle = 0;
function moveParticles(){
  angle += 0.01;
  for(let i=0;i<particles.length;i++){
    let p = particles[i];
    p.y += Math.cos(angle + p.d) + 1 + p.r/2;
    p.x += Math.sin(angle) * 0.5;
    if(p.x > canvas.width+5 || p.x < -5 || p.y > canvas.height){
      p.x = Math.random()*canvas.width;
      p.y = -10;
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Confetti for celebration
const confCanvas = document.getElementById("confetti");
const cctx = confCanvas.getContext("2d");
confCanvas.width = window.innerWidth;
confCanvas.height = window.innerHeight;
let confetti = [];
function createConfetti(){
  for(let i=0;i<200;i++){
    confetti.push({
      x: Math.random()*confCanvas.width,
      y: Math.random()*confCanvas.height- confCanvas.height,
      r: Math.random()*6+4,
      color: `hsl(${Math.random()*360},100%,50%)`,
      d: Math.random()*10+5
    });
  }
}
function drawConfetti(){
  cctx.clearRect(0,0,confCanvas.width,confCanvas.height);
  for(let i=0;i<confetti.length;i++){
    let f = confetti[i];
    cctx.fillStyle = f.color;
    cctx.beginPath();
    cctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
    cctx.fill();
    f.y += f.d/2;
    if(f.y > confCanvas.height) f.y = -10;
  }
  requestAnimationFrame(drawConfetti);
}
let snowflakes = [];
for (let i = 0; i < 100; i++) {
  snowflakes.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 1.5,
    d: Math.random()
  });
}

function drawSnow() {
  const confCanvas = document.getElementById('confetti');
  const cctx = confCanvas.getContext('2d');
  confCanvas.width = window.innerWidth;
  confCanvas.height = window.innerHeight;
  
  cctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  
  for (let s of snowflakes) {
    cctx.fillStyle = "rgba(255,255,255,0.7)";
    cctx.beginPath();
    cctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    cctx.fill();
    s.y += s.d + 0.5;
    if (s.y > confCanvas.height) s.y = -10;
  }
  
  requestAnimationFrame(drawSnow);
}
// Lightweight snow
let flakes = [];
const confCanvas = document.getElementById('confetti');
const ctx = confCanvas.getContext('2d');
confCanvas.width = window.innerWidth;
confCanvas.height = window.innerHeight;

for (let i = 0; i < 50; i++) {  // fewer flakes → faster
  flakes.push({
    x: Math.random() * confCanvas.width,
    y: Math.random() * confCanvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 1
  });
}

function animateSnow() {
  ctx.clearRect(0,0,confCanvas.width, confCanvas.height);
  for (let f of flakes) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y += f.d + 0.5;
    if (f.y > confCanvas.height) f.y = -10;
  }
  requestAnimationFrame(animateSnow);
}
animateSnow();

//drawSnow();

//createConfetti();
//drawConfetti();
