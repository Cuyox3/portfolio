/* ============================================
   PORTFOLIO - Arturo Cid Ruiz
   Efectos visuales e interacciones
   Se carga después de data.js y main.js

   Índice
   1.  Configuración
   2.  Barra de progreso, marcas de agua y timeline (scroll)
   3.  Cursor personalizado y chispas
   4.  Hero: nombre animado y foco de luz
   5.  Tarjetas: foco de luz, brillo e inclinación 3D
   6.  Botones magnéticos
   7.  Texto "descifrado" en los encabezados
   8.  Marquesina y chips de habilidades
   9.  Contacto: copiar email, hora local y confeti
   10. Footer: marca gigante con luz
   11. Paleta de comandos (Ctrl + K)
   12. Modo hacker (código Konami)
   ============================================ */

(function () {
  'use strict';

  // ---------- 1. Configuración ----------
  var DATA = window.PORTFOLIO_DATA || { projects: [], certificates: [] };
  var BASE = document.body.getAttribute('data-base') || '';
  var IS_HOME = BASE === '';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var richMotion = finePointer && !reducedMotion;
  var COLORS = ['#7b61ff', '#00d4aa', '#ffb547', '#a594ff', '#ff6b6b'];

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $all(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  function toast(message, type) {
    if (window.portfolioUI && window.portfolioUI.showToast) window.portfolioUI.showToast(message, type);
  }

  // Ruta hacia una sección de la portada desde cualquier página
  function homeLink(hash) {
    return IS_HOME ? hash : BASE + 'index.html' + hash;
  }

  // ---------- 2. Efectos ligados al scroll ----------
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  // Marca de agua gigante detrás de cada sección
  var watermarks = [];
  if (!reducedMotion) {
    $all('main .section').forEach(function (section, i) {
      var kicker = $('.section-header .section-kicker', section);
      if (!kicker) return;
      var text = kicker.textContent.split('—').pop().trim();
      var mark = document.createElement('div');
      mark.className = 'section-watermark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = text;
      section.insertBefore(mark, section.firstChild);
      watermarks.push({ el: mark, section: section, dir: i % 2 ? -1 : 1 });
    });
  }

  // Línea de la trayectoria que se dibuja con el scroll
  var timelines = $all('.timeline').map(function (list) {
    var bar = document.createElement('span');
    bar.className = 'timeline-progress';
    bar.setAttribute('aria-hidden', 'true');
    list.appendChild(bar);
    return { list: list, bar: bar, items: $all('.timeline-item', list) };
  });

  function onScrollFrame() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';

    var vh = window.innerHeight;

    watermarks.forEach(function (w) {
      var rect = w.section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var p = (vh - rect.top) / (vh + rect.height);
      var x = (0.5 - p) * window.innerWidth * 0.6 * w.dir;
      w.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px, 0, 0)';
    });

    timelines.forEach(function (t) {
      var rect = t.list.getBoundingClientRect();
      var trigger = vh * 0.62;
      var progress = clamp((trigger - rect.top) / rect.height, 0, 1);
      t.bar.style.height = Math.max(0, progress * (rect.height - 16)) + 'px';
      t.items.forEach(function (item) {
        item.classList.toggle('is-active', item.getBoundingClientRect().top + 8 < trigger);
      });
    });
  }

  var scrollTicking = false;
  function requestScrollFrame() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      scrollTicking = false;
      onScrollFrame();
    });
  }
  window.addEventListener('scroll', requestScrollFrame, { passive: true });
  window.addEventListener('resize', requestScrollFrame);
  onScrollFrame();

  // ---------- 3. Cursor personalizado y chispas ----------
  if (richMotion) {
    document.documentElement.classList.add('has-cursor');

    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    ring.innerHTML = '<span></span>';
    document.body.appendChild(ring);
    var ringLabel = ring.firstChild;

    var mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

    document.addEventListener('pointermove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ring.classList.add('is-visible');
    });
    document.addEventListener('pointerleave', function () { ring.classList.remove('is-visible'); });
    document.addEventListener('pointerdown', function () { ring.classList.add('is-down'); });
    document.addEventListener('pointerup', function () { ring.classList.remove('is-down'); });

    (function loop() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0)' + (ring.classList.contains('is-down') ? ' scale(0.8)' : '');
      requestAnimationFrame(loop);
    })();

    document.addEventListener('pointerover', function (e) {
      var t = e.target;
      var label = '';
      if (t.closest('.project-preview')) label = 'Visitar';
      else if (t.closest('[data-doc]')) label = 'Ver';

      ring.classList.toggle('is-label', !!label);
      ringLabel.textContent = label;
      ring.classList.toggle('is-hover', !label && !!t.closest('a, button, summary, [data-tilt], label'));
      ring.style.opacity = t.closest('input, textarea') ? '0' : '';
    });

    // Chispas al hacer clic
    document.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      for (var i = 0; i < 8; i++) {
        var spark = document.createElement('span');
        var angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
        var dist = 28 + Math.random() * 22;
        spark.className = 'click-spark';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
        spark.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
        spark.style.setProperty('--spark-color', COLORS[i % COLORS.length]);
        document.body.appendChild(spark);
        setTimeout(spark.remove.bind(spark), 650);
      }
    });
  }

  // ---------- 4. Hero ----------
  var heroName = $('.hero-name');
  if (heroName && !reducedMotion) {
    var words = [];
    Array.prototype.forEach.call(heroName.childNodes, function (node) {
      var isGradient = node.nodeType === 1 && node.classList.contains('gradient-text');
      (node.textContent || '').split(/\s+/).forEach(function (w) {
        if (w) words.push({ text: w, gradient: isGradient });
      });
    });
    heroName.setAttribute('aria-label', words.map(function (w) { return w.text; }).join(' '));
    heroName.innerHTML = words.map(function (w, i) {
      return '<span class="word" aria-hidden="true"><span class="word-inner' + (w.gradient ? ' gradient-text' : '') +
        '" style="--d:' + i + '">' + w.text.replace(/[&<>]/g, '') + '</span></span>';
    }).join(' ');
  }

  var hero = $('.hero-section');
  if (hero && richMotion) {
    hero.addEventListener('pointermove', function (e) {
      var rect = hero.getBoundingClientRect();
      hero.style.setProperty('--hx', (e.clientX - rect.left) + 'px');
      hero.style.setProperty('--hy', (e.clientY - rect.top) + 'px');
    });
  }

  // ---------- 5. Tarjetas ----------
  $all('.service-item, .skill-group, .info-item, .project-card, .cert-card, .contact-info-item').forEach(function (el) {
    el.classList.add('spotlight');
  });

  $all('.cert-card').forEach(function (card) {
    var shine = document.createElement('span');
    shine.className = 'cert-shine';
    shine.setAttribute('aria-hidden', 'true');
    card.insertBefore(shine, card.firstChild);
  });

  if (finePointer) {
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.spotlight');
      if (!card) return;
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    }, { passive: true });
  }

  if (richMotion) {
    $all('.project-card, .skill-group').forEach(function (el) {
      el.setAttribute('data-tilt', '');
      var glare = document.createElement('span');
      glare.className = 'tilt-glare';
      glare.setAttribute('aria-hidden', 'true');
      el.appendChild(glare);
    });

    $all('[data-tilt]').forEach(function (el) {
      var isPhoto = el.classList.contains('hero-photo');
      var maxDeg = isPhoto ? 12 : 7;
      var lift = isPhoto ? '' : ' translateY(-6px)';

      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        el.classList.add('is-tilting');
        el.style.transform = 'perspective(1000px) rotateX(' + ((0.5 - py) * maxDeg).toFixed(2) + 'deg) rotateY(' +
          ((px - 0.5) * maxDeg).toFixed(2) + 'deg)' + lift;
        el.style.setProperty('--gx', (px * 100) + '%');
        el.style.setProperty('--gy', (py * 100) + '%');
      });

      el.addEventListener('pointerleave', function () {
        el.classList.remove('is-tilting');
        el.style.transform = '';
      });
    });
  }

  // ---------- 6. Botones magnéticos ----------
  if (richMotion) {
    $all('.btn-primary-custom, .btn-outline-custom, .social-link, .cmdk-trigger, .back-to-top').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = 'translate(' + (dx * 0.25).toFixed(1) + 'px,' + (dy * 0.35).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  // ---------- 7. Texto "descifrado" ----------
  var GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEF';

  function scramble(el) {
    var finalText = el.textContent;
    var chars = finalText.split('').map(function (c, i) {
      return { c: c, end: 6 + Math.floor(i * 1.4 + Math.random() * 10) };
    });
    var frame = 0;
    el.classList.add('is-scrambling');

    (function tick() {
      var done = true;
      el.textContent = chars.map(function (ch) {
        if (frame >= ch.end || ch.c === ' ') return ch.c;
        done = false;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }).join('');
      frame++;
      if (done) {
        el.textContent = finalText;
        el.classList.remove('is-scrambling');
      } else {
        requestAnimationFrame(tick);
      }
    })();
  }

  if (!reducedMotion && 'IntersectionObserver' in window) {
    var scrambleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scramble(entry.target);
          scrambleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 1 });
    $all('.section-kicker').forEach(function (el) { scrambleObserver.observe(el); });
  }

  // ---------- 8. Habilidades ----------
  // Duplicar el contenido para que la marquesina sea infinita
  $all('.marquee-track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  $all('.skill-group .chip-list').forEach(function (list) {
    $all('li', list).forEach(function (li, i) { li.style.setProperty('--i', i); });
  });

  // ---------- 9. Contacto ----------
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (err) { reject(err); }
      area.remove();
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    copyText(btn.getAttribute('data-copy')).then(function () {
      var label = $('span', btn);
      btn.classList.add('is-copied');
      if (label) label.textContent = '¡Copiado!';
      $('i', btn).className = 'bi bi-check2';
      confetti(btn, 24);
      setTimeout(function () {
        btn.classList.remove('is-copied');
        if (label) label.textContent = 'Copiar';
        $('i', btn).className = 'bi bi-copy';
      }, 2000);
    }).catch(function () {
      toast('No se pudo copiar. El email es ' + btn.getAttribute('data-copy'), 'error');
    });
  });

  var timeEls = $all('[data-local-time]');
  if (timeEls.length && window.Intl) {
    var formatter = new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Mexico_City' });
    var updateTime = function () {
      var t = formatter.format(new Date()) + ' h';
      timeEls.forEach(function (el) { el.textContent = t; });
    };
    updateTime();
    setInterval(updateTime, 30000);
  }

  function confetti(origin, amount) {
    if (reducedMotion || !origin) return;
    var rect = origin.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    amount = amount || 70;
    for (var i = 0; i < amount; i++) {
      var piece = document.createElement('span');
      var angle = Math.random() * Math.PI * 2;
      var velocity = 120 + Math.random() * 260;
      piece.className = 'confetti-piece';
      piece.style.left = cx + 'px';
      piece.style.top = cy + 'px';
      piece.style.background = COLORS[i % COLORS.length];
      piece.style.setProperty('--cx', Math.cos(angle) * velocity + 'px');
      piece.style.setProperty('--cy', (Math.sin(angle) * velocity + 160) + 'px');
      piece.style.setProperty('--cr', (Math.random() * 720 - 360) + 'deg');
      piece.style.animationDelay = (Math.random() * 80) + 'ms';
      document.body.appendChild(piece);
      setTimeout(piece.remove.bind(piece), 1600);
    }
  }

  // ---------- 10. Footer ----------
  $all('.footer-wordmark').forEach(function (mark) {
    var text = $('span', mark);
    mark.addEventListener('pointermove', function (e) {
      var rect = text.getBoundingClientRect();
      mark.style.setProperty('--fx', (e.clientX - rect.left) + 'px');
      mark.style.setProperty('--fy', (e.clientY - rect.top) + 'px');
    });
  });

  // ---------- 11. Paleta de comandos ----------
  function openDoc(file, title) {
    // Reutiliza el visor de main.js mediante un disparador temporal
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.hidden = true;
    trigger.setAttribute('data-doc', BASE + file);
    trigger.setAttribute('data-doc-title', title);
    document.body.appendChild(trigger);
    trigger.click();
    trigger.remove();
  }

  function go(href, newTab) {
    if (newTab) window.open(href, '_blank', 'noopener');
    else window.location.href = href;
  }

  var commands = [
    { group: 'Navegar', icon: 'bi-house', label: 'Inicio', run: function () { go(homeLink('#hero')); } },
    { group: 'Navegar', icon: 'bi-person', label: 'Sobre mí', run: function () { go(homeLink('#about')); } },
    { group: 'Navegar', icon: 'bi-stack', label: 'Habilidades', run: function () { go(homeLink('#skills')); } },
    { group: 'Navegar', icon: 'bi-signpost-split', label: 'Trayectoria', run: function () { go(homeLink('#experience')); } },
    { group: 'Navegar', icon: 'bi-envelope', label: 'Contacto', run: function () { go(homeLink('#contact')); } },
    { group: 'Navegar', icon: 'bi-grid-1x2', label: 'Todos los proyectos', hint: 'página', run: function () { go(BASE + 'pages/proyectos.html'); } },
    { group: 'Navegar', icon: 'bi-award', label: 'Todos los certificados', hint: 'página', run: function () { go(BASE + 'pages/certificados.html'); } },
    { group: 'Acciones', icon: 'bi-file-earmark-arrow-down', label: 'Descargar CV', hint: 'PDF', run: function () { go(BASE + 'docs/cv/CV-Arturo-Cid-Ruiz.pdf', true); } },
    { group: 'Acciones', icon: 'bi-copy', label: 'Copiar email', hint: 'contacto@cuyox3.com', run: function () {
      copyText('contacto@cuyox3.com').then(function () { toast('Email copiado al portapapeles', 'success'); });
    } },
    { group: 'Acciones', icon: 'bi-github', label: 'Abrir GitHub', hint: 'Cuyox3', run: function () { go('https://github.com/Cuyox3', true); } },
    { group: 'Acciones', icon: 'bi-linkedin', label: 'Abrir LinkedIn', hint: 'arturo-cid-ruiz', run: function () { go('https://www.linkedin.com/in/arturo-cid-ruiz/', true); } },
    { group: 'Acciones', icon: 'bi-instagram', label: 'Instagram de CuyoX3', hint: '@cuyo_x3', keywords: 'reels redes sociales', run: function () { go('https://www.instagram.com/cuyo_x3/', true); } },
    { group: 'Acciones', icon: 'bi-terminal', label: 'Modo hacker', hint: '↑↑↓↓←→←→BA', run: function () { matrix(); } }
  ];

  (DATA.projects || []).forEach(function (p) {
    commands.push({ group: 'Proyectos', icon: 'bi-globe2', label: p.title, hint: p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, ''), run: function () { go(p.url, true); } });
  });
  (DATA.certificates || []).forEach(function (c) {
    commands.push({ group: 'Certificados', icon: c.icon || 'bi-award', label: c.title, hint: c.date || '', keywords: c.issuer, run: function () { openDoc(c.file, c.title); } });
  });

  function normalize(str) {
    return (str || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  var cmdk = document.createElement('div');
  cmdk.className = 'cmdk';
  cmdk.hidden = true;
  cmdk.setAttribute('role', 'dialog');
  cmdk.setAttribute('aria-modal', 'true');
  cmdk.setAttribute('aria-label', 'Buscador de comandos');
  cmdk.innerHTML =
    '<div class="cmdk-box">' +
      '<div class="cmdk-input-row"><i class="bi bi-search"></i>' +
        '<input class="cmdk-input" type="text" placeholder="Busca secciones, proyectos, certificados…" aria-label="Buscar" autocomplete="off" spellcheck="false">' +
        '<span class="cmdk-esc">ESC</span></div>' +
      '<ul class="cmdk-list" role="listbox"></ul>' +
      '<div class="cmdk-hint"><span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Ctrl</kbd> <kbd>K</kbd> abrir / cerrar</span></div>' +
    '</div>';
  document.body.appendChild(cmdk);

  var cmdkInput = $('.cmdk-input', cmdk);
  var cmdkList = $('.cmdk-list', cmdk);
  var visibleCommands = [];
  var activeIndex = 0;
  var cmdkLastFocus = null;

  function renderCommands() {
    var q = normalize(cmdkInput.value.trim());
    visibleCommands = commands.filter(function (c) {
      return !q || normalize(c.label + ' ' + c.group + ' ' + (c.hint || '') + ' ' + (c.keywords || '')).indexOf(q) !== -1;
    });
    activeIndex = Math.min(activeIndex, Math.max(visibleCommands.length - 1, 0));

    if (!visibleCommands.length) {
      cmdkList.innerHTML = '<li class="cmdk-empty">Sin resultados para "' + cmdkInput.value.replace(/[<>&"]/g, '') + '"</li>';
      return;
    }

    var html = '';
    var lastGroup = '';
    visibleCommands.forEach(function (c, i) {
      if (c.group !== lastGroup) {
        html += '<li class="cmdk-group" role="presentation">' + c.group + '</li>';
        lastGroup = c.group;
      }
      html += '<li class="cmdk-item' + (i === activeIndex ? ' is-active' : '') + '" role="option" data-index="' + i + '"' +
        (i === activeIndex ? ' aria-selected="true"' : '') + '>' +
        '<i class="bi ' + c.icon + '"></i><span></span>' + (c.hint ? '<small></small>' : '') + '</li>';
    });
    cmdkList.innerHTML = html;

    // Los textos se asignan con textContent para evitar inyección de HTML
    $all('.cmdk-item', cmdkList).forEach(function (li) {
      var c = visibleCommands[+li.getAttribute('data-index')];
      $('span', li).textContent = c.label;
      if (c.hint) $('small', li).textContent = c.hint;
    });
  }

  function setActive(i) {
    activeIndex = (i + visibleCommands.length) % visibleCommands.length;
    $all('.cmdk-item', cmdkList).forEach(function (li) {
      var on = +li.getAttribute('data-index') === activeIndex;
      li.classList.toggle('is-active', on);
      if (on) { li.setAttribute('aria-selected', 'true'); li.scrollIntoView({ block: 'nearest' }); }
      else li.removeAttribute('aria-selected');
    });
  }

  function openCmdk() {
    cmdkLastFocus = document.activeElement;
    cmdk.hidden = false;
    void cmdk.offsetWidth;
    cmdk.classList.add('active');
    cmdkInput.value = '';
    activeIndex = 0;
    renderCommands();
    cmdkInput.focus();
  }

  function closeCmdk() {
    cmdk.classList.remove('active');
    setTimeout(function () { cmdk.hidden = true; }, 200);
    if (cmdkLastFocus && cmdkLastFocus.focus) cmdkLastFocus.focus();
  }

  function runCommand(i) {
    var c = visibleCommands[i];
    if (!c) return;
    closeCmdk();
    setTimeout(c.run, 120);
  }

  cmdkInput.addEventListener('input', function () { activeIndex = 0; renderCommands(); });
  cmdkInput.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIndex - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); runCommand(activeIndex); }
  });
  cmdkList.addEventListener('click', function (e) {
    var li = e.target.closest('.cmdk-item');
    if (li) runCommand(+li.getAttribute('data-index'));
  });
  cmdk.addEventListener('click', function (e) { if (e.target === cmdk) closeCmdk(); });

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdk.hidden) openCmdk(); else closeCmdk();
    } else if (e.key === 'Escape' && !cmdk.hidden) {
      closeCmdk();
    }
  });

  $all('[data-cmdk]').forEach(function (btn) {
    btn.addEventListener('click', openCmdk);
  });

  // ---------- 12. Modo hacker (código Konami) ----------
  var KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  var konamiPos = 0;
  document.addEventListener('keydown', function (e) {
    var key = (e.key || '').toLowerCase();
    konamiPos = key === KONAMI[konamiPos] ? konamiPos + 1 : (key === KONAMI[0] ? 1 : 0);
    if (konamiPos === KONAMI.length) {
      konamiPos = 0;
      matrix();
    }
  });

  var matrixRunning = false;
  function matrix() {
    if (matrixRunning || reducedMotion) return;
    matrixRunning = true;
    toast('Modo hacker activado', 'success');

    var canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var size = 16;
    var columns = Math.ceil(canvas.width / size);
    var drops = [];
    for (var i = 0; i < columns; i++) drops.push(Math.random() * -50);
    var glyphs = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}';
    var start = performance.now();

    requestAnimationFrame(function () { canvas.classList.add('active'); });

    (function draw(now) {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = size + 'px "Fira Code", monospace';
      for (var c = 0; c < columns; c++) {
        var y = drops[c] * size;
        ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : (c % 3 ? '#00d4aa' : '#7b61ff');
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], c * size, y);
        if (y > canvas.height && Math.random() > 0.975) drops[c] = 0;
        drops[c] += 1;
      }
      if (now - start < 6000) {
        requestAnimationFrame(draw);
      } else {
        canvas.classList.remove('active');
        setTimeout(function () { canvas.remove(); matrixRunning = false; }, 700);
      }
    })(start);
  }

  // API para main.js
  window.portfolioFx = { confetti: confetti, matrix: matrix, openCommandPalette: openCmdk };

})();
