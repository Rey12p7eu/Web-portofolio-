// Utility helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme toggle ---
  const themeBtn = $('#toggleMode');
  const themeIcon = $('#themeIcon');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    themeIcon.textContent = '☀️';
  }
  themeBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    themeIcon.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // --- Music toggle ---
  const musicBtn = $('#toggleMusic');
  const audio = $('#bg-music');
  if (localStorage.getItem('music') === 'off') {
    audio.pause();
    musicBtn.textContent = '🔇';
  }
  musicBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      musicBtn.textContent = '🔊';
      localStorage.setItem('music', 'on');
    } else {
      audio.pause();
      musicBtn.textContent = '🔇';
      localStorage.setItem('music', 'off');
    }
  });

  // --- Reveal paragraphs on scroll ---
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  $$('.paragraph-to-reveal').forEach(p => revealObserver.observe(p));

  // --- Sakura petals ---
  function spawnSakura() {
    const container = $('#sakura-container');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = 5 + Math.random() * 5 + 's';
      petal.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(petal);
      setTimeout(() => petal.remove(), 10000);
    }
  }
  spawnSakura();

  // --- tsParticles background ---
  if (window.tsParticles) {
    window.tsParticles.load('particles-js', {
      fullScreen: { enable: false },
      particles: {
        number: { value: 60 },
        color: { value: '#ffffff' },
        opacity: { value: 0.3 },
        size: { value: 2 },
        move: { speed: 0.6 }
      }
    });
  }
});
