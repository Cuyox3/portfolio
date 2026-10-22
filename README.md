# Portafolio · Arturo Cid Ruiz

Sitio estático publicado con GitHub Pages en **https://cuyox3.github.io/portfolio/**.
No necesita compilación: HTML, CSS y JavaScript sin frameworks (Bootstrap 5 desde CDN).

## Estructura

```
index.html                 Portada (hero, sobre mí, habilidades, trayectoria, proyectos, certificados, contacto)
pages/proyectos.html       Todos los proyectos, agrupados por marca
pages/certificados.html    Todos los certificados, con filtros
scripts/data.js            ← Fuente única de proyectos, grupos y certificados
scripts/render.js          Genera el HTML de las tarjetas (navegador y pre-render)
scripts/main.js            Interacciones: navegación, filtros, visor de PDF, formulario
scripts/effects.js         Efectos visuales y paleta de comandos (Ctrl/⌘ + K)
styles/main.css            Estilos base
styles/effects.css         Estilos de los efectos
tools/prerender.js         Escribe el contenido de data.js dentro de los .html (SEO)
docs/                      CV, certificados, reconocimientos y constancias
assets/img/                Foto, imagen para redes (og-image.jpg) e íconos
sitemap.xml, robots.txt    Para buscadores
```

## Agregar o editar un proyecto o certificado

1. Edita `scripts/data.js` (cada campo está explicado en el propio archivo).
2. Ejecuta `node tools/prerender.js` para actualizar los `.html`.
3. Si cambió el contenido, actualiza `<lastmod>` en `sitemap.xml`.

`node tools/prerender.js --check` solo verifica que los `.html` estén al día.

## Formulario de contacto

Envía los mensajes con [FormSubmit](https://formsubmit.co) a la dirección de `data-email`
en el `<form id="contactForm">` de `index.html`. El primer envío manda un correo de
activación a esa dirección: hay que confirmarlo una vez. Si el envío falla, el sitio abre
el cliente de correo del visitante con el mensaje ya escrito.
