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


