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
      description: 'Sitio principal de mi emprendimiento: chatbots, software, páginas web, impresión 3D y electrónica a medida para pymes y emprendedores, con un solo socio tecnológico.',
      features: [
        'Presenta seis bloques de servicios: chatbots, software y plataformas, diseño e impresión 3D, electrónica e IoT, diseño UX/UI e infraestructura',
        'Paquetes de chatbot (Esencial, Profesional y Avanzado) que se cotizan directo por WhatsApp',
        'Demostración animada de CuyoBot atendiendo preguntas frecuentes, citas y ventas',
        'Sectores atendidos, proceso de trabajo, preguntas frecuentes y contacto por WhatsApp, correo y redes'
      ],
      howItWorks: [
        'Aplicación de una sola página en React compilada con Vite, con navegación por secciones.',
        'Cada botón de paquete abre WhatsApp con un mensaje ya redactado para ese plan.',
        'Enlaza los productos de la marca, que viven en subdominios de cuyox3.com.'
      ],
      tags: ['React', 'Vite', 'Chatbots', 'IoT', 'Impresión 3D'],
      featured: true
    },
    {
      title: 'Bacidental',
      url: 'https://dental.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Software dental',
      description: 'Software de gestión para consultorios dentales: pacientes, agenda, tratamientos, recetas e inventario de todas las sucursales en un solo lugar, sin renta por sucursal y con los expedientes en el servidor del propio dentista.',
      features: [
        'Pacientes, agenda del día, tratamientos, recetas e inventario con aviso de insumos bajo mínimo',
        'Sucursales ilimitadas en una sola cuenta, sin licencia extra por consultorio',
        'Expediente clínico conforme a NOM-004, NOM-013 y NOM-024: notas firmadas, odontograma interactivo y bitácora de consultas',
        'Tablero de cumplimiento de ocho normas oficiales, con control de RPBI, esterilización y el informe mensual de la NOM-035',
        'Consentimiento informado firmado en pantalla',
        'Rol de asistente que agenda y registra sin poder borrar ni administrar usuarios',
        'Calculadora que compara el costo contra el software dental de renta mensual'
      ],
      howItWorks: [
        'Frontend en React con registro, inicio de sesión, recuperación de contraseña y guía de uso.',
        'Se instala con Docker en el servidor que elija el consultorio, así que la base de datos es del dentista.',
        'Cada dentista solo ve sus expedientes; 85 pruebas automatizadas verifican ese aislamiento en cada cambio.',
        'Las notas firmadas llevan una huella digital que delata cualquier cambio y no se pueden borrar durante los cinco años de conservación.'
      ],
      tags: ['React', 'Docker', 'Salud', 'NOM-004', 'Multi-sucursal', 'Pruebas automatizadas']
    },
    {
      title: 'Crítico Fiscal',
      url: 'https://fiscal.cuyox3.com/panel',
      group: 'cuyox3',
      kind: 'Buscador legal',
      description: 'Buscador de sentencias fiscales favorables al contribuyente en México, con las leyes fiscales artículo por artículo, la lista 69-B del SAT, el DOF y un asistente de IA que responde solo con los documentos indexados.',
      features: [
        'Sentencias del TFJA, la SCJN y criterios de PRODECON, clasificadas como ganadoras o no con síntesis y el argumento determinante',
        'Leyes fiscales vigentes (CFF, LISR, LIVA, LIEPS y más) por artículo, con la jurisprudencia relacionada en cada uno',
        'Contribuyentes publicados por el SAT en el artículo 69-B (EFOS) y si tienen sentencia favorable',
        'Publicaciones del DOF de interés fiscal',
        'Asistente de IA que consulta todo el corpus o un archivo específico sin inventar',
        'Panel con estadísticas por fuente y por autoridad',
        'Actualización por fuente, rango de fechas y palabras clave fiscales, con progreso en vivo'
      ],
      howItWorks: [
        'Backend en Django con una API REST; el frontend es una aplicación en React compilada con Vite.',
        'Scrapers en Python recorren TFJA, SCJN, PRODECON, DOF y SAT en segundo plano y guardan solo lo nuevo.',
        'La recolección puede programarse a diario con un comando de Django (cron o Celery beat).',
        'El texto de las leyes viene de la Cámara de Diputados y cada sentencia se liga a los artículos que cita.'
      ],
      tags: ['Python', 'Django', 'React', 'Web scraping', 'IA', 'Derecho fiscal']
    },
    {
      title: 'CuiBot',
      url: 'https://bots.cuyox3.com/',
      group: 'cuyox3',
      kind: 'SaaS',
      description: 'Plataforma para automatizar WhatsApp con IA: respuestas fijas para preguntas frecuentes y, cuando la conversación se sale del guion, respuestas de Gemini con el contexto del negocio. Todo se configura desde un panel, sin código.',
      features: [
        'Preguntas y respuestas con coincidencia exacta, parcial o por expresión regular',
        'Respuestas con IA de Gemini acotadas por el contexto de cada pregunta (catálogo, precios, tono, reglas)',
        'Editor de flujos en diagrama: mensajes, preguntas con captura, respuestas con IA y saltos entre flujos',
        'Bandeja de conversaciones para contestar a mano desde el panel',
        'Mensajes programados y masivos a contactos, etiquetas o grupos',
        'Contactos con etiquetas y lista de bloqueo, bitácora y métricas de uso',
        'API abierta para enviar mensajes desde un CRM o tienda, y planes mensuales sin cobro por mensaje'
      ],
      howItWorks: [
        'El número se vincula una sola vez escaneando un código QR; la sesión de WhatsApp se guarda en el servidor.',
        'Corre sobre el número propio del negocio, sin pagar por conversación de la API oficial.',
        'El panel en React guarda la configuración y el bot la recarga al instante.',
        'Lo crítico se responde con texto fijo y lo abierto con IA; todo queda registrado en la bitácora.'
      ],
      tags: ['WhatsApp', 'Gemini', 'IA', 'Automatización', 'React', 'SaaS']
    },
    {
      title: 'Maker Things',
      url: 'https://makerthing.cuyox3.com/',
      group: 'cuyox3',
      kind: 'SaaS',
      description: 'Plataforma para publicar en TikTok, Instagram, Facebook y YouTube desde un solo editor y comparar el rendimiento de la misma publicación en cada red, en una sola pantalla.',
      features: [
        'Editor común con texto propio por red cuando hace falta, validado contra los límites de cada plataforma',
        'Programación de publicaciones con reintentos automáticos y traza de cada intento',
        'Métricas unificadas: la misma pieza de contenido con sus números lado a lado en cada red',
        'Grupos de acceso para que cada persona del equipo o cliente vea solo sus cuentas',
        'Herramientas: generador de PNG a medida por red, zonas seguras de verticales, verificador de contraste WCAG y extractor de paleta',
        'Quitar metadatos (GPS, fechas) de fotos y videos sin recomprimir, y leer la procedencia de archivos generados con IA (C2PA)'
      ],
      howItWorks: [
        'Cada red se conecta por su API oficial con OAuth de Meta, TikTok y Google; los tokens se guardan cifrados y se renuevan solos.',
        'Usa la programación nativa de cada red cuando existe y un planificador propio cuando no.',
        'Traduce las métricas de cada plataforma a un vocabulario común para poder compararlas.',
        'Frontend en React con registro, panel y páginas legales para la revisión de las apps de cada red.'
      ],
      tags: ['React', 'APIs oficiales', 'OAuth', 'Redes sociales', 'Métricas']
    },
    {
      title: 'LopezVilla Capacitación',
      url: 'https://cursos.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Plataforma de cursos',
      description: 'Sitio y plataforma de capacitación en línea para un despacho jurídico-fiscal: presenta la firma y sus áreas de práctica, y vende cursos, webinars y conferencias para abogados fiscalistas.',
      features: [
        'Sitio de la firma: equipo, áreas de práctica, oficinas, noticias y contacto',
        'Catálogo de cursos por especialidad, con calificaciones, precios y ofertas',
        'Agenda de eventos: webinars y conferencias presenciales o en vivo',
        'Boletín de actualizaciones legales',
        'Acceso para miembros con inicio de sesión'
      ],
      howItWorks: [
        'Aplicación en React compilada con Vite que consume una API REST de cursos, categorías, avisos y contenido.',
        'Todo el contenido de la portada (textos, equipo, oficinas, noticias, eventos) se administra desde el backend, sin tocar código.',
        'El contenido actual es de demostración.'
      ],
      tags: ['React', 'Vite', 'API REST', 'E-learning', 'CMS']
    },
    {
      title: 'NutriGym',
      url: 'https://nutrigym.cuyox3.com/',
      group: 'cuyox3',
      kind: 'App web',
      description: 'Panel de progreso de nutrición y entrenamiento con atlas muscular en 3D y un coach de IA que analiza los registros de la semana.',
      features: [
        'Panel semanal: sueño, calorías, proteína y minutos entrenados frente a sus objetivos, con gráficas de evolución y racha',
        'Diario donde se sube la foto del plato o la captura del reloj y la IA rellena el registro',
        'Atlas muscular 3D para explorar cada grupo muscular y cómo entrenarlo',
        'Esqueleto articulado que muestra las fases concéntrica, excéntrica e isométrica del movimiento',
        'Coach de IA: Gemini revisa los últimos 7 registros y devuelve un plan concreto, y responde preguntas'
      ],
      howItWorks: [
        'Modelos anatómicos 3D renderizados con Three.js (GLTF, controles orbitales y posprocesado), basados en BodyParts3D y Z-Anatomy.',
        'Los registros diarios se guardan por API y alimentan las gráficas del panel.',
        'Gemini lee las fotos y las capturas para proponer las cantidades del registro.'
      ],
      tags: ['Three.js', 'WebGL', 'Gemini', 'IA', 'Fitness', 'Nutrición']
    },
    {
      title: 'Sistema de siniestros',
      url: 'https://ase-guradora.cuyox3.com/acceso/?next=/',
      group: 'cuyox3',
      kind: 'Sistema privado',
      description: 'Sistema interno para registrar y dar seguimiento a reportes de siniestros de una aseguradora. El acceso lo da el administrador; sin credenciales solo se ve la pantalla de inicio de sesión.',
      features: [],
      howItWorks: [],
      tags: ['Seguros', 'Sistema interno'],
      private: true
    },
    {
      title: 'Orcofi',
      url: 'https://orcofi.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Oficina virtual',
      description: 'Oficina virtual para despachos de derecho fiscal mexicano con un equipo de agentes de IA que estudia cada asunto junto con el abogado. Requiere inicio de sesión.',
      features: [
        'Expedientes (asuntos) y clientes con plazos, tareas en tablero, faltantes por pedir y línea de tiempo de actos',
        'Agentes de IA configurables: profesión, modelo y proveedor, criticidad, skills y leyes que pueden consultar',
        'Biblioteca de leyes (CFF, LFPCA y más) dividida por artículo, con búsqueda, subrayados y citas verificadas',
        'Sala de juntas donde varios agentes opinan, se critican y un moderador sintetiza; dictámenes e informes descargables',
        'Simulación de juicio ante el Tribunal con magistrado, partes y perito para preparar el caso',
        'Calendario de vencimientos con cálculo de plazos del CFF y avisos por correo',
        'Portal público para que el cliente vea el avance de su asunto sin usuario ni contraseña'
      ],
      howItWorks: [
        'Aplicación de una sola página en React, compilada con Vite y con rutas de React Router.',
        'Una API REST protegida con sesión y token CSRF guarda despachos, miembros, asuntos, clientes y documentos.',
        'Los documentos se indexan por fragmentos para que los agentes citen solo lo que está en la biblioteca y cada cita se pueda abrir.',
        'La oficina se actualiza en vivo por WebSockets: las respuestas de los agentes llegan mientras se generan.',
        'Cada despacho elige su proveedor y modelo de IA con su propia llave y ve el consumo de tokens y su costo.'
      ],
      tags: ['React', 'Vite', 'IA multiagente', 'WebSockets', 'API REST', 'Derecho fiscal'],
      private: true,
      featured: true
    },
    {
      title: 'Alineación y Balanceo Cruzer',
      url: 'https://taller.cuyox3.com/',
      group: 'cuyox3',
      kind: 'Sitio + tienda + panel',
      description: 'Sitio, tienda en línea y sistema de gestión para un taller de alineación, balanceo, llantas y suspensión en Tlalnepantla. Es una demostración: productos, precios y pagos son de prueba.',
      features: [
        'Página del taller con servicios, horario, ubicación, testimonios y formulario de contacto',
        'Agenda de citas en línea con horarios disponibles según el servicio y la capacidad del taller',
        'Tienda con buscador de llantas por medida (ancho, perfil y rin), carrito y pago con tarjeta, OXXO o transferencia',
        'Compra de llantas con instalación agendada en el mismo paso, y cuenta del cliente para seguir pedidos y citas',
        'Panel del taller: tablero con ventas y stock bajo, pedidos, citas, mensajes, usuarios y configuración',
        'Inventario con etiquetas QR imprimibles, escáner con la cámara, conteo físico, importación CSV e historial de movimientos',
        'Gestión de la tienda: ofertas, cupones, banners, envíos y catálogos de categorías, marcas y proveedores'
      ],
      howItWorks: [
        'Frontend en React con Vite, React Router y componentes con Tailwind CSS; las páginas se cargan bajo demanda.',
        'Los datos se piden a una API REST (/api/v1) con caché de consultas, y los formularios se validan con Zod.',
        'La agenda calcula los horarios libres con el horario semanal, la duración de cada turno y la capacidad por turno.',
        'Pagos preparados para Mercado Pago y Stripe; en la demostración se usa una pantalla de pago simulado.',
        'El panel grafica las métricas con Recharts y lee las etiquetas QR con la cámara del teléfono; se sirve detrás de Nginx.'
      ],
      tags: ['React', 'Vite', 'Tailwind CSS', 'E-commerce', 'Inventario QR', 'Citas en línea'],
      featured: true
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
      kind: 'Sitio + herramientas',
      description: 'Sitio corporativo de MAF Automation, empresa de automatización industrial y desarrollo de maquinaria, con catálogo de equipos y un panel de herramientas internas para cotizar y organizar el taller.',
      features: [
        'Servicios de maquinaria personalizada, automatización de procesos e integración de sistemas',
        'Industrias atendidas: alimenticia, automotriz, farmacéutica, cartonera y de empaquetado',
        'Catálogo de equipos administrable desde un panel privado',
        'Calculadora de corte láser que suma la ganancia y manda la partida al cotizador',
        'Generador de cotizaciones y de remisiones en PDF',
        'Órdenes de trabajo que los trabajadores actualizan desde el celular'
      ],
      howItWorks: [
        'Aplicación en React compilada con Vite; el catálogo se carga desde una API de productos.',
        'Un panel de administración con acceso privado da de alta los equipos del catálogo.',
        'Las herramientas generan los documentos en PDF directamente en el navegador.'
      ],
      tags: ['React', 'Vite', 'API REST', 'PDF', 'Automatización industrial'],
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
      kind: 'Portal inmobiliario',
      description: 'Portal inmobiliario de la CDMX para comprar, vender y rentar casas, departamentos, terrenos y locales, donde los propietarios publican sus inmuebles y los asesores venden el inventario de la casa.',
      features: [
        'Búsqueda por operación, tipo de inmueble y zona, con fichas que incluyen fotos, ficha técnica en PDF y contacto por WhatsApp',
        'Publicación de propiedades: gratis hasta 2, y planes de membresía con más cupo y anuncios destacados',
        'Programa de socios: catálogo de la casa con comisiones, fotos en ZIP, ficha PDF y mensaje listo para WhatsApp',
        'Cartera de clientes y agenda de visitas con la ruta del día armada',
        'Servicios: administración de inmuebles, avalúos, escrituración y gestión de crédito hipotecario',
        'Blog, manual de uso y formulario para que un asesor contacte al interesado'
      ],
      howItWorks: [
        'Sitio renderizado en el servidor con páginas por tipo y operación, y URLs legibles para cada propiedad.',
        'Cuentas de usuario y de socio con distintos permisos sobre el inventario.',
        'Los planes se contratan y se pagan desde el mismo portal; la interfaz usa Bootstrap.'
      ],
      tags: ['Portal inmobiliario', 'Membresías', 'Bootstrap', 'SEO', 'WhatsApp']
    },
    {
      title: 'Empaques y Maquinados N',
      url: 'https://empaquesymaquinadosn.com/',
      group: 'clientes',
      kind: 'Sitio corporativo',
      description: 'Sitio de Empaques y Maquinados Nacionales, empresa mexicana que fabrica piezas de polímeros a partir de plano o muestra, con materiales certificados por la FDA para empaques de silicón.',
      features: [
        'Catálogo de productos: estruidos, empaques tipo clamp, O-rings, retenes, sellos, chupones, cintas, bridas y rodillos',
        'Maquinados en nylamid, teflón, acetal y acero, y muebles industriales',
        'Servicios de diseño de empaquetadura, asesoría técnica y toma de medidas en sitio',
        'Página de materiales y contacto directo por WhatsApp'
      ],
      howItWorks: [
        'Sitio estático en HTML, CSS y JavaScript con Bootstrap, una página por sección.',
        'El botón de WhatsApp abre la conversación con un mensaje ya iniciado.'
      ],
      tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Industrial']
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
      url: 'https://cuyox3.github.io/conversation/',
      repo: 'https://github.com/Cuyox3/conversation',
      group: 'python',
      kind: 'Aplicación web',
      description: 'Clonación de voz, texto a voz y cambiador de voz inspirados en ElevenLabs y Resemble AI. El procesamiento de voz está escrito en Python y corre dentro del navegador con Pyodide; la clonación neuronal la hace un servidor FastAPI con XTTS-v2 o Chatterbox.',
      features: [
        'Crea la voz de un usuario subiendo o grabando un audio, con revisión de calidad y consentimiento',
        'Diseña voces por parámetros sin grabar nada',
        'Texto a voz en el navegador o con clonación neuronal (XTTS-v2 o Chatterbox con control de emoción)',
        'Cambiador de voz: convierte una grabación al tono y timbre de otra voz',
        'Marca de agua inaudible en todo el audio generado y verificador para detectarla'
      ],
      howItWorks: [
        'Pyodide (CPython en WebAssembly) ejecuta los módulos de NumPy directamente en GitHub Pages; el audio no sale del equipo.',
        'El tono se estima con el algoritmo YIN; el cambiador usa un vocoder de fase y el cepstrum para mover tono y formantes por separado.',
        'La marca de agua es ruido de espectro ensanchado 30 dB bajo la voz, detectado por correlación.',
        'Un servidor FastAPI opcional clona el timbre con XTTS-v2 o Chatterbox y divide textos largos en oraciones; pruebas con pytest y despliegue con GitHub Actions.'
      ],
      tags: ['Python', 'NumPy', 'Pyodide', 'FastAPI', 'XTTS-v2', 'Chatterbox', 'GitHub Pages'],
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
