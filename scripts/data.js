/* ============================================
   PORTFOLIO - Arturo Cid Ruiz
   Contenido del sitio (fuente única de datos)

   Para agregar un proyecto, certificado o experiencia
   basta con añadir un objeto a la lista correspondiente.
   Las rutas de archivos son relativas a la raíz del sitio.
   ============================================ */

var PORTFOLIO_DATA = {

  // ---------- Proyectos ----------
  // Los proyectos con el mismo nombre/marca se agrupan con `group`.
  //
  // Campos de cada proyecto:
  //   title, url, group, kind (tipo de sitio)
  //   description  → qué es (1–2 frases)
  //   features     → lista "Qué hace" (opcional; si está vacía no se muestra)
  //   howItWorks   → pasos "Cómo funciona" (opcional; si está vacía no se muestra)
  //   tags         → tecnologías o tipo de proyecto
  //   image        → captura propia en assets/img/proyectos/ (opcional).
  //                  Si no hay, se genera una captura automática del sitio.
  //   repo         → enlace al código fuente (opcional)
  //   private      → true si el sitio requiere inicio de sesión
  //   featured     → true para mostrarlo en la página principal
  //
  //   pending      → true mientras falte completar la información (no se destaca)
  projectGroups: [
    {
      id: 'cuyox3',
      name: 'CuyoX3',
      icon: 'bi-stars',
      summary: 'Mi emprendimiento de diseño creativo y desarrollo web. Cada producto vive en su propio subdominio de cuyox3.com.',
      // Redes de la marca: se muestran en el encabezado del grupo y en la sección de Instagram
      instagram: { handle: '@cuyo_x3', url: 'https://www.instagram.com/cuyo_x3/' },
      reels: [
        'https://www.instagram.com/reel/DeS6wXkEqUk/',
        'https://www.instagram.com/reel/DeC_4PJjvhg/'
      ]
    },
    { id: 'corporativo-juridico', name: 'Corporativo Jurídico', icon: 'bi-bank', summary: 'Presencia web del corporativo jurídico y fiscal, en dos dominios.' },
    { id: 'maf', name: 'MAF / Mafrinsa', icon: 'bi-gear-wide-connected', summary: 'Sitios corporativos para empresas de automatización industrial e ingeniería.' },
    { id: 'clientes', name: 'Otros clientes', icon: 'bi-briefcase', summary: 'Sitios web desarrollados para negocios de distintos sectores.' },
    { id: 'python', name: 'Proyectos Python', icon: 'bi-filetype-py', summary: 'Proyectos personales con Python: procesamiento de audio, IA y APIs.' }
  ],

  projects: [
    // ----- CuyoX3 -----
    {
      title: 'CuyoX3',
      url: 'https://cuyox3.com/',
      group: 'cuyox3',
      kind: 'Sitio principal',
      description: 'Sitio principal de mi emprendimiento de diseño creativo y desarrollo web, con servicios web y soluciones tecnológicas personalizadas.',
      features: ['Presenta los servicios de diseño y desarrollo web', 'Reúne los productos de la marca en subdominios propios', 'Canal de contacto para nuevos clientes'],
      howItWorks: [],
      tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Backend'],
      featured: true
    },
    {
      title: 'CuyoX3 Dental',
      url: 'https://dental.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Plataforma',
      description: 'Proyecto de CuyoX3 para el sector dental.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Salud', 'Web']
    },
    {
      title: 'CuyoX3 Fiscal',
      url: 'https://fiscal.cuyox3.com/panel',
      group: 'cuyox3',
      kind: 'Panel privado',
      description: 'Panel de CuyoX3 para el área fiscal. Requiere inicio de sesión.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Panel', 'Fiscal'],
      private: true
    },
    {
      title: 'CuyoX3 Bots',
      url: 'https://bots.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Plataforma',
      description: 'Plataforma de bots de CuyoX3.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Bots', 'Automatización']
    },
    {
      title: 'MakerThing',
      url: 'https://makerthing.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Plataforma',
      description: 'MakerThing, proyecto maker de CuyoX3.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Maker']
    },
    {
      title: 'CuyoX3 Cursos',
      url: 'https://cursos.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Plataforma de cursos',
      description: 'Plataforma de cursos en línea de CuyoX3.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Educación', 'Cursos']
    },
    {
      title: 'NutriGym',
      url: 'https://nutrigym.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Plataforma',
      description: 'Proyecto de CuyoX3 enfocado en nutrición y entrenamiento.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Nutrición', 'Fitness']
    },
    {
      title: 'CuyoX3 Aseguradora',
      url: 'https://ase-guradora.cuyox3.com/acceso/?next=/',
      group: 'cuyox3',
      kind: 'Sistema privado',
      description: 'Sistema de CuyoX3 para el ramo asegurador. Requiere inicio de sesión.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Seguros', 'Sistema interno'],
      private: true
    },

    // ----- Corporativo Jurídico -----
    {
      title: 'Corporativo Jurídico',
      url: 'https://corporativojuridico.mx/',
      group: 'corporativo-juridico',
      kind: 'Sitio web',
      description: 'Sitio web del Corporativo Jurídico.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Legal']
    },
    {
      title: 'Corporativo Jurídico Fiscal',
      url: 'https://corporativojuridicofiscal.com.mx/',
      group: 'corporativo-juridico',
      kind: 'Sitio web',
      description: 'Sitio web del Corporativo Jurídico Fiscal.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Legal', 'Fiscal']
    },

    // ----- MAF / Mafrinsa -----
    {
      title: 'MAF Automation',
      url: 'https://mafautomation.com.mx/',
      group: 'maf',
      kind: 'Sitio corporativo',
      description: 'Sitio web corporativo para empresa de automatización industrial y soluciones tecnológicas.',
      features: ['Catálogo de servicios de automatización', 'Información corporativa de la empresa', 'Formulario de contacto para cotizaciones'],
      howItWorks: [],
      tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
      featured: true
    },
    {
      title: 'Mafrinsa',
      url: 'https://mafrinsa.com.mx/',
      repo: 'https://github.com/Cuyox3/Mafrinsa',
      group: 'maf',
      kind: 'Sitio corporativo',
      description: 'Sitio corporativo de MAFRINSA, empresa de automatización industrial. Presenta sus líneas de servicio, desde la programación de PLC y robots hasta la manufactura de piezas y el mantenimiento de maquinaria.',
      features: [
        'Programación de PLC, integración con SCADA y programación de robots industriales',
        'Manufactura y maquinados convencionales; maquinaria para automatizar procesos',
        'Refaccionamiento de equipo de control y neumático, y elementos mecánicos a medida',
        'Servicio de mantenimiento y formulario para cotizar proyectos'
      ],
      howItWorks: [
        'Aplicación de una sola página (SPA) hecha con React y TypeScript, compilada con Vite.',
        'React Router da a cada servicio su propia ruta: Manufactura, Maquinaria, Mantenimiento, Refacciones, Soportes, Nosotros y Contacto.',
        'El diseño usa Tailwind CSS y los iconos de Lucide.'
      ],
      tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router']
    },

    // ----- Otros clientes -----
    {
      title: 'Candylandia Store',
      url: 'https://candylandiastore.mx/',
      repo: 'https://github.com/Cuyox3/candylandyastore',
      group: 'clientes',
      kind: 'Tienda en línea',
      description: 'Tienda de dulces importados con catálogo administrable y pedidos por WhatsApp. Empezó como un sitio en HTML, CSS y JavaScript y la migré a una arquitectura con React y una API en FastAPI, para que el catálogo viva en una base de datos y los cambios del panel se publiquen al instante.',
      features: [
        'Catálogo de productos con categorías, etiquetas y fotos',
        'Botón «Lo quiero» que arma el pedido por WhatsApp',
        'Secciones de mayoreo, testimonios, preguntas frecuentes y boletín',
        'Panel de administración con inicio de sesión para gestionar productos, categorías, etiquetas e imágenes',
        'Exportación e importación del catálogo en Excel y PDF, y bandeja de mensajes de contacto'
      ],
      howItWorks: [
        'El frontend en React 18 + Vite se compila y lo sirve Nginx dentro de un contenedor.',
        'Una API en FastAPI (sobre Gunicorn) expone el catálogo y el panel; usa SQLAlchemy y Alembic sobre PostgreSQL.',
        'El panel se protege con tokens JWT y contraseñas cifradas con bcrypt; las fotos se procesan con Pillow.',
        'Todo corre con Docker Compose en un VPS, detrás de Nginx con HTTPS de Let\'s Encrypt, y se despliega con un solo script (deploy.sh).'
      ],
      tags: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Docker', 'Nginx'],
      featured: true
    },
    {
      title: 'AlfaKernel',
      url: 'https://alfakernel.com/',
      group: 'clientes',
      kind: 'Sitio web',
      description: 'Sitio web de AlfaKernel.',
      pending: true, // TODO: completar descripción, features y howItWorks
      features: [],
      howItWorks: [],
      tags: ['Tecnología']
    },
    {
      title: 'Inversión Inmobiliaria',
      url: 'https://inversioninmobiliaria.casa/',
      group: 'clientes',
      kind: 'Portal',
      description: 'Portal de inversión inmobiliaria con información de propiedades, oportunidades de inversión y asesoría personalizada.',
      features: ['Muestra propiedades y oportunidades de inversión', 'Asesoría personalizada para interesados'],
      howItWorks: [],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive']
    },
    {
      title: 'Empaques y Maquinados N',
      url: 'https://empaquesymaquinadosn.com/',
      group: 'clientes',
      kind: 'Sitio corporativo',
      description: 'Página web para empresa de empaques y maquinados industriales.',
      features: ['Catálogo de productos y servicios', 'Galería de trabajos realizados'],
      howItWorks: [],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'SEO']
    },
    {
      title: 'Data Proyectos',
      url: 'https://dataproyectos.mx/',
      group: 'clientes',
      kind: 'Sitio corporativo',
      description: 'Sitio de gestión de datos y proyectos tecnológicos con enfoque empresarial, centrado en la experiencia del usuario.',
      features: [],
      howItWorks: [],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive']
    },

    // ----- Proyectos Python -----
    {
      title: 'Conversión de voz',
      url: 'https://cuyox3.github.io/conversion/',
      repo: 'https://github.com/Cuyox3/conversion',
      group: 'python',
      kind: 'Aplicación web',
      description: 'Crea la voz de un usuario a partir de un audio y genera voz desde texto. El análisis de la voz está escrito en Python y corre dentro del navegador con Pyodide; la clonación neuronal la hace un servidor FastAPI con XTTS-v2.',
      features: [
        'Sube un audio o graba tu voz con el micrófono',
        'Perfil de voz: tono medio y rango, expresividad, velocidad al hablar y brillo del timbre, con gráfica del tono',
        'Varias voces por usuario, guardadas en el navegador',
        'Texto a voz adaptado a tu perfil, o clonación neuronal de tu timbre con descarga en WAV'
      ],
      howItWorks: [
        'Pyodide (CPython en WebAssembly) ejecuta el módulo de análisis con NumPy directamente en GitHub Pages; el audio no sale del equipo.',
        'El tono se estima con el algoritmo YIN cada 10 ms; la envolvente de energía da las sílabas por segundo y el centroide espectral el brillo.',
        'En modo navegador, el perfil elige la voz base y ajusta tono y velocidad de la Web Speech API.',
        'Un servidor opcional en FastAPI usa Coqui XTTS-v2 para hablar con el timbre del usuario; pruebas con pytest y despliegue con GitHub Actions.'
      ],
      tags: ['Python', 'NumPy', 'Pyodide', 'FastAPI', 'XTTS-v2', 'GitHub Pages'],
      featured: true
    }
  ],

  // ---------- Certificados y reconocimientos ----------
  // category: 'tecnico' | 'reconocimiento' | 'constancia'
  certificateCategories: {
    tecnico: { label: 'Técnicos', icon: 'bi-code-slash' },
    reconocimiento: { label: 'Reconocimientos', icon: 'bi-trophy' },
    constancia: { label: 'Constancias FGR', icon: 'bi-file-earmark-check' }
  },

  certificates: [
    // Técnicos
    { title: 'Fundamentos de programación Backend', issuer: 'IPN — Centro de Investigación en Computación', date: '2024', icon: 'bi-server', file: 'docs/certificados/backend-ipn-cic-2024.pdf', category: 'tecnico', featured: true },
    { title: 'Samsung Innovation Campus', issuer: 'Samsung — Generación 2023', date: '2024', icon: 'bi-lightbulb', file: 'docs/certificados/samsung-innovation-campus-2023.pdf', category: 'tecnico', featured: true },
    { title: 'Introducción a JavaScript y algoritmos', issuer: 'IEEE — Rama estudiantil IPN', date: '2023', icon: 'bi-filetype-js', file: 'docs/certificados/javascript-ieee-2023.pdf', category: 'tecnico', featured: true },
    { title: 'Arquitectura de Software Moderna', issuer: 'Udemy — DDD, eventos y microservicios', icon: 'bi-diagram-3', file: 'docs/certificados/arquitectura-software-moderna.pdf', category: 'tecnico', featured: true },
    { title: 'Master en SQL Server', issuer: 'Udemy — De cero a experto', icon: 'bi-database-fill-gear', file: 'docs/certificados/sql-server-experto.pdf', category: 'tecnico', featured: true },
    { title: 'Docker', issuer: 'Udemy — Contenedores y despliegue', icon: 'bi-box-seam', file: 'docs/certificados/docker.pdf', category: 'tecnico' },
    { title: 'AWS para desarrolladores web', issuer: 'Udemy — Curso básico de Amazon Web Services', icon: 'bi-cloud', file: 'docs/certificados/aws-desarrolladores-web.pdf', category: 'tecnico' },
    { title: 'Google Cloud Digital Leader', issuer: 'Udemy — Fundamentos de Google Cloud', icon: 'bi-cloud-fill', file: 'docs/certificados/google-cloud-digital-leader.pdf', category: 'tecnico' },
    { title: 'Redis', issuer: 'Udemy — Base de datos en memoria', icon: 'bi-database', file: 'docs/certificados/redis.pdf', category: 'tecnico' },
    { title: 'Linux', issuer: 'Udemy — Administración de sistemas', icon: 'bi-terminal', file: 'docs/certificados/linux.pdf', category: 'tecnico' },
    { title: 'IoT — Internet de las Cosas', issuer: 'Udemy', icon: 'bi-cpu', file: 'docs/certificados/iot.pdf', category: 'tecnico' },
    { title: 'Raspberry Pi & IoT', issuer: 'Udemy — Proyectos con Raspberry Pi', icon: 'bi-motherboard', file: 'docs/certificados/raspberry-pi-iot.pdf', category: 'tecnico' },

    // Reconocimientos
    { title: 'Líder de Desarrollo Institucional', issuer: 'JA México Alumni — Periodo 2024', date: '2024', icon: 'bi-people', file: 'docs/reconocimientos/ja-lider-desarrollo-institucional-2024.pdf', category: 'reconocimiento', featured: true },
    { title: 'Reconocimiento FGR', issuer: 'Fiscalía General de la República', date: 'Dic 2024', icon: 'bi-patch-check', file: 'docs/reconocimientos/fgr-reconocimiento-2024-12.pdf', category: 'reconocimiento' },
    { title: 'Estímulo por desempeño', issuer: 'Fiscalía General de la República', date: 'Jun 2025', icon: 'bi-gift', file: 'docs/reconocimientos/fgr-estimulo-2025-06.pdf', category: 'reconocimiento' },
    { title: 'Estímulo por desempeño', issuer: 'Fiscalía General de la República', date: 'Feb 2025', icon: 'bi-gift', file: 'docs/reconocimientos/fgr-estimulo-2025-02.jpeg', category: 'reconocimiento' },
    { title: 'Estímulo por desempeño', issuer: 'Fiscalía General de la República', date: 'Dic 2024', icon: 'bi-gift', file: 'docs/reconocimientos/fgr-estimulo-2024-12.jpeg', category: 'reconocimiento' },
    { title: 'Participación destacada — Red Alumni', issuer: 'JA México Alumni — Desarrollo Institucional', date: 'Dic 2023', icon: 'bi-star', file: 'docs/reconocimientos/ja-reconocimiento-alumni-2023.jpeg', category: 'reconocimiento' },
    { title: 'Yo Puedo Programar', issuer: 'Junior Achievement México · Dell Technologies', date: 'Nov 2023', icon: 'bi-code-square', file: 'docs/reconocimientos/ja-yo-puedo-programar-2023.pdf', category: 'reconocimiento' },
    { title: 'Educación financiera "Cuentas Contigo"', issuer: 'Junior Achievement México · Citibanamex', date: 'Nov 2023', icon: 'bi-piggy-bank', file: 'docs/reconocimientos/ja-educacion-financiera-2023.pdf', category: 'reconocimiento' },

    // Constancias FGR
    { title: 'Ciberseguridad', issuer: 'FGR — 20 horas', date: 'Jun 2025', icon: 'bi-shield-lock', file: 'docs/constancias/fgr-ciberseguridad.pdf', category: 'constancia' },
    { title: 'Sistema de Administración de Correspondencia', issuer: 'FGR — 4 horas', date: 'Jun 2025', icon: 'bi-envelope-paper', file: 'docs/constancias/fgr-sistema-administracion-correspondencia.pdf', category: 'constancia' },
    { title: 'Inglés avanzado', issuer: 'FGR — 40 horas', date: 'Mar 2025', icon: 'bi-translate', file: 'docs/constancias/fgr-ingles-avanzado.pdf', category: 'constancia' },
    { title: 'Inglés intermedio', issuer: 'FGR — 40 horas', date: 'Mar 2025', icon: 'bi-translate', file: 'docs/constancias/fgr-ingles-intermedio.pdf', category: 'constancia' },
    { title: 'Inglés básico', issuer: 'FGR — 40 horas', date: 'Mar 2025', icon: 'bi-translate', file: 'docs/constancias/fgr-ingles-basico.pdf', category: 'constancia' },
    { title: 'Burnout', issuer: 'FGR — 6 horas', date: 'Dic 2024', icon: 'bi-heart-pulse', file: 'docs/constancias/fgr-burnout.pdf', category: 'constancia' },
    { title: 'Trabajo en equipo', issuer: 'FGR — 12 horas', date: 'Nov 2024', icon: 'bi-people', file: 'docs/constancias/fgr-trabajo-en-equipo.pdf', category: 'constancia' },
    { title: 'Introducción a la Ley General de Archivos', issuer: 'FGR — 5 horas', date: 'Sep 2024', icon: 'bi-archive', file: 'docs/constancias/fgr-ley-general-de-archivos.pdf', category: 'constancia' },
    { title: 'Inducción a los derechos humanos', issuer: 'FGR — 4 horas', date: 'Jul 2024', icon: 'bi-journal-text', file: 'docs/constancias/fgr-induccion-derechos-humanos.pdf', category: 'constancia' },
    { title: 'Derechos humanos y tratados internacionales', issuer: 'FGR — 30 horas', date: 'Jul 2024', icon: 'bi-globe-americas', file: 'docs/constancias/fgr-derechos-humanos-tratados-internacionales.pdf', category: 'constancia' }
  ]
};
