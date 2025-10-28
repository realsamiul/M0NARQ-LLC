
document.addEventListener('DOMContentLoaded', function () {
  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fade-in on view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('fade-in'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  document.querySelectorAll('.demo-card, .result-card, .method-item, .capability-card, .source-item, .stat, .gallery img')
    .forEach(el => {
      el.style.opacity = '0'; el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; observer.observe(el);
    });

  // Stats count-up
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateValue(entry.target); statsObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-value').forEach(stat => statsObserver.observe(stat));

  function animateValue(element) {
    const text = element.textContent;
    const value = parseFloat(text);
    if (!isNaN(value)) {
      let current = 0; const increment = value / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) { current = value; clearInterval(timer); }
        element.textContent = current.toFixed(text.includes('.') ? 2 : 0) + text.replace(/[\d.]/g, '');
      }, 20);
    }
  }

  // Subtle parallax for hero
  const hero = document.querySelector('.hero');
  if (hero && CSS.supports('background-position', 'center')) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.2;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, { passive: true });
  }

  console.log('🛰️ Monarq Intelligence Platform Loaded');
});
