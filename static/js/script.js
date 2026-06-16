/* ===== Language Toggle ===== */
let lang = 'en';

function applyLang(l) {
    lang = l;
    document.documentElement.setAttribute('data-lang', l);
    document.querySelectorAll('[data-en]').forEach(el => {
        const t = el.getAttribute('data-' + l);
        if (t) el.textContent = t;
    });
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = l === 'en' ? 'ES' : 'EN';
    });
}

document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => applyLang(lang === 'en' ? 'es' : 'en'));
});

/* ===== Mobile Menu ===== */
const mobileBtn  = document.getElementById('mobileBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    mobileBtn.classList.toggle('open', open);
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
    });
});

/* ===== Navbar scroll effect ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const activeSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeSpy.observe(s));

/* ===== Scroll Reveal ===== */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
