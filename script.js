/* ===== ALMIGHTY GYM — interactions ===== */

// 1) Preloader fade out once page is ready
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('done'), 700);
});

// 2) Navbar background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 3) Mobile menu
const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  menu.classList.remove('open');
}));

// 4) Scroll reveal for sections
const toReveal = document.querySelectorAll(
  '.stat, .class-card, .price-card, .review-card, .g-item, .about-text, .about-media, .sec-head, .contact-info, .contact-form'
);
toReveal.forEach(el => el.classList.add('fade'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = Math.min(i * 40, 160) + 'ms';
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });
toReveal.forEach(el => io.observe(el));

// 5) Animated counters in the stats bar
const counters = document.querySelectorAll('.stat h3[data-count]');
const cObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '+';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target + suffix; }
      else { el.textContent = cur + suffix; requestAnimationFrame(tick); }
    };
    tick();
    cObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cObs.observe(c));

// 6) Contact form (demo confirmation — no backend needed)
function sendForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Sent — we will call you back';
  btn.disabled = true;
  e.target.reset();
  setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3500);
  return false;
}
