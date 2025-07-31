// Starfield animation (same as your existing effect but simplified & optimized)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let starsArray = [];
let width, height;
const numStars = 100;

function init() {
  resize();
  starsArray = [];
  for(let i = 0; i < numStars; i++) {
    starsArray.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.7 + 0.3,
    });
  }
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  starsArray.forEach(star => {
    star.x -= star.speed;
    if(star.x < 0) star.x = width;
    ctx.globalAlpha = star.opacity;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

// Initialize
init();
draw();
window.addEventListener('resize', () => {
  resize();
  init();
});
