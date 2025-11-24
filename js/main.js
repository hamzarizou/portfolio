<<<<<<< HEAD
// Hamza Aarizou — Portfolio interactions
// Vanilla JS: theme toggle, mobile menu, scroll reveal, contact form

(function () {
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Theme
  const THEME_KEY = 'ha-theme';
  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
  }
  const saved = localStorage.getItem(THEME_KEY);
  // Par défaut: sombre, sauf si l'utilisateur a choisi autrement précédemment
  applyTheme(saved || 'dark');

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.closest && t.closest('[data-toggle-theme]')) {
      const isLight = root.classList.toggle('theme-light');
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    }
    if (t && t.closest && t.closest('[data-toggle-menu]')) {
      const menu = document.querySelector('.nav-links');
      if (menu) menu.classList.toggle('open');
    }
  });

  // Close mobile menu on nav click
  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('.nav-links a');
    if (link) {
      const menu = document.querySelector('.nav-links');
      if (menu) menu.classList.remove('open');
    }
  });

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Typewriter effect for terminal lines
  function typewrite(el) {
    const text = el.getAttribute('data-text');
    if (!text) return;
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i] || '';
      i++;
      if (i > text.length) clearInterval(timer);
    }, 24);
  }
  document.querySelectorAll('[data-typewrite]').forEach(typewrite);

  // PDF embeds
  document.querySelectorAll('[data-pdf]').forEach((box) => {
    const src = (box.getAttribute('data-pdf') || '').trim();
    if (!src) return;
    const title = box.getAttribute('data-pdf-title') || 'Synthèse PDF';
    if (!/\.pdf(\?|$)/i.test(src)) {
      box.classList.add('is-placeholder');
      box.innerHTML = '<p class="muted">Ajoutez un fichier PDF pour activer l\'aperçu intégré.</p>';
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = src.includes('#') ? src : `${src}#toolbar=0`;
    iframe.title = title;
    box.appendChild(iframe);
  });

  // Contact form
  const form = document.querySelector('form[data-contact]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const errorEl = form.querySelector('[data-error]');
      const okEl = form.querySelector('[data-ok]');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || message.length < 10) {
        if (okEl) okEl.textContent = '';
        if (errorEl) errorEl.textContent = 'Veuillez renseigner un nom, un email valide et un message (≥ 10 caractères).';
        return;
      }

      // For GitHub Pages (no backend): open mailto
      const subject = encodeURIComponent('Contact Portfolio — Hamza Aarizou');
      const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:contact@hamza-aarizou.example?subject=${subject}&body=${body}`;

      if (errorEl) errorEl.textContent = '';
      if (okEl) okEl.textContent = 'Message prêt dans votre client email. Merci !';
      form.reset();
    });
  }
})();


=======
/* ================================
   PORTFOLIO HAMZA AARIZOU - JS
   Animations & Interactions
   ================================ */

// Variables globales
let matrixCanvas, matrixCtx;
let isScrolled = false;
let currentTheme = 'dark';
let typingInterval;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeMatrix();
    initializeNavigation();
    initializeAnimations();
    initializeThemeToggle();
    initializeScrollEffects();
    initializeTypingEffect();
    initializeGlitchEffects();
    initializeCounterAnimations();
    initializeTerminalAnimation();
    initializeFloatingElements();
    initializeLazyLoading();
});

/* ================================
   MATRIX RAIN BACKGROUND
   ================================ */
function initializeMatrix() {
    matrixCanvas = document.getElementById('matrix-rain');
    if (!matrixCanvas) return;
    
    matrixCtx = matrixCanvas.getContext('2d');
    
    // Responsive canvas
    function resizeCanvas() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Caractères Matrix
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        // Fond semi-transparent pour l'effet de traînée
        matrixCtx.fillStyle = 'rgba(10, 10, 15, 0.04)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        matrixCtx.fillStyle = '#00ff88';
        matrixCtx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Animation continue
    setInterval(drawMatrix, 100);
}

/* ================================
   NAVIGATION
   ================================ */
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Menu mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 136, 0.4)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 136, 0.2)';
        }
    });
}

/* ================================
   ANIMATIONS D'ENTRÉE
   ================================ */
function initializeAnimations() {
    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const delay = target.dataset.delay || 0;
                
                setTimeout(() => {
                    target.classList.add('animate-in');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observer tous les éléments avec data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

/* ================================
   TOGGLE THÈME
   ================================ */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Récupérer le thème sauvegardé ou utiliser le thème sombre par défaut
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    body.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            
            // Animation de transition
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

/* ================================
   EFFETS DE SCROLL
   ================================ */
function initializeScrollEffects() {
    const scrollElements = document.querySelectorAll('.fade-in-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
}

/* ================================
   EFFET DE TYPING
   ================================ */
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text, .typing-command');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const typingSpeed = element.classList.contains('typing-command') ? 100 : 50;
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Ajouter le curseur clignotant
                if (element.classList.contains('typing-command')) {
                    element.innerHTML += '<span class="cursor">|</span>';
                }
            }
        };
        
        // Démarrer l'animation après un délai
        setTimeout(typeWriter, element.dataset.typingDelay || 1000);
    });
}

/* ================================
   EFFETS GLITCH
   ================================ */
function initializeGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        const originalText = element.textContent;
        
        element.addEventListener('mouseenter', function() {
            let iterations = 0;
            const maxIterations = 10;
            
            const glitchInterval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                    })
                    .join('');
                
                if (iterations >= maxIterations) {
                    clearInterval(glitchInterval);
                    element.textContent = originalText;
                }
                
                iterations += 1/3;
            }, 30);
        });
        
        // Auto-glitch effect every few seconds
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.dispatchEvent(new Event('mouseenter'));
            }
        }, 2000);
    });
}

/* ================================
   ANIMATIONS DE COMPTEUR
   ================================ */
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Observer pour démarrer l'animation quand visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* ================================
   ANIMATION TERMINAL
   ================================ */
function initializeTerminalAnimation() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (!terminalOutput) return;
    
    const commands = [
        '> Initialisation du système...',
        '> Chargement des modules de sécurité...',
        '> Connexion aux serveurs établie',
        '> Status: [ONLINE] - Prêt pour de nouveaux défis'
    ];
    
    let currentCommand = 0;
    terminalOutput.innerHTML = '';
    
    const typeCommand = () => {
        if (currentCommand < commands.length) {
            const command = commands[currentCommand];
            let i = 0;
            
            const typingInterval = setInterval(() => {
                if (i < command.length) {
                    terminalOutput.innerHTML += command.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    terminalOutput.innerHTML += '<br>';
                    currentCommand++;
                    setTimeout(typeCommand, 500);
                }
            }, 50);
        }
    };
    
    // Démarrer après un délai
    setTimeout(typeCommand, 2000);
}

/* ================================
   ÉLÉMENTS FLOTTANTS
   ================================ */
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    floatingElements.forEach((element, index) => {
        // Animation de flottement personnalisée
        const amplitude = Math.random() * 20 + 10;
        const frequency = Math.random() * 2 + 1;
        
        element.style.setProperty('--amplitude', amplitude + 'px');
        element.style.setProperty('--frequency', frequency + 's');
        
        // Interaction au survol
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.textShadow = '0 0 20px currentColor';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.textShadow = '';
        });
    });
}

/* ================================
   LAZY LOADING IMAGES
   ================================ */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ================================
   SMOOTH SCROLLING POUR ANCRES
   ================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ================================
   ANIMATIONS CSS KEYFRAMES
   ================================ */
const style = document.createElement('style');
style.textContent = `
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    25% {
        transform: translateY(-20px) rotate(90deg);
    }
    50% {
        transform: translateY(-10px) rotate(180deg);
    }
    75% {
        transform: translateY(-15px) rotate(270deg);
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(0, 255, 136, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(0, 255, 136, 0);
    }
}

@keyframes glitch {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(-2px, 2px);
    }
    40% {
        transform: translate(-2px, -2px);
    }
    60% {
        transform: translate(2px, 2px);
    }
    80% {
        transform: translate(2px, -2px);
    }
    100% {
        transform: translate(0);
    }
}

.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% {
        opacity: 1;
    }
    51%, 100% {
        opacity: 0;
    }
}

.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: rgba(10, 10, 15, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.3s ease;
    }
    
    .nav-menu.active {
        right: 0;
    }
    
    .nav-toggle {
        display: flex;
    }
}

/* Thème clair adjustments */
[data-theme="light"] .matrix-rain {
    opacity: 0.05;
}

[data-theme="light"] .navbar {
    background: rgba(248, 250, 252, 0.95);
    border-bottom: 1px solid rgba(0, 102, 255, 0.2);
}

[data-theme="light"] .terminal-window {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 102, 255, 0.3);
}
`;

document.head.appendChild(style);

/* ================================
   GESTION DES ERREURS
   ================================ */
window.addEventListener('error', function(e) {
    console.warn('Erreur JavaScript:', e.error);
});

/* ================================
   PERFORMANCE MONITORING
   ================================ */
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Performance:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
            });
        }, 0);
    });
}
>>>>>>> 11bdc24a241e38596de4537d7b9298de71e11ec8
