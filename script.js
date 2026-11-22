const nav = document.querySelector('.topnav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

const drawer = document.querySelector('.drawer');
document.querySelector('.nav-btn').addEventListener('click', () => drawer.classList.add('open'));
drawer.querySelector('.x').addEventListener('click', () => drawer.classList.remove('open'));
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
