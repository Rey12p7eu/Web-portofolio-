document.getElementById('toggleMode').addEventListener('click', () => {
  const root = document.documentElement;
  const icon = document.getElementById('themeIcon');

  const isDark = root.classList.toggle('dark');
  icon.textContent = isDark ? '🌙' : '☀️';
});
