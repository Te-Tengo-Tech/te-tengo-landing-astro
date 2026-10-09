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
 *   [BRAND]  Alba-docs/05-prototipos/marca/README.md
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
      "Te Tengo reconoce caídas y movimientos inestables de tu familiar con una cámara en su casa y te avisa al instante en tu celular. El video se procesa en la PC de la casa.",
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
    { href: "/#privacidad", label: "Privacidad" },
    { href: "/#para-quien", label: "Para quién" },
    { href: "/#preguntas", label: "Preguntas" },
  ],
  navCta: "Descargar",

  // [PROTO] bienvenida
  hero: {
    title: "Cuida a tu familiar aunque no estés en casa.",
    lead: "Una cámara en su casa reconoce caídas y movimientos inestables. Te avisamos al instante en tu celular.",
    primary: "Descargar",
    secondary: "Ver cómo funciona",
    points: [
      { icon: "user", text: "Sin pulseras ni botones: tu familiar no tiene que hacer nada." },
      {
        icon: "video",
        text: "Puedes ver su casa en vivo cuando lo necesites, con su permiso. Cada acceso queda registrado.",
      },
      { icon: "shield", text: "Datos protegidos según la Ley N.⁠° 29733." },
    ],
    tag: "Solo postura, nunca rostros",
    // [PROTO] seniorCard, calm state
    status: {
      title: "Todo tranquilo",
      text: "Sin eventos hoy. La cámara de la Sala está funcionando.",
    },
    statusLabel: "Ejemplo del estado en la app",
    illustrationLabel:
      "Ilustración: la sala de una casa y la figura de una persona de pie, dibujada solo con los puntos de su postura.",
    pilot: "Prueba piloto · proyecto de tesis de la UPC",
  },

  // [CHART] PLANTEAMIENTO_PROBLEMA.md and REFERENCIAS.md
  problem: {
    title: "Una caída en casa, y nadie cerca para ayudar.",
    lead: "Las alarmas personales y la teleasistencia dependen de que la propia persona pida ayuda después de caer. La evidencia muestra que eso rara vez sucede.",
    facts: [
      {
        value: "38,4 %",
        text: "de las personas de 70 años o más en el Perú vive sola o solo con otra persona de esa edad.",
        source: "INEI, 2018",
        href: "https://www.inei.gob.pe/media/MenuRecursivo/publicaciones_digitales/Est/Lib1577/Libro01.pdf",
      },
      {
        value: "80 %",
        text: "de las personas mayores de 90 años que tenían una alarma personal no la activó tras caer estando sola, en un estudio en el Reino Unido.",
        source: "Fleming y Brayne, BMJ, 2008",
        href: "https://doi.org/10.1136/bmj.a2227",
      },
      {
        value: "16,8 %",
        text: "de los peruanos de 60 años o más no usa teléfono celular.",
        source: "INEI, 2025",
        href: "https://www1.inei.gob.pe/media/MenuRecursivo/boletines/informe-tecnico_tics_oct-nov-dic24.pdf",
      },
    ],
    close:
      "Te Tengo no espera a que tu familiar pida ayuda: la cámara reconoce la caída y la familia recibe el aviso.",
  },

  // [PROD] Product Purpose, Operating Context; [ADR7]; [DESK] live view modes
  how: {
    title: "Así funciona",
    lead: "Tres piezas: una cámara en la casa, la PC que la analiza y la app en tu celular.",
    steps: [
      {
        title: "Una cámara en casa",
        text: "El equipo del proyecto instala una webcam USB en una habitación de la casa y la conecta a la PC. Nunca en el baño.",
      },
      {
        title: "La PC reconoce la caída",
        text: "Te Tengo Captura estima la postura del cuerpo y reconoce caídas y movimientos inestables. El video se procesa en la PC y no sale de la casa.",
      },
      {
        title: "Te avisamos en tu celular",
        text: "Toda la familia recibe la alerta con la habitación y la hora. Desde ahí puedes llamar, ver el clip o mirar en vivo.",
      },
    ],
    notification: {
      app: "Te Tengo",
      when: "ahora",
      title: "Posible caída de Rosa en la Sala",
      body: "10:42 · Toca para ver qué hacer y llamarla.",
    },
    stepsLabel: "Los tres pasos",
    pcLabel: "Te Tengo Captura",
    pcState: "Procesando en esta PC",
    example: "Ejemplo",
    live: {
      title: "Vista en vivo, solo con su permiso",
      text: "Puedes ver su casa en vivo cuando lo necesites, con su permiso. La transmisión no se graba y cada acceso queda en el registro que ve toda la familia.",
      modesLabel: "Modos de la vista en vivo",
      modes: ["Video", "Video y postura", "Solo postura"],
      modesNote: "En «Solo postura» ves la figura del cuerpo, sin la imagen de la cámara.",
      liveTag: "EN VIVO",
      liveTime: "00:42",
      logged: "Cada acceso queda registrado",
    },
    illustrations: {
      room: "Ilustración: una sala con una webcam pequeña en la pared y una persona de pie.",
      pc: "Ilustración: la pantalla de la PC de la casa muestra la postura de una persona en el suelo.",
      phone: "Ilustración: un celular recibe la notificación «Posible caída de Rosa en la Sala».",
    },
  },

  // [PROD] Capabilities; [PROTO] alert timeline, pause sheet, access log, order of notice; [BACK]
  features: {
    title: "Una alerta que se entiende en dos segundos",
    lead: "Qué pasó, dónde, cuándo y qué hacer ahora. Cada aviso llega a toda la familia y nunca queda sin alguien a cargo.",
    alertLabel: "Ejemplo de alerta",
    alert: {
      severity: "Caída",
      title: "Posible caída de Rosa",
      slots: [
        { k: "Habitación", v: "Sala" },
        { k: "Hora", v: "10:42", mono: true },
        { k: "Hace", v: "20 s", mono: true },
      ],
      checking: "Comprobando si sigue en el suelo",
      clipTag: "Sala · 10:42",
    },
    timelineLabel: "Lo que hace Te Tengo, paso a paso",
    timeline: [
      {
        tone: "inestable",
        icon: "unsteady",
        title: "Movimiento inestable",
        text: "Si tu familiar tambalea o pierde el equilibrio sin llegar al suelo, recibes un aviso de menor urgencia. Si termina en caída, la alerta se actualiza.",
      },
      {
        tone: "caida",
        icon: "fall",
        title: "Caída",
        text: "Una alerta urgente con la habitación y la hora, para que puedas llamar de inmediato. Caída y movimiento inestable nunca se confunden: cada uno tiene su color, su ícono y su nombre.",
      },
      {
        tone: "caida",
        icon: "warn",
        title: "Confirmación en el suelo",
        text: "Si sigue en el suelo 30 segundos, la caída queda confirmada y la alerta sigue activa hasta que alguien la atienda.",
      },
      {
        tone: "calma",
        icon: "stand",
        title: "Aviso de recuperación",
        text: "«Rosa se levantó»: te avisamos si se pone de pie. Aun así, confirma cómo está antes de cerrar la alerta.",
      },
      {
        tone: "neutral",
        icon: "users",
        title: "Nadie queda sin aviso",
        text: "Si el contacto principal no atiende la alerta en el tiempo de espera, se avisa al contacto secundario. Cuando alguien la marca, los demás ven quién y a qué hora.",
      },
    ],
    moreTitle: "Y todo lo que necesitas alrededor de la alerta",
    clip: {
      title: "Clip de 6 s",
      text: "Cada alerta trae un clip de 6 segundos antes y 6 segundos después del evento, para entender qué pasó antes de actuar.",
      time: "0:06 / 0:12",
      marker: "Momento del evento",
    },
    live: {
      title: "Vista en vivo con registro de accesos",
      text: "Ábrela cuando quieras. Al cerrarla queda registrado quién la vio, cuándo empezó y cuánto duró.",
      row: { name: "Carmen Huamán", detail: "Empezó a las 10:44 · duró 1 min 20 s", tag: "Desde una alerta" },
    },
    family: {
      title: "Familia y orden de aviso",
      text: "Todos los familiares reciben cada alerta. Tú decides quién es el contacto principal, quién el secundario y cuánto esperar.",
      order: [
        { n: "1", name: "Carmen", role: "Principal" },
        { n: "2", name: "Luis", role: "Secundario" },
      ],
      waitLabel: "Tiempo de espera",
      waits: ["3 min", "5 min", "10 min"],
      waitDefault: "5 min",
    },
    pause: {
      title: "Pausas",
      text: "¿Visitas o una reunión familiar? Pausa la cámara. Mientras esté en pausa no se detectarán caídas y nadie podrá verla en vivo. Se reactivará sola.",
      chip: "En pausa",
      until: "Sala · hasta las 16:30",
    },
    exampleNote: "Nombres y horas de ejemplo.",
  },

  // [PROD] Positioning, Principles; [ADR7]; [BACK] US-05, US-09, US-24; [VAL]
  privacy: {
    title: "Cuidar, no vigilar.",
    lead: "Te Tengo no es una cámara de seguridad. La app no está para mirar, sino para llegar a tiempo y sostener.",
    items: [
      {
        icon: "pc",
        title: "El video se queda en casa",
        text: "La PC de la casa analiza el video. Solo salen el clip de cada evento y la vista en vivo, cuando un familiar la abre.",
      },
      {
        icon: "shield",
        title: "Solo postura, nunca rostros",
        text: "La detección usa la postura del cuerpo. Te Tengo no usa reconocimiento facial ni hace diagnósticos médicos.",
      },
      {
        icon: "doc",
        title: "Nada sin su consentimiento",
        text: "Sin el consentimiento de tu familiar, la cámara no envía video. Si lo retira, se detiene la captura y se eliminan sus grabaciones.",
      },
      {
        icon: "eye",
        title: "Cada acceso queda registrado",
        text: "La vista en vivo no se graba. Toda la familia ve quién la abrió, cuándo y cuánto duró.",
      },
      {
        icon: "pause",
        title: "Pausas que se reactivan solas",
        text: "Pausa la cámara cuando haga falta. Se reactiva sola, para que nadie se quede sin cuidado por olvido.",
      },
      {
        icon: "lock",
        title: "Ley N.⁠° 29733",
        text: "Datos protegidos según la Ley N.⁠° 29733. El consentimiento queda registrado con fecha y hora.",
      },
    ],
    consent: {
      label: "Ejemplo de constancia de consentimiento",
      title: "Consentimiento registrado",
      rows: [
        { k: "Lo otorgó", v: "Rosa Huamán", mono: false },
        { k: "Lo registró", v: "Carmen Huamán", mono: false },
        { k: "Fecha y hora", v: "03/08/2026 · 10:15", mono: true },
      ],
      law: "Constancia con fecha y hora, como exige la Ley N.⁠° 29733.",
      example: "Constancia de ejemplo.",
    },
    validation: {
      title: "Probado con videos públicos",
      text: "Medimos la detección en 170 videos de dos conjuntos de datos públicos, URFD y CAUCAFall, dejando un grupo fuera en cada prueba.",
      metrics: [
        { value: "81,2 %", label: "Sensibilidad", text: "de las caídas fueron detectadas." },
        { value: "81,1 %", label: "Especificidad", text: "de las actividades cotidianas no dieron alarma." },
      ],
      limits:
        "Son videos con actores: no incluyen adultos mayores ni caídas reales. Acostarse en el suelo a propósito, recoger un objeto o arrodillarse pueden dar una falsa alarma. La tasa real se medirá en la prueba piloto.",
      link: "Cómo lo medimos",
    },
  },

  // [PROD] Users; [PROTO] bienvenida; [DESK] PRODUCT.md (project team)
  audience: {
    title: "Para la familia que cuida",
    lead: "Cada persona tiene un papel claro, y nadie tiene que volverse técnico.",
    people: [
      {
        icon: "phone",
        who: "Familiar o cuidador",
        title: "Recibe las alertas",
        text: "En su celular recibe cada alerta, ve el clip, llama y la marca como atendida o falsa alarma. Puede invitar a otros familiares.",
      },
      {
        icon: "user",
        who: "Adulto mayor",
        title: "No tiene que hacer nada",
        text: "Sin pulseras ni botones. Solo da su consentimiento, y puede retirarlo cuando quiera.",
      },
      {
        icon: "home2",
        who: "Equipo del proyecto",
        title: "Lo instala",
        text: "En la prueba piloto instala la webcam y Te Tengo Captura en la PC de la casa. La familia no configura nada en la PC.",
      },
    ],
  },

  // [DESC] install steps and copy; [PWA] iPhone steps and the iOS 16.4 push note; [DESK] the agent
  // also runs on macOS (README, «It also runs on macOS»); [APPLE] the Mac steps. The Mac build is a
  // beta and not signed yet (docs/BLOCKERS.md).
  downloads: {
    title: "Descarga Te Tengo",
    lead: "La app del familiar o cuidador recibe las alertas de caída. El programa Te Tengo Captura va en la PC de la casa, con la cámara.",
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
        text: "Lo instala el equipo del proyecto junto con la cámara.",
        cta: "Descargar para Windows",
        steps: [],
        note: "La primera vez, Windows puede mostrar «Windows protegió su PC», porque el instalador aún no está firmado: elige «Más información» → «Ejecutar de todas formas».",
      },
      mac: {
        platform: "PC de la casa · Mac (beta)",
        name: "Te Tengo Captura",
        text: "Lo instala el equipo del proyecto junto con la cámara.",
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

  // [PROD], [DESK], [CHART] RECURSOS_REQUERIDOS, [ADR7], [VAL]
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿La cámara graba todo el tiempo?",
        a: "No. La PC de la casa analiza el video y solo guarda un clip de 6 segundos antes y 6 segundos después de cada evento. La vista en vivo no se graba, y las grabaciones se conservan por un tiempo limitado.",
      },
      {
        q: "¿Quién puede ver la cámara?",
        a: "Solo los familiares vinculados a la cuenta, y solo porque tu familiar lo aceptó en su consentimiento. Cada vez que alguien abre la vista en vivo queda registrado quién, cuándo y cuánto duró, y toda la familia lo ve.",
      },
      {
        q: "¿Qué pasa si se va el internet?",
        a: "Te Tengo necesita internet en la casa para avisarte. Si la PC pierde la conexión, Te Tengo Captura reintenta sola y envía los eventos pendientes cuando vuelve. Si la cámara se desconecta, la app te avisa y te dice qué revisar: el cable de la cámara, que la PC esté encendida y la conexión a internet.",
      },
      {
        q: "¿Qué se necesita en la casa?",
        a: "Una webcam USB y una PC con Windows 10 u 11 que se quede encendida, con internet. En la prueba piloto, el equipo del proyecto instala la cámara y el programa. Tú solo necesitas la app en tu celular Android o iPhone.",
      },
      {
        q: "¿Mi familiar tiene que llevar algo o apretar un botón?",
        a: "No. Sin pulseras ni botones: tu familiar no tiene que hacer nada. La cámara reconoce la caída por la postura del cuerpo.",
      },
      {
        q: "¿Se puede poner la cámara en el baño?",
        a: "No. Por privacidad, la cámara nunca se instala en el baño.",
      },
      {
        q: "¿Qué tan confiable es la detección?",
        a: "En videos públicos detectó el 81,2 % de las caídas, y el 81,1 % de las actividades cotidianas no dio alarma. Puede dar falsas alarmas, por ejemplo si tu familiar se acuesta en el suelo a propósito. La tasa real se medirá en la prueba piloto.",
        link: { href: "/validacion/", label: "Ver cómo lo medimos" },
      },
      {
        q: "¿Reemplaza la atención médica?",
        a: "No. Te Tengo avisa a la familia cuando detecta una caída o un movimiento inestable, pero no hace diagnósticos médicos.",
      },
    ],
  },

  // [PROTO] TAGLINE (arranque)
  cta: {
    title: "Cerca de los tuyos, aunque estés lejos.",
    text: "Descarga la app y recibe las alertas en tu celular.",
    button: "Descargar Te Tengo",
  },

  footer: {
    project:
      "Te Tengo es un proyecto de tesis de la Universidad Peruana de Ciencias Aplicadas (UPC): sistema basado en estimación de pose para la detección de caídas en adultos mayores en su vivienda.",
    authorsLabel: "Autores",
    authors: ["Jhosepmyr Gutierrez Soto", "Elmer Riva Rodriguez"],
    privacy:
      "Esta página no usa cookies ni herramientas de seguimiento. Los datos de la app están protegidos según la Ley N.⁠° 29733.",
    links: [
      { href: "/#descargas", label: "Descargas" },
      { href: "/validacion/", label: "Validación" },
      { href: "/#preguntas", label: "Preguntas" },
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

export type Copy = typeof es;
