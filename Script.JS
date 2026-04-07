/* ============================================================
   HOMENAGEM LUCIENE — script.js
   Funções: estrelas no intro, partículas no fundo, música, animações
   ============================================================ */

/* ══════════════════════════════════════════
   ESTRELAS — Tela Inicial
══════════════════════════════════════════ */
(function initStars() {
  const canvas = document.getElementById("stars-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        phase: Math.random() * Math.PI * 2,
        // Algumas estrelas são douradas
        gold: Math.random() < 0.08,
      });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.012;
    for (const s of stars) {
      const a = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed * 60 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(240, 195, 60, ${a * 0.85})` // estrelas amarelas
        : `rgba(160, 200, 255, ${a * 0.7})`; // estrelas azul-marinho claro
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    createStars(200);
  });
  resize();
  createStars(220);
  draw();
})();

/* ══════════════════════════════════════════
   PARTÍCULAS FLUTUANTES — Conteúdo Principal
   (estrelas douradas que sobem lentamente)
══════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function spawnParticle() {
    return {
      x: Math.random() * W,
      y: H + 10,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.4 + 0.15), // sobe devagar
      vx: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      life: 1,
      decay: Math.random() * 0.0015 + 0.0005,
      gold: Math.random() < 0.4,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Adiciona novas partículas gradualmente
    if (Math.random() < 0.3) particles.push(spawnParticle());

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0 || p.y < -10) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(210, 175, 80, ${p.alpha * p.life})`
        : `rgba(140, 180, 255, ${p.alpha * p.life * 0.7})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();

  // Inicia com algumas partículas já presentes
  for (let i = 0; i < 40; i++) {
    const p = spawnParticle();
    p.y = Math.random() * H; // distribuídas pelo ecrã
    particles.push(p);
  }
  draw();
}

/* ══════════════════════════════════════════
   ABRIR A CARTA — Função principal do botão
══════════════════════════════════════════ */
function abrirCarta() {
  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const musica = document.getElementById("musica");

  // 1. Anima saída da tela inicial
  introScreen.classList.add("fadeout");

  // 2. Após o fade, esconde o intro e mostra o conteúdo
  setTimeout(() => {
    introScreen.style.display = "none";

    mainContent.classList.remove("hidden");
    mainContent.classList.add("fade-in");

    // 3. Inicia as partículas do fundo
    initParticles();

    // 4. ── Toca a música automaticamente ──
    //    (navegadores exigem interação do usuário antes — o clique no botão satisfaz isso)
    musica.volume = 0;
    musica
      .play()
      .then(() => {
        fadeInMusic(musica, 0, 0.65, 3000); // fade de volume em 3s
      })
      .catch(() => {
        // Se o autoplay for bloqueado, o botão de música ainda funciona
        console.info(
          "Autoplay bloqueado pelo navegador. Use o botão ♪ para iniciar.",
        );
      });
  }, 750);
}

/* ── Aumenta o volume gradualmente (evita susto) ── */
function fadeInMusic(audio, from, to, durationMs) {
  const steps = 40;
  const interval = durationMs / steps;
  const delta = (to - from) / steps;
  let current = from;
  audio.volume = current;

  const timer = setInterval(() => {
    current += delta;
    if (current >= to) {
      audio.volume = to;
      clearInterval(timer);
      return;
    }
    audio.volume = Math.max(0, Math.min(1, current));
  }, interval);
}

/* ══════════════════════════════════════════
   CONTROLE DE MÚSICA (botão pausar/retomar)
══════════════════════════════════════════ */
document.getElementById("music-control").addEventListener("click", () => {
  const musica = document.getElementById("musica");
  const musicIcon = document.getElementById("music-icon");
  const musicLabel = document.getElementById("music-label");

  if (musica.paused) {
    musica.play();
    musicIcon.textContent = "♪";
    musicLabel.textContent = "Música";
  } else {
    musica.pause();
    musicIcon.textContent = "♫";
    musicLabel.textContent = "Pausado";
  }
});
