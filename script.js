// Toggle dark/light mode
const toggleMode = document.getElementById('toggleMode');
const themeIcon = document.getElementById('themeIcon');

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  themeIcon.textContent = '☀️';
}

if (toggleMode) {
  toggleMode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}

// Toggle background music
const toggleMusic = document.getElementById('toggleMusic');
const bgMusic = document.getElementById('bg-music');

if (toggleMusic) {
  toggleMusic.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      toggleMusic.textContent = '🔊';
    } else {
      bgMusic.pause();
      toggleMusic.textContent = '🔇';
    }
  });
}

// Animate paragraphs on scroll
const paragraphs = document.querySelectorAll('.paragraph-to-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-active');
    }
  });
}, {
  threshold: 0.1
});

paragraphs.forEach(paragraph => {
  revealObserver.observe(paragraph);
});

// Particles.js config
if (window.tsParticles) {
  tsParticles.load("particles-js", {
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: ["#facc15", "#fcd34d", "#eab308"] },
      shape: { type: "circle" },
      opacity: { value: 0.8 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, direction: "none", outMode: "bounce" },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 }
      }
    },
    detectRetina: true
  });
}
