const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let centerX, centerY;
let scale = 1;

const planets = [
  { radius: 80, size: 20, emoji: '🌑', speed: 0.02, angle: 0 },  
  { radius: 120, size: 30, emoji: '🌕', speed: 0.015, angle: 1 },
  { radius: 180, size: 40, emoji: '🌍', speed: 0.01, angle: 2 }, 
  { radius: 250, size: 50, emoji: '🔴', speed: 0.008, angle: 3 },
  { radius: 350, size: 60, emoji: '🟠', speed: 0.006, angle: 4 },
  { radius: 450, size: 70, emoji: '🪐', speed: 0.004, angle: 5 },
  { radius: 550, size: 80, emoji: '🔵', speed: 0.003, angle: 6 },
  { radius: 650, size: 90, emoji: '🌑', speed: 0.002, angle: 7 },
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  const maxRadius = 650 + 100;
  scale = Math.min(canvas.width, canvas.height) / (maxRadius * 2);

  planets.forEach(p => {
    p.scaledRadius = p.radius * scale;
    p.scaledSize = p.size * scale;
  });
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawSun() {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.beginPath();
  ctx.arc(0, 0, 60 * scale, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.shadowColor = 'orange';
  ctx.shadowBlur = 40 * scale;
  ctx.fill();
  ctx.restore();
}

function drawPlanet(planet) {
  const x = centerX + planet.scaledRadius * Math.cos(planet.angle);
  const y = centerY + planet.scaledRadius * Math.sin(planet.angle);

  ctx.save();
  ctx.font = `${planet.scaledSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(planet.emoji, x, y);
  ctx.restore();
}

function drawOrbitPath(planet) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, planet.scaledRadius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSun();
  planets.forEach(drawOrbitPath);
  planets.forEach(planet => {
    drawPlanet(planet);
    planet.angle += planet.speed;
  });

  requestAnimationFrame(animate);
}

animate();
