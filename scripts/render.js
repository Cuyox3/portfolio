/* ============================================
   PORTFOLIO - Arturo Cid Ruiz
   Generación del HTML de proyectos y certificados

   Este archivo lo usan dos lugares:
   1. El navegador (main.js), para pintar las tarjetas al cargar.
   2. tools/prerender.js (Node), para escribir esas mismas tarjetas
      dentro de los .html. Así Google, LinkedIn, WhatsApp y cualquier
      crawler que no ejecuta JavaScript ven el contenido real.

   Al compartir el mismo código, el HTML pre-renderizado y el que pinta
   el navegador siempre coinciden.
   ============================================ */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PortfolioRender = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // URL pública del sitio: se usa en datos estructurados (JSON-LD)
  var SITE_URL = 'https://cuyox3.github.io/portfolio/';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function hostname(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return url; }
  }

  /**
   * @param {object} data  PORTFOLIO_DATA
   * @param {string} base  prefijo de rutas: '' en la raíz, '../' en /pages
   */
  function create(data, base) {
    base = base || '';
    var groupsById = {};
    (data.projectGroups || []).forEach(function (g) { groupsById[g.id] = g; });

    // Captura del sitio: imagen propia si existe, si no una captura automática
    function projectImage(project) {
      if (project.image) return base + project.image;
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
                '<img src="' + escapeHtml(projectImage(project)) + '" alt="Captura del sitio ' + title + '" loading="lazy" decoding="async" ' +
                  'width="1200" height="750" onerror="this.parentNode.classList.add(\'is-fallback\')">' +
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
              '<div class="project-links">' +
                '<a class="project-link" href="' + url + '" target="_blank" rel="noopener">' +
                  escapeHtml(hostname(project.url)) + ' <i class="bi bi-arrow-up-right"></i></a>' +
                (project.repo ? '<a class="project-link" href="' + escapeHtml(project.repo) + '" target="_blank" rel="noopener">' +
                  '<i class="bi bi-github"></i> Código</a>' : '') +
              '</div>' +
            '</div>' +
          '</article>' +
        '</div>';
    }

    function socialShowcase(group) {
      var ig = group.instagram;
      var reels = (group.reels || []).map(function (url) {
        var safe = escapeHtml(url);
        return '' +
          '<div class="reel-card">' +
            '<blockquote class="instagram-media" data-instgrm-permalink="' + safe + '?utm_source=ig_embed" data-instgrm-version="14">' +
              '<a class="reel-fallback" href="' + safe + '" target="_blank" rel="noopener">' +
                '<span class="reel-fallback-icon"><i class="bi bi-instagram"></i></span>' +
                '<span class="reel-fallback-text">Ver este reel de ' + escapeHtml(group.name) + ' en Instagram</span>' +
                '<span class="reel-fallback-cta">Abrir reel <i class="bi bi-box-arrow-up-right"></i></span>' +
              '</a>' +
            '</blockquote>' +
          '</div>';
      }).join('');

      return '' +
        '<div class="social-showcase-head">' +
          '<span class="social-showcase-icon"><i class="bi bi-instagram"></i></span>' +
          '<div><h3>' + escapeHtml(group.name) + ' en Instagram</h3>' +
          '<p>Reels y publicaciones de la marca, directo desde Instagram.</p></div>' +
          '<a class="btn btn-outline-custom btn-sm social-follow" href="' + escapeHtml(ig.url) + '" target="_blank" rel="noopener">' +
            '<i class="bi bi-instagram me-2"></i>Seguir ' + escapeHtml(ig.handle) + '</a>' +
        '</div>' +
        '<div class="reel-grid">' + reels + '</div>';
    }

    /** mode: 'featured' (portada) | 'grouped' (página de proyectos) */
    function projects(mode) {
      if (mode === 'featured') {
        return data.projects.filter(function (p) { return p.featured; })
          .map(function (p) { return projectCard(p, { col: 'col-md-6 col-lg-4', showGroup: true }); }).join('');
      }

      return (data.projectGroups || []).map(function (group) {
        var items = data.projects.filter(function (p) { return p.group === group.id; });
        if (!items.length) return '';
        return '' +
          '<section class="project-group" data-group-block="' + escapeHtml(group.id) + '">' +
            '<header class="project-group-head reveal">' +
              '<span class="project-group-icon"><i class="bi ' + escapeHtml(group.icon) + '"></i></span>' +
              '<div><h2>' + escapeHtml(group.name) + ' <span class="project-group-count">' + items.length + '</span></h2>' +
              '<p>' + escapeHtml(group.summary) + '</p></div>' +
              (group.instagram ? '<a class="group-social" href="' + escapeHtml(group.instagram.url) + '" target="_blank" rel="noopener">' +
                '<i class="bi bi-instagram"></i> ' + escapeHtml(group.instagram.handle) + '</a>' : '') +
            '</header>' +
            '<div class="row g-4">' +
              items.map(function (p) { return projectCard(p, { col: 'col-md-6 col-xl-4', showGroup: false }); }).join('') +
            '</div>' +
            (group.instagram && group.reels ?
              '<div class="social-showcase reveal" data-social-showcase="' + escapeHtml(group.id) + '">' + socialShowcase(group) + '</div>' : '') +
          '</section>';
      }).join('');
    }

    // Los certificados son enlaces reales al documento: sin JavaScript abren
    // el PDF y los buscadores pueden seguirlos; con JavaScript, main.js
    // intercepta el clic y los muestra en el visor.
    function certificateCard(cert) {
      var category = (data.certificateCategories || {})[cert.category] || {};
      var meta = [category.label, cert.date].filter(Boolean).map(escapeHtml).join(' · ');
      var file = escapeHtml(base + cert.file);

      return '' +
        '<div class="col-md-6 col-lg-4 reveal" data-category="' + escapeHtml(cert.category) + '">' +
          '<a class="cert-card cert-card--' + escapeHtml(cert.category) + '" href="' + file + '" target="_blank" rel="noopener" ' +
            'data-doc="' + file + '" data-doc-title="' + escapeHtml(cert.title) + '">' +
            '<span class="cert-icon"><i class="bi ' + escapeHtml(cert.icon) + '"></i></span>' +
            '<span class="cert-content">' +
              '<span class="cert-meta">' + meta + '</span>' +
              '<span class="cert-title">' + escapeHtml(cert.title) + '</span>' +
              '<span class="cert-issuer">' + escapeHtml(cert.issuer) + '</span>' +
            '</span>' +
            '<span class="cert-action" aria-hidden="true"><i class="bi bi-eye"></i></span>' +
          '</a>' +
        '</div>';
    }

    /** mode: 'featured' (portada) | 'all' (página de certificados) */
    function certificates(mode) {
      return data.certificates.filter(function (c) { return mode === 'all' || c.featured; })
        .map(certificateCard).join('');
    }

    function showcase(groupId) {
      var group = groupsById[groupId];
      return group && group.instagram ? socialShowcase(group) : '';
    }

    var totals = { projects: data.projects.length, certificates: data.certificates.length };

    // ---------- Datos estructurados (JSON-LD) ----------
    function projectsJsonLd() {
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Proyectos de Arturo Cid Ruiz',
        url: SITE_URL + 'pages/proyectos.html',
        author: { '@id': SITE_URL + '#arturo' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: data.projects.length,
          itemListElement: data.projects.map(function (p, i) {
            return {
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'WebSite',
                name: p.title,
                url: p.url,
                description: p.description,
                keywords: (p.tags || []).join(', '),
                creator: { '@id': SITE_URL + '#arturo' }
              }
            };
          })
        }
      };
    }

    function certificatesJsonLd() {
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Certificados y reconocimientos de Arturo Cid Ruiz',
        url: SITE_URL + 'pages/certificados.html',
        about: { '@id': SITE_URL + '#arturo' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: data.certificates.length,
          itemListElement: data.certificates.map(function (c, i) {
            var category = (data.certificateCategories || {})[c.category] || {};
            return {
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'EducationalOccupationalCredential',
                name: c.title,
                credentialCategory: category.label || c.category,
                url: SITE_URL + c.file,
                recognizedBy: { '@type': 'Organization', name: c.issuer.split(' — ')[0] }
              }
            };
          })
        }
      };
    }

    return {
      projects: projects,
      certificates: certificates,
      showcase: showcase,
      totals: totals,
      projectsJsonLd: projectsJsonLd,
      certificatesJsonLd: certificatesJsonLd
    };
  }

  return { create: create, escapeHtml: escapeHtml, hostname: hostname, SITE_URL: SITE_URL };
});
