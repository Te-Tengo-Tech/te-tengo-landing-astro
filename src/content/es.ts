/**
 * Every visible string of the site, in Spanish (Peru).
 *
 * Rules (AGENTS.md): every product claim comes from a source document, named in the comment next
 * to it. Do not add numbers, testimonials, logos or user counts without a source. To add English
 * later, create `en.ts` with the same shape (`typeof es`) and pick the file per route.
 *
 * Sources used below:
 *   [PROTO]  te-tengo-mobile-flutter/docs/references/prototype/prototipo.html (screen copy)
 *   [PROD]   te-tengo-mobile-flutter/docs/references/PRODUCT.md
 *   [BACK]   te-tengo-mobile-flutter/docs/references/PRODUCT_BACKLOG.md
 *   [ADR7]   te-tengo-desktop-pywebview/docs/adr/0007-processing-on-household-pc.md
 *   [VAL]    te-tengo-desktop-pywebview/docs/validation.md
 *   [DESK]   te-tengo-desktop-pywebview README/CHANGELOG (live view modes, offline outbox)
 *   [CHART]  Alba-docs/01-project-charter (PLANTEAMIENTO_PROBLEMA, RECURSOS_REQUERIDOS, REFERENCIAS)
 *   [DESC]   te-tengo-descargas README (install steps)
 *   [BRAND]  Alba-docs/05-prototipos/marca/README.md (embracing-figures kit)
 *   [APP]    Alba-docs/05-prototipos/app-movil/PRODUCT.md and DESIGN.md (current mobile prototype;
 *            its screens in src/assets/screens/ are exports of app-movil/pantallas/)
 *   [DESKP]  Alba-docs/05-prototipos/app-escritorio/PRODUCT.md (Te Tengo Captura prototype)
 *   [FOTOS]  Alba-docs/05-prototipos/app-movil/fotos/CREDITOS.md (Pexels photos and their authors)
 *   [PWA]    te-tengo-mobile-flutter/docs/WEB_PWA.md (iPhone install steps, iOS 16.4 push)
 *   [APPLE]  Apple, Mac User Guide, “Open a Mac app from an unknown developer” (mh40616):
 *            https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unknown-developer-mh40616/mac
 *            (Spanish UI names from https://support.apple.com/es-mx/guide/mac-help/mh40616/mac),
 *            read 2026-10-08. Mac install steps, paraphrased.
 */

export const es = {
  meta: {
    title: "Te Tengo · Cuida a tu familiar aunque no estés en casa",
    description:
      "Te Tengo reconoce caídas y movimientos inestables de tu familiar con una webcam en su casa y te avisa al instante en tu celular. Solo postura, nunca rostros: el video se procesa en la PC de la casa.",
    ogAlt: "Te Tengo. Cuida a tu familiar aunque no estés en casa.",
  },

  a11y: {
    skip: "Saltar al contenido",
    menu: "Menú",
    closeMenu: "Cerrar el menú",
    home: "Te Tengo, inicio",
    external: "(se abre en otra pestaña)",
    mainNav: "Principal",
    footerNav: "Pie de página",
    source: "Fuente:",
    close: "Cerrar",
  },

  nav: [
    { href: "/#como-funciona", label: "Cómo funciona" },
    { href: "/#funciones", label: "Funciones" },
    { href: "/#privacidad", label: "Privacidad" },
    { href: "/#preguntas", label: "Preguntas" },
  ],
  navCta: "Descargar",

  // [PROTO] bienvenida; [APP] Positioning; [FOTOS] bienvenida.jpg
  hero: {
    title: "Cuida a tu familiar aunque no estés en casa.",
    lead: "Una webcam en su casa reconoce caídas por la postura del cuerpo y te avisa al instante en tu celular.",
    primary: "Descargar la app",
    secondary: "Ver cómo funciona",
    points: [
      { icon: "user", text: "Sin pulseras ni botones" },
      { icon: "shield", text: "Solo postura, nunca rostros" },
      { icon: "lock", text: "Ley N.⁠° 29733" },
    ],
    photoAlt: "Una joven abraza por la espalda a su madre, las dos con los ojos cerrados.",
    phoneAlt:
      "Inicio de la app Te Tengo: Rosa Huamán, 78 años, «Todo tranquilo», 4 cámaras cuidando y sin eventos hoy.",
    example: "Ejemplo",
    project: "Proyecto de tesis de la UPC",
  },

  // [CHART] PLANTEAMIENTO_PROBLEMA.md and REFERENCIAS.md
  problem: {
    title: "Una caída en casa, y nadie cerca para ayudar.",
    lead: "Las alarmas personales esperan que la persona pida ayuda después de caer. La evidencia muestra que rara vez lo hace.",
    facts: [
      {
        value: "38,4 %",
        text: "de las personas de 70 años o más en el Perú vive sola o solo con otra persona de esa edad.",
        source: "INEI, 2018",
        href: "https://www.inei.gob.pe/media/MenuRecursivo/publicaciones_digitales/Est/Lib1577/Libro01.pdf",
      },
      {
        value: "80 %",
        text: "de las personas mayores de 90 años que tenían una alarma personal no la activó tras caer estando sola, en un estudio en el Reino Unido.",
        source: "Fleming y Brayne, BMJ, 2008",
        href: "https://doi.org/10.1136/bmj.a2227",
      },
      {
        value: "16,8 %",
        text: "de los peruanos de 60 años o más no usa teléfono celular.",
        source: "INEI, 2025",
        href: "https://www1.inei.gob.pe/media/MenuRecursivo/boletines/informe-tecnico_tics_oct-nov-dic24.pdf",
      },
    ],
    close:
      "Te Tengo no espera a que tu familiar pida ayuda: la cámara reconoce la caída y la familia recibe el aviso.",
  },

  // [APP] Product Purpose, Operating Context (the titular links each PC with a QR code and picks the
  // cameras from the phone, decided 2026-10-10); [DESKP] screen 10; [ADR7]
  how: {
    title: "Así funciona",
    lead: "Tres pasos. Tu familiar no tiene que hacer nada.",
    steps: [
      {
        icon: "cam",
        title: "Conecta una webcam",
        text: "A la PC de la casa, con Te Tengo Captura instalado. Una por habitación, nunca en el baño.",
      },
      {
        icon: "qr",
        title: "Vincula la PC con tu celular",
        text: "Escanea el código QR que muestra la PC y elige qué cámara cuida cada habitación.",
      },
      {
        icon: "bell",
        title: "Te avisamos al instante",
        text: "La PC reconoce caídas y movimientos inestables por la postura, y toda la familia recibe la alerta.",
      },
    ],
    captureAlt:
      "Te Tengo Captura en la PC: «Vincula esta PC con tu celular», con un código QR y un código de 8 letras para escribir en la app.",
    notes: ["El video se procesa en la PC de la casa", "Varias cámaras y varias PCs por casa"],
    example: "Ejemplo",
  },

  // [APP] Capabilities, Users, «Varias cámaras a la vez, favoritas, widget»; [BACK]
  features: {
    title: "Lo que necesitas cuando importa",
    lead: "Pantallas de la app, con nombres y horas de ejemplo.",
    alert: {
      title: "Una alerta que se entiende en dos segundos",
      text: "Qué pasó, dónde y cuándo, con un botón para llamar. Si nadie la atiende a tiempo, avisamos al siguiente familiar.",
      points: [
        "Caída y movimiento inestable, cada uno con su color",
        "Clip de 6 s antes y 6 s después del evento",
        "«Rosa se levantó»: te avisamos si se pone de pie",
      ],
      alt: "Alerta de caída a pantalla completa: «Rosa pudo haberse caído», Sala, 10:42, con «Llamar a Rosa» y «Ver en vivo».",
    },
    live: {
      title: "En vivo, una cámara o todas a la vez",
      text: "Abre cualquier habitación cuando lo necesites, o «Ver todas»: hasta 4 por pantalla. No se graba y cada acceso queda registrado.",
      alt: "«Ver todas» en horizontal: Sala, Dormitorio, Pasillo y Cocina en vivo, dibujadas como ilustraciones.",
    },
    more: [
      {
        key: "replay",
        icon: "replay",
        title: "Ver qué pasó",
        text: "Retrocede en la línea de tiempo y mira la postura antes y después de un evento.",
        alt: "Detalle de la cámara de la Sala: la postura de una persona en el suelo a las 10:41 y la línea de tiempo con los eventos.",
      },
      {
        key: "family",
        icon: "users",
        title: "Cada familiar con su papel",
        text: "Todos reciben cada alerta. Tú eliges el contacto principal, el secundario y cuánto esperar.",
        alt: "Familia: Carmen Huamán, principal; Luis Huamán, secundario; Milagros Quispe, invitación pendiente.",
      },
      {
        key: "widget",
        icon: "home2",
        title: "Tranquilidad de un vistazo",
        text: "Un widget en la pantalla de inicio de tu celular te dice si todo está tranquilo.",
        alt: "Pantalla de inicio de un celular con el widget de Te Tengo: «Todo tranquilo», 4 cámaras, y «Ver en vivo».",
      },
    ],
  },

  // [APP] Positioning, Principles, Capabilities; [ADR7]; [BACK] US-05, US-09, US-24; [VAL]
  // Clips of alerts are kept 30 days (owner's decision, 2026-10-11).
  privacy: {
    title: "Cuidar, no vigilar.",
    lead: "Te Tengo no es una cámara de seguridad: está para llegar a tiempo, no para mirar.",
    items: [
      {
        icon: "shield",
        title: "Solo postura, nunca rostros",
        text: "La detección usa los puntos del cuerpo. Sin reconocimiento facial ni diagnósticos médicos.",
      },
      {
        icon: "pc",
        title: "El video se procesa en casa",
        text: "Lo analiza la PC de la casa. Solo salen el clip de cada alerta y la vista en vivo cuando alguien la abre.",
      },
      {
        icon: "eye",
        title: "En vivo no se graba",
        text: "Cada acceso queda en un registro que ve toda la familia: quién miró, cuándo y cuánto.",
      },
      {
        icon: "doc",
        title: "Nada sin su consentimiento",
        text: "Sin su permiso no se envía video. Si lo retira, se detiene la captura y se borran sus grabaciones.",
      },
      {
        icon: "lock",
        title: "Ley N.⁠° 29733",
        text: "Consentimiento registrado con fecha y hora. Los clips de las alertas se guardan 30 días.",
      },
    ],
    phoneAlt:
      "Registro de accesos: «Vista en vivo · Sala», Carmen a las 10:42 durante 1 min 12 s y Luis a las 08:15 durante 2 min 5 s.",
    example: "Ejemplo",
    validation: {
      title: "Probado con videos públicos",
      text: "170 videos de URFD y CAUCAFall, dejando un grupo fuera en cada prueba.",
      metrics: [
        { value: "81,2 %", label: "Sensibilidad", text: "de las caídas fueron detectadas." },
        { value: "81,1 %", label: "Especificidad", text: "de las actividades cotidianas no dieron alarma." },
      ],
      limits:
        "Son videos con actores, sin adultos mayores ni caídas reales. Acostarse en el suelo a propósito, recoger un objeto o arrodillarse pueden dar una falsa alarma.",
      link: "Cómo lo medimos",
    },
  },

  // [APP] Users (titular, invited relatives, contacts); [FOTOS] the photos stand for the demo people
  audience: {
    title: "Para la familia que cuida",
    lead: "Cada uno con un papel claro. Nadie tiene que volverse técnico.",
    people: [
      {
        photo: "rosa",
        name: "Rosa, 78 años",
        who: "Adulto mayor",
        text: "No tiene que hacer nada: sin pulseras ni botones. Da su consentimiento y puede retirarlo cuando quiera.",
        alt: "Una mujer mayor sonríe al sol, al aire libre.",
      },
      {
        photo: "carmen",
        name: "Carmen, hija",
        who: "Titular",
        text: "Crea la cuenta, vincula la PC, elige las cámaras e invita a la familia.",
        alt: "Retrato de una mujer adulta que sonríe.",
      },
      {
        photo: "luis",
        name: "Luis, hijo",
        who: "Contacto secundario",
        text: "Recibe cada alerta. Si nadie la atiende a tiempo, la responsabilidad pasa a él.",
        alt: "Retrato de un hombre con bigote.",
      },
      {
        photo: "milagros",
        name: "Milagros, sobrina",
        who: "Familiar invitada",
        text: "Con su propio acceso ve alertas, clips y la vista en vivo, y puede marcar una alerta.",
        alt: "Retrato de una joven que sonríe al aire libre.",
      },
    ],
    note: "Personas de ejemplo. Fotos de Pexels.",
  },

  // [DESC] install steps and copy; [PWA] iPhone steps and the iOS 16.4 push note; [DESK] the agent
  // also runs on macOS (README, «It also runs on macOS»); [APPLE] the Mac steps. The Mac build is a
  // beta and not signed yet (docs/BLOCKERS.md).
  downloads: {
    title: "Descarga Te Tengo",
    lead: "La app del familiar recibe las alertas. Te Tengo Captura va en la PC de la casa, con la webcam.",
    detected: "Para este dispositivo",
    soon: "Próximamente",
    soonNote: "Estamos preparando esta descarga.",
    howTo: "Cómo instalar",
    options: {
      android: {
        platform: "Celular Android",
        name: "Te Tengo",
        text: "Alertas de caída, vista en vivo, familia e historial.",
        cta: "Descargar para Android",
        steps: [
          "Toca «Descargar para Android». Si Chrome avisa que el archivo puede ser dañino, elige «Descargar de todas formas».",
          "Abre el archivo descargado desde la notificación o desde Archivos → Descargas.",
          "La primera vez, Android pide permiso: en «Instalar apps desconocidas», activa «Permitir de esta fuente» y vuelve.",
          "Toca «Instalar». Si Play Protect avisa que no reconoce la app, toca «Más detalles» → «Instalar de todas formas».",
          "Abre Te Tengo y acepta las notificaciones para recibir las alertas.",
        ],
        note: "Para actualizar, descarga el archivo otra vez desde esta página e instálalo encima: no se pierde tu sesión.",
      },
      iphone: {
        platform: "iPhone",
        name: "Te Tengo web",
        text: "La misma app desde Safari, agregada a tu pantalla de inicio.",
        cta: "Abrir en el iPhone",
        steps: [
          "Abre este enlace en Safari.",
          "Toca el botón Compartir. En iOS 26, toca también «Ver más».",
          "Elige «Agregar a inicio» y abre Te Tengo desde el nuevo ícono.",
        ],
        note: "Para recibir las alertas, abre Te Tengo desde el ícono de inicio y acepta las notificaciones. Necesitas iOS 16.4 o posterior.",
      },
      windows: {
        platform: "PC de la casa · Windows 10 u 11",
        name: "Te Tengo Captura",
        text: "Para la PC de la casa, con la webcam conectada.",
        cta: "Descargar para Windows",
        steps: [],
        note: "La primera vez, Windows puede mostrar «Windows protegió su PC», porque el instalador aún no está firmado: elige «Más información» → «Ejecutar de todas formas».",
      },
      mac: {
        platform: "PC de la casa · Mac (beta)",
        name: "Te Tengo Captura",
        text: "Para la PC de la casa, con la webcam conectada.",
        cta: "Descargar para Mac",
        steps: [
          "Abre el archivo descargado e intenta abrir Te Tengo Captura. Si macOS no lo deja abrir, cierra el aviso.",
          "Ve al menú Apple → «Configuración del Sistema» → «Privacidad y seguridad».",
          "En «Seguridad», haz clic en «Abrir de todos modos». El botón aparece durante una hora, más o menos, después de intentar abrir la app.",
          "Ingresa tu contraseña de inicio de sesión y haz clic en «OK». Desde entonces se abre como cualquier otra app.",
        ],
        note: "La primera vez, macOS puede impedir que se abra, porque la app aún no está firmada: sigue los pasos de «Cómo instalar».",
      },
    },
    web: "¿Prefieres el navegador?",
    webLink: "Abrir Te Tengo web",
  },

  // [APP], [DESK], [CHART] RECURSOS_REQUERIDOS, [ADR7], [VAL]; clips kept 30 days (owner, 2026-10-11)
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿La cámara graba todo el tiempo?",
        a: "No. Solo se guarda un clip de 6 s antes y 6 s después de cada alerta, por 30 días. La vista en vivo no se graba.",
      },
      {
        q: "¿Quién puede ver la cámara?",
        a: "Solo los familiares vinculados, porque tu familiar lo aceptó. Cada acceso queda registrado y toda la familia lo ve.",
      },
      {
        q: "¿Qué pasa si se va el internet?",
        a: "Te Tengo necesita internet para avisarte. La PC reintenta sola y envía los eventos pendientes al volver. Si una cámara se desconecta, la app te avisa.",
      },
      {
        q: "¿Qué se necesita en la casa?",
        a: "Una webcam USB por habitación y una PC con Windows 10 u 11 encendida y con internet. Instalas Te Tengo Captura y la vinculas desde tu celular Android o iPhone.",
      },
      {
        q: "¿Mi familiar tiene que llevar algo o apretar un botón?",
        a: "No. La cámara reconoce la caída por la postura del cuerpo.",
      },
      {
        q: "¿Se puede poner la cámara en el baño?",
        a: "No. Por privacidad, nunca en el baño.",
      },
      {
        q: "¿Qué tan confiable es la detección?",
        a: "En videos públicos detectó el 81,2 % de las caídas, y el 81,1 % de las actividades cotidianas no dio alarma. Puede haber falsas alarmas.",
        link: { href: "/validacion/", label: "Ver cómo lo medimos" },
      },
      {
        q: "¿Reemplaza la atención médica?",
        a: "No. Te Tengo avisa a la familia; no hace diagnósticos médicos.",
      },
    ],
  },

  // [PROTO] TAGLINE (arranque)
  cta: {
    title: "Cerca de los tuyos, aunque estés lejos.",
    text: "Descarga la app y recibe las alertas en tu celular.",
    button: "Descargar Te Tengo",
  },

  // [FOTOS] Alba-docs/05-prototipos/app-movil/fotos/CREDITOS.md (Pexels license)
  footer: {
    project:
      "Te Tengo es un proyecto de tesis de la Universidad Peruana de Ciencias Aplicadas (UPC): sistema basado en estimación de pose para la detección de caídas en adultos mayores en su vivienda.",
    authorsLabel: "Autores",
    authors: ["Jhosepmyr Gutierrez Soto", "Elmer Riva Rodriguez"],
    privacy:
      "Esta página no usa cookies ni herramientas de seguimiento. Los datos de la app están protegidos según la Ley N.⁠° 29733.",
    links: [
      { href: "/#descargas", label: "Descargas" },
      { href: "/validacion/", label: "Validación" },
      { href: "/#preguntas", label: "Preguntas" },
    ],
    creditsLabel: "Fotos: Pexels",
    creditsNote: "Personas de ejemplo, no usuarios de Te Tengo.",
    credits: [
      {
        author: "Danik Prihodko",
        href: "https://www.pexels.com/photo/young-woman-embracing-her-mother-17066525/",
      },
      {
        author: "Mike Art",
        href: "https://www.pexels.com/photo/elderly-woman-enjoying-a-sunny-day-outdoors-36477302/",
      },
      {
        author: "Israel Torres",
        href: "https://www.pexels.com/photo/portrait-of-an-adult-woman-at-a-fairground-16837811/",
      },
      { author: "Fatt Diaz", href: "https://www.pexels.com/photo/man-with-mustache-12810254/" },
      {
        author: "Lucero Estrella",
        href: "https://www.pexels.com/photo/portrait-of-a-smiling-woman-outdoors-in-uruguay-37647336/",
      },
    ],
    year: "2026",
  },

  // [VAL], translated to Spanish
  validation: {
    title: "Cómo medimos la detección",
    description:
      "Metodología y resultados de la validación de Te Tengo con los conjuntos de datos públicos URFD y CAUCAFall: 81,2 % de sensibilidad y 81,1 % de especificidad, dejando un grupo fuera.",
    lead: "Antes de instalar Te Tengo en una casa, probamos el clasificador de caídas con videos públicos. Aquí está cómo lo hicimos, qué resultó y qué no sabemos todavía.",
    back: "Volver al inicio",
    sections: {
      data: "Los datos",
      protocol: "Cómo lo probamos",
      results: "Resultados",
      byActivity: "Por tipo de actividad",
      limits: "Lo que todavía no sabemos",
      refs: "Referencias",
    },
    datasets: [
      {
        name: "URFD",
        cite: "Kwolek y Kepski, 2014",
        text: "30 caídas y 40 actividades cotidianas, de las cuales 16 terminan con la persona acostada en el suelo a propósito. Cámara a la altura del cuerpo.",
      },
      {
        name: "CAUCAFall",
        cite: "Eraso Guerrero et al., 2022",
        text: "10 personas, cada una con 5 caídas (hacia adelante, hacia atrás, a la izquierda, a la derecha y desde sentado) y 5 actividades (caminar, saltar, recoger un objeto, sentarse y arrodillarse): 100 videos. Cámara elevada en una esquina de una casa, con obstáculos y cambios de luz.",
      },
    ],
    datasetsNote: "Ninguno de los dos incluye adultos mayores ni caídas reales.",
    protocol: [
      "El mismo procesamiento que en la casa: cada video se reduce a 480p y 8 imágenes por segundo, se comprime en JPEG como lo hace Te Tengo Captura y pasa por MediaPipe Pose y el mismo clasificador cinemático. No se entrena ningún modelo.",
      "Un video de caída cuenta como acierto si el clasificador emite al menos una caída. Un video de actividad cotidiana cuenta como falsa alarma si emite alguna.",
      "Sensibilidad es la proporción de caídas detectadas; especificidad, la proporción de actividades cotidianas sin alarma.",
      "Dejando un grupo fuera: hay 11 grupos (cada persona de CAUCAFall y todo URFD). Cada grupo se evalúa con el umbral calibrado sin sus videos, para no medir con los mismos datos con los que se ajustó.",
    ],
    table: {
      caption: "Resultados a 8 imágenes por segundo, en JPEG, dejando un grupo fuera.",
      head: ["Grupo", "Caídas", "No caídas", "Sensibilidad", "Especificidad", "Exactitud"],
      rows: [
        ["Total", "80", "90", "81,2 %", "81,1 %", "81,2 %"],
        ["URFD", "30", "40", "76,7 %", "77,5 %", "77,1 %"],
        ["CAUCAFall", "50", "50", "84,0 %", "84,0 %", "84,0 %"],
      ],
    },
    activities: [
      ["CAUCAFall · caída hacia atrás", "10 de 10 detectadas"],
      ["CAUCAFall · caída a la izquierda", "9 de 10"],
      ["CAUCAFall · caída hacia adelante", "8 de 10"],
      ["CAUCAFall · caída a la derecha", "8 de 10"],
      ["CAUCAFall · caída desde sentado", "7 de 10"],
      ["CAUCAFall · saltar", "0 de 10 falsas alarmas"],
      ["CAUCAFall · caminar, sentarse", "1 de 10 falsas alarmas cada una"],
      ["CAUCAFall · arrodillarse, recoger un objeto", "3 de 10 falsas alarmas cada una"],
      ["URFD · caídas", "23 de 30 detectadas"],
      ["URFD · actividades cotidianas", "9 de 40 falsas alarmas; 6 al acostarse en el suelo a propósito"],
    ],
    extra:
      "Ninguna de las 30 caídas de URFD dio un falso aviso de recuperación. A 6 y a 10 imágenes por segundo, la sensibilidad fue de 76,2 % y 81,2 %, y la especificidad de 83,3 % y 84,4 %.",
    limits: [
      "Acostarse en el suelo a propósito se confunde con una caída en 6 de 16 casos de URFD.",
      "Recoger un objeto y arrodillarse dan falsas alarmas en 3 de cada 10 casos con la cámara elevada.",
      "La calibración depende de dónde está la cámara: se repetirá con las grabaciones de la prueba piloto.",
      "No hay adultos mayores ni caídas reales en los datos. La tasa real de falsas alarmas se medirá en la casa.",
      "La validación es por video, no por instante: no mide cuánto tarda en llegar la alerta.",
    ],
    refs: [
      {
        text: "Chen, W., Jiang, Z., Guo, H., & Ni, X. (2020). Fall detection based on key points of human-skeleton using OpenPose. Symmetry, 12(5), 744.",
        href: "https://doi.org/10.3390/sym12050744",
      },
      {
        text: "Eraso Guerrero, J. C., Muñoz España, E., Muñoz Añasco, M., & Pinto Lopera, J. E. (2022). Dataset for human fall recognition in an uncontrolled environment. Data in Brief, 45, 108610.",
        href: "https://doi.org/10.1016/j.dib.2022.108610",
      },
      {
        text: "Kwolek, B., & Kepski, M. (2014). Human fall detection on embedded platform using depth maps and wireless accelerometer. Computer Methods and Programs in Biomedicine, 117(3), 489–501.",
        href: "https://doi.org/10.1016/j.cmpb.2014.09.005",
      },
      {
        text: "Youden, W. J. (1950). Index for rating diagnostic tests. Cancer, 3(1), 32–35.",
        href: "https://doi.org/10.1002/1097-0142(1950)3:1<32::AID-CNCR2820030106>3.0.CO;2-3",
      },
    ],
  },

  notFound: {
    title: "No encontramos esta página",
    text: "Puede que el enlace haya cambiado. Vuelve al inicio o ve directo a las descargas.",
    home: "Ir al inicio",
    downloads: "Ver las descargas",
  },
};
