
/* Clean, accessible interactions for theme, music, particles and reveal-on-scroll */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Theme toggle (persist)
  const html = document.documentElement;
  function setTheme(mode {
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
