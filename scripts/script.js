// ====================Theme Toggle===================
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// =================Initialize theme=====================
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}


themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (hero) {
                hero.style.backgroundPosition = `center ${rate}px`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// =======================Mobile Navigation=============================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ================Close mobile menu when clicking outside===============
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// ============Smooth scroll for anchor links===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// ===========================Contact Form===========================
const contactForm = document.getElementById('contact-form');
const alertBox = document.querySelector('.Alert');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // ======================Simulate form submission=========================
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alertBox.classList.toggle('open');
        setTimeout(() => {
            alertBox.classList.toggle('open');
        } ,2000);
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// ============================Intersection Observer for skill progress animation====================
const skillProgress = document.querySelectorAll('.skill-progress');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('style').split(':')[1];
        }
    });
}, observerOptions);

skillProgress.forEach(progress => {
    progress.style.width = '1';
    skillObserver.observe(progress);
});

// ============================WhatsApp Integration============================
const whatsappButton = document.querySelector('.contact-form .btn a');

if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields before sending');
            return;
        }
        
        const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        whatsappButton.href = `https://wa.me/233534078670?text=${encodedMessage}`;
    });
}
