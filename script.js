
/* Clean, accessible interactions for theme, music, particles and reveal-on-scroll */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Theme toggle (persist)
  const html = document.documentElement;
  function setTheme(mode) {
    if (mode === 'light') html.classList.remove('dark');
    else html.classList.add('dark');
    localStorage.setItem('theme', mode);
    const icon = $('#themeIcon');
    if (icon) icon.textContent = mode === 'light' ? '🌞' : '🌙';
  }
  setTheme(localStorage.getItem('theme') || 'dark');
  $('#themeToggle')?.addEventListener('click', () => {
    const next = html.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
  });

  // Music toggle with visual indicator and smooth fade
  const musicBtn = $('#musicToggle');
  const audio = $('#bgm');

  // simple fade helper
  function fadeAudio(targetVol, duration = 600) {
    return new Promise((resolve) => {
      const startVol = audio.volume;
      const delta = targetVol - startVol;
      if (Math.abs(delta) < 0.001 || duration <= 0) {
        audio.volume = targetVol;
        resolve();
        return;
      }
      const start = performance.now();
      function step(t) {
        const p = Math.min(1, (t - start) / duration);
        audio.volume = startVol + delta * p;
        if (p < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }

  if (musicBtn && audio) {
    // default comfortable volume
    const DEFAULT_VOL = 0.6;
    audio.volume = 0.0;

    function setPlayingUI(playing) {
      musicBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      musicBtn.textContent = playing ? '⏸' : '🎵';
      // accessibility helpers
      musicBtn.title = playing ? 'Musik: ON' : 'Musik: OFF';
      musicBtn.setAttribute('aria-label', playing ? 'Hentikan musik' : 'Putar musik');
      const live = document.getElementById('musicAnnounce');
      if (live) live.textContent = playing ? 'Musik dinyalakan' : 'Musik dimatikan';
    }

    const saved = localStorage.getItem('music') === 'on';
    if (saved) {
      audio.play().then(async () => {
        setPlayingUI(true);
        await fadeAudio(DEFAULT_VOL, 700);
      }).catch(() => {});
    } else {
      // ensure ready to start quickly when user taps
      if (audio.preload !== 'auto') audio.preload = 'auto';
      if (audio.readyState === 0) audio.load();
    }

    musicBtn.addEventListener('click', async () => {
      const pressed = musicBtn.getAttribute('aria-pressed') === 'true';
      if (pressed) {
        // fade out then pause
        try {
          await fadeAudio(0.0, 500);
        } finally {
          audio.pause();
          setPlayingUI(false);
          localStorage.setItem('music', 'off');
        }
      } else {
        try {
          if (audio.readyState === 0) audio.load();
          // start from 0 then fade to default
          audio.volume = 0.0;
          await audio.play();
          setPlayingUI(true);
          localStorage.setItem('music', 'on');
          await fadeAudio(DEFAULT_VOL, 700);
        } catch {
          musicBtn.textContent = '🎵 tap lagi';
          setTimeout(() => setPlayingUI(false), 1500);
        }
      }
    });
  }

  // Particles (simple, respect reduced motion)
  function initParticles() {
    const container = $('#particles');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.remove();
      return;
    }
    const COUNT = 28;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.bottom = -10 - Math.random() * 30 + 'vh';
      const size = 3 + Math.random() * 7;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.borderRadius = '9999px';
      p.style.background = 'rgba(255,255,255,.35)';
      const dur = 8 + Math.random() * 10;
      const delay = Math.random() * 6;
      p.style.animation = `rise ${dur}s linear ${delay}s infinite`;
      container.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rise {
        0%   { transform: translateY(0) translateX(0); opacity:.8; }
        50%  { transform: translateY(-50vh) translateX(10px); opacity:.5; }
        100% { transform: translateY(-100vh) translateX(-10px); opacity:.2; }
      }
    `;
    document.head.appendChild(style);
  }
  initParticles();

  // Sakura petals (optional decorative)
  function spawnSakura() {
    const host = $('#sakura');
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const count = 18;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = 10 + Math.random() * 12 + 's';
      petal.style.animationDelay = Math.random() * 6 + 's';
      host.appendChild(petal);
    }
  }
  spawnSakura();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $('.reveal').forEach((el) => io.observe(el));
})();
