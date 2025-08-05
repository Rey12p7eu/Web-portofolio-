// Toggle dark/light mode
document.getElementById('toggleMode').addEventListener('click', () => {
  const root = document.documentElement;
  const icon = document.getElementById('themeIcon');

  const isDark = root.classList.toggle('dark');
  icon.textContent = isDark ? '🌙' : '☀️';
});

// Efek muncul saat scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-active');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.paragraph-to-reveal').forEach(paragraph => {
  paragraph.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-700');
  observer.observe(paragraph);
});
