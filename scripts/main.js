/* ============================================
   PORTFOLIO - Arturo Cid Ruiz
   Main JavaScript 
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 600);
    });
  }

  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.navbar-custom');
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // ---------- Scroll Animations (IntersectionObserver) ----------
  var animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback para navegadores sin soporte
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- Back to Top ----------
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Typed Text Effect ----------
  var typedElement = document.getElementById('typed-text');
  if (typedElement) {
    var roles = [
      'Desarrollador Web',
      'Jr. Full Stack Developer',
      'Entusiasta de IoT',
      'Estudiante de TI'
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 100;

    function typeEffect() {
      var current = roles[roleIndex];

      if (isDeleting) {
        typedElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000; // Pausa al final
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pausa antes de escribir
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ---------- Particles Canvas ----------
  var canvas = document.getElementById('particles-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;

    function resizeCanvas() {
      var hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, ' + p.opacity + ')';
        ctx.fill();

        // Conectar partículas cercanas
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 212, 170, ' + (0.08 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mover partícula
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    drawParticles();

    window.addEventListener('resize', function () {
      resizeCanvas();
      initParticles();
    });
  }

  // ---------- Cerrar menú móvil al hacer clic en un enlace ----------
  var navCollapseEl = document.getElementById('navbarNav');
  if (navCollapseEl) {
    var navLinksInMenu = navCollapseEl.querySelectorAll('.nav-link');
    navLinksInMenu.forEach(function (link) {
      link.addEventListener('click', function () {
        var bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  // ---------- Smooth scroll para enlaces internos ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Contador animado (stats) ----------
  var counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-target'));
          var current = 0;
          var increment = Math.ceil(target / 60);
          var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = current;
          }, 30);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

});
