document.addEventListener('DOMContentLoaded', () => {
  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = document.querySelector('.nav').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      document.querySelector('.nav__links').classList.remove('open');
    });
  });

  // === Hamburger menu toggle ===
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // === Scroll-triggered fade-in ===
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section__inner').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // === Contact form submission via Formspree ===
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.contact__submit');
      const originalText = btn.textContent;
      btn.textContent = '보내는 중...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          btn.textContent = '보냈습니다!';
          form.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error('전송 실패');
        }
      } catch {
        btn.textContent = '오류가 발생했습니다';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  }
});
