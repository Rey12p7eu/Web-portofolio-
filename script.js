
/* Clean, accessible interactions for reveal-on-scroll only */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

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
