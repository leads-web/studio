/* ===================================
   CYBERWEB – SCRIPT.JS
   Interactions, Animations & UX
   =================================== */

'use strict';

/* ===== NAVBAR SCROLL ===== */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== HAMBURGER MENU ===== */
(function () {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ===== SCROLL REVEAL ===== */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    els.forEach(el => el.classList.add('revealed'));
  }
})();

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ===== ACTIVE NAV LINK (SCROLL SPY) ===== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = 'var(--gold)';
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== COUNTER ANIMATION ===== */
(function () {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  // Only animate the numeric ones
  const animated = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (animated.has(el)) return;
      animated.add(el);

      const text = el.textContent.trim();
      const numMatch = text.match(/[\d]+/);
      if (!numMatch) return;

      const endVal = parseInt(numMatch[0]);
      const suffix = text.replace(/[\d]+/, '');
      const duration = 1400;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * endVal) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();

/* ===== WHATSAPP FLOAT PULSE ===== */
(function () {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;

  // Add pulse ring
  const ring = document.createElement('span');
  ring.style.cssText = `
    position:absolute;
    inset:-6px;
    border-radius:50%;
    border:2px solid rgba(37,211,102,0.5);
    animation:wa-pulse 2.2s ease-out infinite;
    pointer-events:none;
  `;
  btn.style.position = 'relative';
  btn.appendChild(ring);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes wa-pulse {
      0%   { transform:scale(1); opacity:0.8; }
      100% { transform:scale(1.6); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ===== PLAN CARD HOVER GLOW ===== */
(function () {
  const cards = document.querySelectorAll('.plan-card, .service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
})();

/* ===== TYPING EFFECT HERO SUBTITLE ===== */
(function () {
  const sub = document.querySelector('.hero-sub');
  if (!sub) return;
  // Just add a subtle entrance — handled by CSS reveal
})();

/* ===== PARALLAX HERO GLOW ===== */
(function () {
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (!glow1 || !glow2) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    glow1.style.transform = `translate(${x}px, ${y}px)`;
    glow2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
  }, { passive: true });
})();

/* ===== PORTFOLIO CARD TILT ===== */
(function () {
  const cards = document.querySelectorAll('.portfolio-card:not(.portfolio-card--cta)');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) perspective(600px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger reveal for hero immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      el.classList.add('revealed');
    });
  }, 100);
});
