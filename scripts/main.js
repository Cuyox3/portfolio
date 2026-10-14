/* ============================================
   PORTFOLIO - Arturo Cid Ruiz
   Main JavaScript
   Requiere scripts/data.js (PORTFOLIO_DATA)
   ============================================ */

(function () {
  'use strict';

  var DATA = window.PORTFOLIO_DATA || { projects: [], certificates: [], certificateCategories: {} };
  // Prefijo de rutas: '' en la raíz, '../' en /pages
  var BASE = document.body.getAttribute('data-base') || '';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Utilidades ----------
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function $(selector, scope) { return (scope || document).querySelector(selector); }
  function $all(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

  function hostname(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return url; }
  }

  // ---------- Render: proyectos ----------
  var groupsById = {};
  (DATA.projectGroups || []).forEach(function (g) { groupsById[g.id] = g; });

  // Captura del sitio: imagen propia si existe, si no una captura automática
  function projectImage(project) {
    if (project.image) return BASE + project.image;
    return 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(project.url) + '?w=1200&h=1800';
  }

  function projectCard(project, opts) {
    var url = escapeHtml(project.url);
    var title = escapeHtml(project.title);
    var group = groupsById[project.group];
    var tags = (project.tags || []).map(function (t) { return '<li>' + escapeHtml(t) + '</li>'; }).join('');
    var features = (project.features || []).map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('');
    var steps = (project.howItWorks || []).map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('');

    var badges = '<span class="project-badge">' + escapeHtml(project.kind || 'Sitio web') + '</span>';
    if (project.private) badges += '<span class="project-badge project-badge--private"><i class="bi bi-lock"></i> Acceso privado</span>';
    if (opts.showGroup && group) badges = '<span class="project-badge project-badge--group">' + escapeHtml(group.name) + '</span>' + badges;

    return '' +
      '<div class="' + opts.col + ' reveal" data-group="' + escapeHtml(project.group || '') + '">' +
        '<article class="project-card">' +
          '<a class="project-preview" href="' + url + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">' +
            '<div class="browser-bar"><span></span><span></span><span></span>' +
              '<em>' + escapeHtml(hostname(project.url)) + '</em></div>' +
            '<div class="project-shot">' +
              '<img src="' + escapeHtml(projectImage(project)) + '" alt="" loading="lazy" decoding="async" ' +
                'onerror="this.parentNode.classList.add(\'is-fallback\')">' +
              '<div class="project-shot-fallback"><i class="bi bi-globe2"></i><span>' + escapeHtml(hostname(project.url)) + '</span></div>' +
              '<span class="project-overlay"><span class="btn btn-primary-custom btn-sm"><i class="bi bi-box-arrow-up-right me-1"></i>Visitar sitio</span></span>' +
            '</div>' +
          '</a>' +
          '<div class="project-body">' +
            '<div class="project-badges">' + badges + '</div>' +
            '<h3>' + title + '</h3>' +
            '<p>' + escapeHtml(project.description || '') + '</p>' +
            (features ? '<h4 class="project-subtitle">Qué hace</h4><ul class="project-features">' + features + '</ul>' : '') +
            (steps ? '<details class="project-how"><summary>Cómo funciona</summary><ol>' + steps + '</ol></details>' : '') +
            '<ul class="chip-list chip-list--sm">' + tags + '</ul>' +
            '<a class="project-link" href="' + url + '" target="_blank" rel="noopener">' +
              escapeHtml(hostname(project.url)) + ' <i class="bi bi-arrow-up-right"></i></a>' +
          '</div>' +
        '</article>' +
      '</div>';
  }

  $all('[data-projects]').forEach(function (container) {
    var mode = container.getAttribute('data-projects');

    if (mode === 'featured') {
      container.innerHTML = DATA.projects.filter(function (p) { return p.featured; })
        .map(function (p) { return projectCard(p, { col: 'col-md-6 col-lg-4', showGroup: true }); }).join('');
      return;
    }

    // Página de proyectos: un bloque por grupo
    container.innerHTML = (DATA.projectGroups || []).map(function (group) {
      var items = DATA.projects.filter(function (p) { return p.group === group.id; });
      if (!items.length) return '';
      return '' +
        '<section class="project-group" data-group-block="' + escapeHtml(group.id) + '">' +
          '<header class="project-group-head reveal">' +
            '<span class="project-group-icon"><i class="bi ' + escapeHtml(group.icon) + '"></i></span>' +
            '<div><h2>' + escapeHtml(group.name) + ' <span class="project-group-count">' + items.length + '</span></h2>' +
            '<p>' + escapeHtml(group.summary) + '</p></div>' +
          '</header>' +
          '<div class="row g-4">' +
            items.map(function (p) { return projectCard(p, { col: 'col-md-6 col-xl-4', showGroup: false }); }).join('') +
          '</div>' +
        '</section>';
    }).join('');
  });

  // Filtros de proyectos por grupo
  var projectFilterBar = $('[data-project-filters]');
  if (projectFilterBar) {
    var pFilters = [{ key: 'all', label: 'Todos', icon: 'bi-grid', count: DATA.projects.length }];
    (DATA.projectGroups || []).forEach(function (g) {
      var n = DATA.projects.filter(function (p) { return p.group === g.id; }).length;
      if (n) pFilters.push({ key: g.id, label: g.name, icon: g.icon, count: n });
    });
    projectFilterBar.innerHTML = pFilters.map(function (f, i) {
      return '<button type="button" class="filter-btn' + (i === 0 ? ' active' : '') + '" data-filter="' + escapeHtml(f.key) + '" aria-pressed="' + (i === 0) + '">' +
        '<i class="bi ' + escapeHtml(f.icon) + '"></i>' + escapeHtml(f.label) + '<span class="filter-count">' + f.count + '</span></button>';
    }).join('');

    projectFilterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var key = btn.getAttribute('data-filter');
      $all('.filter-btn', projectFilterBar).forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      $all('[data-group-block]').forEach(function (block) {
        block.hidden = key !== 'all' && block.getAttribute('data-group-block') !== key;
        if (!block.hidden) {
          block.classList.remove('pop-in');
          void block.offsetWidth;
          block.classList.add('pop-in');
        }
      });
    });
  }

  // ---------- Render: certificados ----------
  function certificateCard(cert) {
    var category = DATA.certificateCategories[cert.category] || {};
    var meta = [category.label, cert.date].filter(Boolean).map(escapeHtml).join(' · ');

    return '' +
      '<div class="col-md-6 col-lg-4 reveal" data-category="' + escapeHtml(cert.category) + '">' +
        '<button type="button" class="cert-card cert-card--' + escapeHtml(cert.category) + '" ' +
          'data-doc="' + escapeHtml(BASE + cert.file) + '" data-doc-title="' + escapeHtml(cert.title) + '">' +
          '<span class="cert-icon"><i class="bi ' + escapeHtml(cert.icon) + '"></i></span>' +
          '<span class="cert-content">' +
            '<span class="cert-meta">' + meta + '</span>' +
            '<span class="cert-title">' + escapeHtml(cert.title) + '</span>' +
            '<span class="cert-issuer">' + escapeHtml(cert.issuer) + '</span>' +
          '</span>' +
          '<span class="cert-action" aria-hidden="true"><i class="bi bi-eye"></i></span>' +
        '</button>' +
      '</div>';
  }

  $all('[data-certificates]').forEach(function (container) {
    var mode = container.getAttribute('data-certificates');
    var list = DATA.certificates.filter(function (c) { return mode === 'all' || c.featured; });
    container.innerHTML = list.map(certificateCard).join('');
  });

  // Filtros de certificados
  var filterBar = $('[data-cert-filters]');
  if (filterBar) {
    var counts = {};
    DATA.certificates.forEach(function (c) { counts[c.category] = (counts[c.category] || 0) + 1; });

    var filters = [{ key: 'all', label: 'Todos', icon: 'bi-grid', count: DATA.certificates.length }];
    Object.keys(DATA.certificateCategories).forEach(function (key) {
      var cat = DATA.certificateCategories[key];
      filters.push({ key: key, label: cat.label, icon: cat.icon, count: counts[key] || 0 });
    });

    filterBar.innerHTML = filters.map(function (f, i) {
      return '<button type="button" class="filter-btn' + (i === 0 ? ' active' : '') + '" data-filter="' + f.key + '" aria-pressed="' + (i === 0) + '">' +
        '<i class="bi ' + f.icon + '"></i>' + escapeHtml(f.label) + '<span class="filter-count">' + f.count + '</span></button>';
    }).join('');

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var key = btn.getAttribute('data-filter');

      $all('.filter-btn', filterBar).forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      $all('[data-certificates] [data-category]').forEach(function (card) {
        card.hidden = key !== 'all' && card.getAttribute('data-category') !== key;
        if (!card.hidden) {
          card.classList.remove('pop-in');
          void card.offsetWidth;
          card.classList.add('pop-in');
        }
      });
    });
  }

  // Totales calculados desde los datos
  var totals = { projects: DATA.projects.length, certificates: DATA.certificates.length };
  $all('[data-count]').forEach(function (el) {
    var total = totals[el.getAttribute('data-count')];
    if (el.classList.contains('counter')) {
      el.setAttribute('data-target', total);
    } else {
      el.textContent = total;
    }
  });

  // Año actual en el footer
  $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Navbar ----------
  var navbar = $('.navbar-custom');
  var backToTop = $('#backToTop');

  function onScroll() {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 30);
    if (backToTop) backToTop.classList.toggle('visible', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // Enlace activo según la sección visible
  var navLinks = $all('.navbar-custom .nav-link[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          var isActive = link.getAttribute('href') === id;
          link.classList.toggle('active', isActive);
          if (isActive) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    $all('main section[id]').forEach(function (s) { sectionObserver.observe(s); });
  }

  // Cerrar el menú móvil al elegir un enlace
  var navCollapseEl = $('#navbarNav');
  if (navCollapseEl && window.bootstrap) {
    $all('a', navCollapseEl).forEach(function (link) {
      link.addEventListener('click', function () {
        var instance = bootstrap.Collapse.getInstance(navCollapseEl);
        if (instance) instance.hide();
      });
    });
  }

  // ---------- Animaciones de entrada ----------
  var revealEls = $all('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      // Escalonar los elementos que entran juntos
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (entry, i) {
        entry.target.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- Contadores ----------
  var counters = $all('.counter');
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    if (prefersReducedMotion) { el.textContent = target; return; }
    var start = null;
    var duration = 1200;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute('data-target'); });
  }

  // ---------- Texto animado (hero) ----------
  var typedElement = $('#typed-text');
  if (typedElement && !prefersReducedMotion) {
    var roles = [
      'Desarrollador Full Stack',
      'Backend con Python y FastAPI',
      'IoT y automatización',
      'Ingeniero en Mecatrónica'
    ];
    var roleIndex = 0;
    var charIndex = roles[0].length;
    var isDeleting = true;

    (function typeEffect() {
      var current = roles[roleIndex];
      var delay;

      charIndex += isDeleting ? -1 : 1;
      typedElement.textContent = current.substring(0, charIndex);
      delay = isDeleting ? 40 : 85;

      if (!isDeleting && charIndex === current.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      setTimeout(typeEffect, delay);
    })();
  }

  // ---------- Partículas (hero) ----------
  var canvas = $('#particles-canvas');
  if (canvas && canvas.getContext && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var running = false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: 0, y: 0, active: false };

    // El cursor atrae líneas y aparta ligeramente las partículas
    canvas.parentElement.addEventListener('pointermove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    canvas.parentElement.addEventListener('pointerleave', function () { mouse.active = false; });

    function resizeCanvas() {
      var hero = canvas.parentElement;
      canvas.width = hero.offsetWidth * dpr;
      canvas.height = hero.offsetHeight * dpr;
      canvas.style.width = hero.offsetWidth + 'px';
      canvas.style.height = hero.offsetHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var w = hero.offsetWidth;
      var h = hero.offsetHeight;
      var count = Math.round(Math.min(70, (w * h) / 22000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.4,
          o: Math.random() * 0.5 + 0.15,
          c: Math.random() < 0.25 ? '0, 212, 170' : '123, 97, 255'
        });
      }
    }

    function draw() {
      if (!running) return;
      var w = canvas.width / dpr;
      var h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        if (mouse.active) {
          var mx = p.x - mouse.x;
          var my = p.y - mouse.y;
          var md = mx * mx + my * my;
          if (md < 32400) { // 180px
            var mdist = Math.sqrt(md) || 1;
            var force = (1 - mdist / 180);
            p.x += (mx / mdist) * force * 1.2;
            p.y += (my / mdist) * force * 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(0, 212, 170, ' + (0.35 * force) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ', ' + p.o + ')';
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = dx * dx + dy * dy;
          if (dist < 19600) { // 140px
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(123, 97, 255, ' + (0.1 * (1 - Math.sqrt(dist) / 140)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resizeCanvas();
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    });

    // Solo animar mientras el hero está visible
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; requestAnimationFrame(draw); }
        if (!visible) running = false;
      }).observe(canvas.parentElement);
    } else {
      running = true;
      requestAnimationFrame(draw);
    }
  }

  // ---------- Formulario de contacto (abre el cliente de correo) ----------
  var contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.elements.name.value.trim();
      var email = contactForm.elements.email.value.trim();
      var subject = contactForm.elements.subject.value.trim();
      var message = contactForm.elements.message.value.trim();

      if (!name || !email || !message || !contactForm.elements.email.checkValidity()) {
        contactForm.classList.add('was-validated');
        showToast('Completa tu nombre, un email válido y el mensaje.', 'error');
        return;
      }

      var to = contactForm.getAttribute('data-email');
      var body = message + '\n\n— ' + name + ' (' + email + ')';
      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject || 'Contacto desde el portafolio') +
        '&body=' + encodeURIComponent(body);

      if (window.portfolioFx) window.portfolioFx.confetti(contactForm.querySelector('[type="submit"]'));
      window.location.href = href;
      contactForm.classList.remove('was-validated');
      showToast('Abriendo tu aplicación de correo…', 'success');
    });
  }

  // ---------- Visor de documentos ----------
  var docModal = $('#docModal');
  var lastFocused = null;

  function openDocModal(url, title) {
    if (!docModal) { window.open(url, '_blank', 'noopener'); return; }

    var body = $('#docModalBody');
    var loading = $('#docModalLoading');
    var old = $('iframe, img', body);
    if (old) old.remove();

    $('#docModalTitle').textContent = title;
    $('#docModalDownload').setAttribute('href', url);
    $('#docModalNewTab').setAttribute('href', url);
    loading.classList.remove('hidden');

    var isImage = /\.(jpe?g|png|gif|webp|svg)$/i.test(url);
    var el = document.createElement(isImage ? 'img' : 'iframe');
    el.src = url;
    if (isImage) el.alt = title; else el.title = title;
    el.onload = el.onerror = function () { loading.classList.add('hidden'); };
    body.appendChild(el);

    lastFocused = document.activeElement;
    docModal.hidden = false;
    // Forzar reflow para que la transición se aplique
    void docModal.offsetWidth;
    docModal.classList.add('active');
    document.body.classList.add('modal-open-custom');
    $('[data-doc-close]', docModal).focus();
  }

  function closeDocModal() {
    if (!docModal || docModal.hidden) return;
    docModal.classList.remove('active');
    document.body.classList.remove('modal-open-custom');
    setTimeout(function () {
      docModal.hidden = true;
      var content = $('#docModalBody iframe, #docModalBody img');
      if (content) content.remove();
    }, 300);
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-doc]');
    if (trigger) {
      e.preventDefault();
      openDocModal(trigger.getAttribute('data-doc'), trigger.getAttribute('data-doc-title') || 'Documento');
      return;
    }
    if (e.target.closest('[data-doc-close]') || e.target === docModal) closeDocModal();
  });

  document.addEventListener('keydown', function (e) {
    if (!docModal || docModal.hidden) return;
    if (e.key === 'Escape') closeDocModal();

    // Mantener el foco dentro del modal
    if (e.key === 'Tab') {
      var focusables = $all('a[href], button', docModal);
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---------- Toast ----------
  window.portfolioUI = { showToast: showToast };

  function showToast(message, type) {
    var existing = $('.toast-notification');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast-notification ' + (type || 'success');
    toast.setAttribute('role', 'status');
    var icon = type === 'error' ? 'bi-exclamation-circle' : 'bi-check-circle-fill';
    toast.innerHTML = '<i class="bi ' + icon + '"></i><span></span>';
    toast.querySelector('span').textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  }

})();
