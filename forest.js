const canvas = document.getElementById('forest-canvas');
const ctx = canvas.getContext('2d');
let trees = [];
let w, h;
const numTrees = 25;

function init() {
  resize();
  trees = [];
  for (let i = 0; i < numTrees; i++) {
    trees.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 60 + 30,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.4 + 0.1
    });
  }
}

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * devicePixelRatio;
  canvas.height = h * devicePixelRatio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

function drawTree(tree) {
  ctx.globalAlpha = tree.opacity;
  ctx.fillStyle = '#2d5a4a';
  
  // Draw pine tree shape
  ctx.beginPath();
  ctx.moveTo(tree.x, tree.y);
  ctx.lineTo(tree.x - tree.size / 3, tree.y + tree.size);
  ctx.lineTo(tree.x + tree.size / 3, tree.y + tree.size);
  ctx.closePath();
  ctx.fill();
  
  // Middle section
  ctx.beginPath();
  ctx.moveTo(tree.x, tree.y + tree.size * 0.3);
  ctx.lineTo(tree.x - tree.size / 4, tree.y + tree.size * 0.7);
  ctx.lineTo(tree.x + tree.size / 4, tree.y + tree.size * 0.7);
  ctx.closePath();
  ctx.fill();
  
  // Trunk
  ctx.fillStyle = '#4a3728';
  ctx.fillRect(tree.x - tree.size / 15, tree.y + tree.size, tree.size / 7.5, tree.size / 5);
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  
  trees.forEach(tree => {
    drawTree(tree);
    tree.y += tree.speed;
    
    if (tree.y > h + tree.size) {
      tree.y = -tree.size;
      tree.x = Math.random() * w;
    }
  });
  
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  resize();
  init();
});
