#!/usr/bin/env node
/* ============================================
   PORTFOLIO - Pre-render para SEO

   Escribe dentro de los .html el contenido que normalmente pinta
   JavaScript (proyectos, certificados, reels, contadores y datos
   estructurados JSON-LD), tomando los datos de scripts/data.js.

   ¿Por qué? Google ejecuta JavaScript, pero tarda más en indexarlo, y
   otros buscadores y las vistas previas de LinkedIn/WhatsApp leen solo
   el HTML. Con esto el contenido está en el HTML desde el principio.

   Uso (requiere Node.js, sin dependencias):
     node tools/prerender.js          → actualiza los .html
     node tools/prerender.js --check  → solo verifica que estén al día

   Ejecútalo cada vez que edites scripts/data.js.
   ============================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const PAGES = ['index.html', 'pages/proyectos.html', 'pages/certificados.html'];
const checkOnly = process.argv.includes('--check');

// data.js declara `var PORTFOLIO_DATA`; se evalúa en un contexto aislado
const sandbox = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'scripts/data.js'), 'utf8'), sandbox);
const DATA = sandbox.PORTFOLIO_DATA;
const PortfolioRender = require(path.join(ROOT, 'scripts/render.js'));

function jsonForScript(obj) {
  // Evita que un "</script>" dentro de los datos cierre la etiqueta
  return '\n' + JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/') + '\n  ';
}

let outdated = [];

for (const page of PAGES) {
  const file = path.join(ROOT, page);
  const original = fs.readFileSync(file, 'utf8');
  const baseMatch = original.match(/<body[^>]*data-base="([^"]*)"/);
  const R = PortfolioRender.create(DATA, baseMatch ? baseMatch[1] : '');

  let html = original;

  // 1) Contenedores marcados con <!-- prerender:start --> … <!-- prerender:end -->
  html = html.replace(
    /(<[a-z]+[^>]*\bdata-(projects|certificates|social-showcase)="([^"]+)"[^>]*>)<!-- prerender:start -->[\s\S]*?<!-- prerender:end -->/g,
    (all, openTag, kind, value) => {
      const inner = kind === 'projects' ? R.projects(value)
        : kind === 'certificates' ? R.certificates(value)
        : R.showcase(value);
      return openTag + '<!-- prerender:start -->' + inner + '<!-- prerender:end -->';
    }
  );

  // 2) Contadores: <span data-count="projects">N</span>
  html = html.replace(
    /(<span[^>]*\bdata-count="(projects|certificates)"[^>]*>)[^<]*(<\/span>)/g,
    (all, openTag, key, close) => openTag + R.totals[key] + close
  );

  // 3) Datos estructurados generados desde data.js
  html = html.replace(
    /(<script type="application\/ld\+json" data-prerender="(projects|certificates)">)[\s\S]*?(<\/script>)/g,
    (all, openTag, key, close) =>
      openTag + jsonForScript(key === 'projects' ? R.projectsJsonLd() : R.certificatesJsonLd()) + close
  );

  if (html !== original) {
    outdated.push(page);
    if (!checkOnly) fs.writeFileSync(file, html);
  }
}

if (checkOnly) {
  if (outdated.length) {
    console.error('HTML desactualizado, ejecuta: node tools/prerender.js\n  ' + outdated.join('\n  '));
    process.exit(1);
  }
  console.log('Todo al día.');
} else {
  console.log(outdated.length ? 'Actualizado:\n  ' + outdated.join('\n  ') : 'Sin cambios.');
}
