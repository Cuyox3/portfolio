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
        ctx.fillStyle = 'rgba(123, 97, 255, ' + p.opacity + ')';
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
            ctx.strokeStyle = 'rgba(123, 97, 255, ' + (0.08 * (1 - dist / 150)) + ')';
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

  // ---------- Formulario de contacto ----------
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('contactName').value.trim();
      var email = document.getElementById('contactEmail').value.trim();
      var subject = document.getElementById('contactSubject').value.trim();
      var message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Por favor completa todos los campos requeridos.', 'error');
        return;
      }

      // Simulación de envío (puedes reemplazar con tu endpoint real)
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
      submitBtn.disabled = true;

      setTimeout(function () {
        showToast('¡Mensaje enviado correctamente! Te responderé pronto. 🚀', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ---------- Iframe de proyectos: loading y fallback ----------
  var projectIframes = document.querySelectorAll('.project-iframe-wrapper iframe');
  projectIframes.forEach(function (iframe) {
    var wrapper = iframe.closest('.project-iframe-wrapper');
    var loading = wrapper.querySelector('.project-iframe-loading');
    var timeoutId;

    // Timeout de 8 segundos para fallback
    timeoutId = setTimeout(function () {
      if (loading && !loading.classList.contains('hidden')) {
        showIframeFallback(wrapper, iframe);
      }
    }, 8000);

    iframe.addEventListener('load', function () {
      clearTimeout(timeoutId);
      iframe.classList.add('loaded');
      if (loading) {
        loading.classList.add('hidden');
      }
    });

    iframe.addEventListener('error', function () {
      clearTimeout(timeoutId);
      showIframeFallback(wrapper, iframe);
    });
  });

  function showIframeFallback(wrapper, iframe) {
    var loading = wrapper.querySelector('.project-iframe-loading');
    if (loading) loading.classList.add('hidden');
    
    // Solo mostrar fallback si no hay ya uno
    if (!wrapper.querySelector('.project-iframe-fallback')) {
      var fallback = document.createElement('div');
      fallback.className = 'project-iframe-fallback';
      fallback.innerHTML = '<i class="bi bi-globe2"></i><span>Vista previa no disponible</span>';
      wrapper.appendChild(fallback);
    }
  }

  // ---------- PDF Modal ----------
  var pdfModal = document.getElementById('pdfModal');
  if (pdfModal) {
    // Cerrar con click fuera del contenedor
    pdfModal.addEventListener('click', function (e) {
      if (e.target === pdfModal) {
        closePdfModal();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
        closePdfModal();
      }
    });
  }

});

// ---------- Funciones globales ----------

/**
 * Abre el modal con visor de PDF o imagen
 * @param {string} url - Ruta al archivo PDF o imagen
 * @param {string} title - Título a mostrar en el modal
 */
function openPdfModal(url, title) {
  var modal = document.getElementById('pdfModal');
  var modalTitle = document.getElementById('pdfModalTitle');
  var modalBody = document.getElementById('pdfModalBody');
  var modalLoading = document.getElementById('pdfModalLoading');
  var modalDownload = document.getElementById('pdfModalDownload');
  var modalNewTab = document.getElementById('pdfModalNewTab');

  if (!modal || !modalBody) return;

  // Limpiar contenido anterior
  var oldContent = modalBody.querySelector('iframe, img');
  if (oldContent) oldContent.remove();

  // Mostrar loading
  if (modalLoading) modalLoading.classList.remove('hidden');

  // Configurar título
  if (modalTitle) {
    modalTitle.innerHTML = '<i class="bi bi-file-earmark-text"></i> ' + title;
  }

  // Configurar botones
  if (modalDownload) modalDownload.setAttribute('href', url);
  if (modalNewTab) modalNewTab.setAttribute('href', url);

  // Detectar si es imagen o PDF
  var isImage = /\.(jpe?g|png|gif|webp|svg)$/i.test(url);

  if (isImage) {
    var img = document.createElement('img');
    img.src = url;
    img.alt = title;
    img.onload = function () {
      if (modalLoading) modalLoading.classList.add('hidden');
    };
    img.onerror = function () {
      if (modalLoading) modalLoading.classList.add('hidden');
    };
    modalBody.appendChild(img);
    if (modalTitle) {
      modalTitle.innerHTML = '<i class="bi bi-image"></i> ' + title;
    }
  } else {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = title;
    iframe.onload = function () {
      if (modalLoading) modalLoading.classList.add('hidden');
    };
    modalBody.appendChild(iframe);
  }

  // Mostrar modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de PDF
 */
function closePdfModal() {
  var modal = document.getElementById('pdfModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  // Limpiar contenido después de la animación
  setTimeout(function () {
    var modalBody = document.getElementById('pdfModalBody');
    if (modalBody) {
      var content = modalBody.querySelector('iframe, img');
      if (content) content.remove();
    }
  }, 350);
}

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success' o 'error'
 */
function showToast(message, type) {
  // Remover toast anterior si existe
  var existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'toast-notification ' + (type || 'success');

  var icon = type === 'error' ? 'bi-exclamation-circle' : 'bi-check-circle-fill';
  toast.innerHTML = '<i class="bi ' + icon + '"></i><span>' + message + '</span>';

  document.body.appendChild(toast);

  // Trigger show
  requestAnimationFrame(function () {
    toast.classList.add('show');
  });

  // Auto-hide
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, 4000);
}
