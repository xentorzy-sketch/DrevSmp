// Copy to Clipboard Function
function copyToClipboard() {
    const ip = 'Play.drevsmp.de';
    navigator.clipboard.writeText(ip).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Kopiert!';
        btn.style.background = 'var(--success-color)';
        btn.style.color = 'var(--text-dark)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }).catch(() => {
        alert('Fehler beim Kopieren!');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const elements = document.querySelectorAll('.feature-card, .rule-card, .step, .stat-card, .command-card');
elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

// Navigation highlight
const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Scroll effect for navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 217, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 217, 255, 0.1)';
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

if (document.readyState !== 'loading') {
    document.body.style.opacity = '1';
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat numbers for animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text);
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
                statsObserver.unobserve(entry.target);
            }
        }
    });
});

statNumbers.forEach(num => statsObserver.observe(num));
