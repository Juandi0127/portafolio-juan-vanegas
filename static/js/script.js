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
    // El juego del Carnaval maneja sus propios textos.
    if (window.CarnavalGame) window.CarnavalGame.setLang(l);
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

/* ===== Lightbox (certificados y fotos) ===== */
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Cerrar">&times;</button>' +
    '<img alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');

function openLightbox(source) {
    lightboxImg.src = source.currentSrc || source.src;
    lightboxImg.alt = source.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.removeAttribute('src');
}

document.querySelectorAll('img[data-zoom]').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); }
    });
});

// Clic fuera de la imagen cierra; sobre la imagen, no.
lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg) closeLightbox();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
