const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 150;

let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      radius: 1 + Math.random() * 2,
      alpha: 0.5 + Math.random() * 0.5,
      delta: 0.01 + Math.random() * 0.02,
    });
  }
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width * 0.8,
    y: Math.random() * canvas.height * 0.3,
    length: 200 + Math.random() * 100,
    speed: 8 + Math.random() * 6,
    size: 2 + Math.random() * 2,
    opacity: 1,
  });
}

// Draw shooting stars
function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.lineWidth = s.size;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length * 0.3);
    ctx.stroke();

    s.x += s.speed;
    s.y += s.speed * 0.3;
    s.opacity -= 0.02;

    if (s.opacity <= 0) {
      shootingStars.splice(i, 1);
    }
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw static stars
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();

    star.alpha += star.delta;
    if (star.alpha <= 0.5 || star.alpha >= 1) {
      star.delta = -star.delta;
    }
  }

  // Draw shooting stars
  drawShootingStars();

  requestAnimationFrame(drawStars);
}

// Occasionally create shooting stars
setInterval(() => {
  if (Math.random() < 0.3) { // 30% chance every second
    createShootingStar();
  }
}, 1000);

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
drawStars();
