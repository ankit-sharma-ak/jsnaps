    const canvas = document.getElementById('sparkleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const MAX_PARTICLES = 100;
    let resizeTimeout;

    class IPLParticle {
      constructor(x, y, team) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.alpha = 1;
        this.gravity = 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.color = team.color;
        this.content = team.symbol;
        this.fontSize = Math.random() * 16 + 14;
        this.shadowBlur = Math.random() * 15 + 10; // Glowing trail effect
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY + this.gravity;
        this.rotation += this.rotationSpeed;
        this.alpha -= 0.01;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.color;
        ctx.fillText(this.content, 0, 0);
        ctx.restore();
      }
    }

    const teams = {
      mi: {
        symbol: "💙",
        color: "#0061A8", // MI's blue color
        bannerColor: "#0061A8", // Blue banner for MI
      },
      csk: {
        symbol: "💛",
        color: "#FFB81C", // CSK's yellow color
        bannerColor: "#FFB81C", // Yellow banner for CSK
      },
      rcb: {
        symbol: "❤️",
        color: "#D42029", // RCB's red color
        bannerColor: "#D42029", // Red banner for RCB
      },
      kkr: {
        symbol: "💜",
        color: "#5A2D92", // KKR's purple color
        bannerColor: "#5A2D92", // Purple banner for KKR
      }
    };

    function createParticles(x, y, team) {
      for (let i = 0; i < 6; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }
        particles.push(new IPLParticle(x, y, team));
      }
    }

    function drawTitle() {
  ctx.save();
  ctx.fillStyle = "#ffffffcc";
  ctx.font = "bold 24px Arial";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#FFB81C"; // Glow effect
  ctx.fillText("IPL team sparkle with JavaScript!", 380, 50);
  ctx.restore();
}


    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTitle();

      // Iterate backward for particle removal during update
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    function updateBannerBackgroundColor(team) {
      document.querySelector('.comment-section').style.backgroundColor = team.bannerColor; // Change the banner background color dynamically
    }

    document.addEventListener("mousemove", (e) => {
      createParticles(e.clientX, e.clientY, selectedTeam);
    });

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 150);
    });

    let selectedTeam = null; // No team selected initially

    document.getElementById("miEmoji").addEventListener("click", () => {
      selectedTeam = teams.mi;
      document.getElementById("selectedEmoji").textContent = `You chose: MI 💙`;
      updateBannerBackgroundColor(teams.mi);
    });

    document.getElementById("cskEmoji").addEventListener("click", () => {
      selectedTeam = teams.csk;
      document.getElementById("selectedEmoji").textContent = `You chose: CSK 💛`;
      updateBannerBackgroundColor(teams.csk);
    });

    document.getElementById("rcbEmoji").addEventListener("click", () => {
      selectedTeam = teams.rcb;
      document.getElementById("selectedEmoji").textContent = `You chose: RCB ❤️`;
      updateBannerBackgroundColor(teams.rcb);
    });

    document.getElementById("kkrEmoji").addEventListener("click", () => {
      selectedTeam = teams.kkr;
      document.getElementById("selectedEmoji").textContent = `You chose: KKR 💜`;
      updateBannerBackgroundColor(teams.kkr);
    });

    animate();