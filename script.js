"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const toast = document.querySelector(".toast");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Close the mobile menu with Escape for keyboard accessibility.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation && menuButton) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});

// Reveal cards gently as they enter the viewport.
const revealItems = document.querySelectorAll(
  ".project-card, .case-card, .timeline-card, .info-panel, .skill-panel"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => item.classList.add("reveal"));
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());


// Keep project walkthrough playback tidy: pause the other demo when one starts.
document.querySelectorAll(".laptop-video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll(".laptop-video").forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});


// Interactive greeting for Katherine's illustrated avatar.
const avatarButton = document.querySelector(".hero-avatar-button");
const avatarHint = document.querySelector("#hero-avatar-hint");
if (avatarButton) {
  const greet = () => {
    avatarButton.classList.remove("is-active");
    // Restart the short greeting animation on every activation.
    void avatarButton.offsetWidth;
    avatarButton.classList.add("is-active");
    avatarButton.setAttribute("aria-pressed", "true");
    if (avatarHint) avatarHint.textContent = "Hi! Thanks for visiting my portfolio ♡";
  };
  avatarButton.addEventListener("click", greet);
  avatarButton.addEventListener("animationend", (event) => {
    if (event.target.classList.contains("hero-avatar")) {
      avatarButton.classList.remove("is-active");
      avatarButton.setAttribute("aria-pressed", "false");
    }
  });
}


// Let visitors highlight a Skills card by tapping/clicking it or using the keyboard.
document.querySelectorAll("[data-skill-card]").forEach((card) => {
  const toggleCard = () => {
    const selected = card.classList.toggle("is-selected");
    card.setAttribute("aria-pressed", String(selected));
  };
  card.addEventListener("click", toggleCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  });
});


// Bilingual portfolio: switch all visible copy between English and Spanish.
(() => {
  const translations = {
    "Skip to content": "Saltar al contenido",
    "Open navigation": "Abrir navegación",
    "Close navigation": "Cerrar navegación",
    "Home": "Inicio",
    "About me": "Sobre mí",
    "Projects": "Proyectos",
    "Experience": "Experiencia",
    "Certifications": "Certificaciones",
    "Skills": "Habilidades",
    "Contact": "Contacto",
    "View my CV": "Ver mi CV",
    "01 / WELCOME TO MY PORTFOLIO": "01 / BIENVENIDOS A MI PORTAFOLIO",
    "High school student · Aspiring medical professional · Technology enthusiast": "Estudiante de bachillerato · Futura profesional de la medicina · Entusiasta de la tecnología",
    "“I learn with curiosity, create with purpose, and turn ideas into solutions that can help others.”": "«Aprendo con curiosidad, creo con propósito y convierto ideas en soluciones que pueden ayudar a los demás».",
    "Tap my avatar to say hello ✨": "Toca mi avatar para saludar ✨",
    "Curiosity in mind. Creativity in progress.": "Curiosidad en mente. Creatividad en acción.",
    "SCROLL TO EXPLORE": "DESLIZA PARA EXPLORAR",
    "02 / ABOUT ME · GET TO KNOW ME": "02 / SOBRE MÍ · CONÓCEME",
    "Who I ": "Quién ",
    "am.": "soy.",
    "Katherine Lissette Zuniga Alas · Student · Creative thinker · Future medical professional": "Katherine Lissette Zuniga Alas · Estudiante · Pensadora creativa · Futura profesional de la medicina",
    "I’m Katherine Lissette Zuniga Alas, a high school student who describes herself as curious, responsible, creative, and eager to learn. I enjoy working with others, organizing ideas, and paying attention to details. I try to approach each challenge with patience, empathy, and the willingness to improve.": "Soy Katherine Lissette Zuniga Alas, estudiante de bachillerato. Me considero una persona curiosa, responsable, creativa y con muchas ganas de aprender. Disfruto trabajar con otras personas, organizar ideas y prestar atención a los detalles. Procuro afrontar cada desafío con paciencia, empatía y disposición para mejorar.",
    "My interest in technology began with curiosity about how websites and digital tools are created and how they can make everyday tasks easier. Through school projects, I discovered that I enjoy combining creativity with logic: planning an idea, designing an experience, learning how the code works, and improving the result. Building projects has helped me turn that curiosity into practical experience with web development, databases, and digital tools.": "Mi interés por la tecnología nació de la curiosidad por saber cómo se crean los sitios web y las herramientas digitales, y cómo pueden facilitar las tareas cotidianas. A través de los proyectos escolares descubrí que disfruto combinar la creatividad con la lógica: planificar una idea, diseñar una experiencia, aprender cómo funciona el código y mejorar el resultado. Crear proyectos me ha permitido convertir esa curiosidad en experiencia práctica en desarrollo web, bases de datos y herramientas digitales.",
    "What motivates me is the possibility of using what I learn to make a positive difference. I want to continue growing in technology while also preparing for a future in medicine, a field that connects knowledge with care and service. I believe that staying curious, working with purpose, and treating people with empathy will help me keep moving toward those goals.": "Me motiva la posibilidad de utilizar lo que aprendo para generar un impacto positivo. Quiero seguir creciendo en tecnología y, al mismo tiempo, prepararme para un futuro en la medicina, un campo que une el conocimiento con el cuidado y el servicio. Creo que mantener la curiosidad, trabajar con propósito y tratar a las personas con empatía me ayudará a avanzar hacia esas metas.",
    "Technology": "Tecnología",
    "Learning": "Aprendizaje",
    "Medicine": "Medicina",
    "Creativity": "Creatividad",
    "LET’S CONNECT": "CONECTEMOS",
    "LinkedIn profile": "Perfil de LinkedIn",
    "GitHub profile": "Perfil de GitHub",
    "Contact & links": "Contacto y enlaces",
    "SIX SECTIONS · ONE STORY": "SEIS SECCIONES · UNA HISTORIA",
    "EXPERIENCE": "EXPERIENCIA",
    "HOME": "INICIO",
    "ABOUT ME": "SOBRE MÍ",
    "PROJECTS": "PROYECTOS",
    "SKILLS": "HABILIDADES",
    "CONTACT": "CONTACTO",
    "03 / PROJECTS": "03 / PROYECTOS",
    "Ideas made ": "Ideas hechas ",
    "real.": "realidad.",
    "Three projects that reflect my curiosity, creativity, and growing technical skills.": "Tres proyectos que reflejan mi curiosidad, creatividad y el desarrollo de mis habilidades técnicas.",
    "E-COMMERCE · JEWELRY": "COMERCIO ELECTRÓNICO · JOYERÍA",
    "An elegant online jewelry store where visitors can explore collections, rings, necklaces, and earrings.": "Una elegante tienda de joyería en línea donde se pueden explorar colecciones, anillos, collares y aretes.",
    "Explore case study": "Explorar proyecto",
    "AI · EDUCATIONAL TECHNOLOGY": "IA · TECNOLOGÍA EDUCATIVA",
    "A camera-based learning tool that recognizes objects and connects them with Spanish and English vocabulary.": "Una herramienta de aprendizaje con cámara que reconoce objetos y los relaciona con vocabulario en español e inglés.",
    "Watch project demo": "Ver demostración",
    "Visit live project": "Visitar proyecto",
    "WEB DEVELOPMENT · E-COMMERCE": "DESARROLLO WEB · COMERCIO ELECTRÓNICO",
    "A website focused on agromarkets, developed with a database and a web technology stack.": "Un sitio web enfocado en agromercados, desarrollado con una base de datos y distintas tecnologías web.",
    "BEHIND THE SCREENS": "DETRÁS DE LAS PANTALLAS",
    "Project stories": "Historias de los proyectos",
    "A closer look at the purpose, work, and tools behind each project.": "Un vistazo más cercano al propósito, el trabajo y las herramientas detrás de cada proyecto.",
    "Online jewelry storefront": "Tienda de joyería en línea",
    "A jewelry-store concept designed to make collections easy to explore and products easy to discover.": "Un concepto de tienda de joyería diseñado para facilitar la exploración de colecciones y el descubrimiento de productos.",
    "PROJECT CONTEXT": "CONTEXTO DEL PROYECTO",
    "Organizes rings, necklaces, earrings, and collections in one welcoming online store.": "Organiza anillos, collares, aretes y colecciones en una tienda virtual fácil de explorar.",
    "WHAT IT SHOWCASES": "LO QUE PRESENTA",
    "Visual presentation, clear categories, and a simple browsing experience.": "Presentación visual, categorías claras y una experiencia de navegación sencilla.",
    "TECHNICAL FOCUS": "ENFOQUE TÉCNICO",
    "Front-end storefront design · product catalog · website navigation.": "Diseño de interfaz · catálogo de productos · navegación del sitio web.",
    "Watch project demo ↗": "Ver demostración ↗",
    "Team project · Language learning": "Proyecto en equipo · Aprendizaje de idiomas",
    "A camera-based learning tool that identifies everyday objects and connects them with Spanish and English vocabulary.": "Una herramienta de aprendizaje con cámara que identifica objetos cotidianos y los relaciona con vocabulario en español e inglés.",
    "Helps language learners connect real-world objects with new vocabulary.": "Ayuda a quienes aprenden idiomas a relacionar objetos reales con vocabulario nuevo.",
    "MY CONTRIBUTION": "MI CONTRIBUCIÓN",
    "Collaborated with my teammates on the website experience and project presentation.": "Colaboré con mis compañeros en la experiencia del sitio web y en la presentación del proyecto.",
    "TECHNOLOGIES": "TECNOLOGÍAS",
    "Teachable Machine · image recognition · camera integration · bilingual vocabulary · audio support.": "Teachable Machine · reconocimiento de imágenes · integración de cámara · vocabulario bilingüe · apoyo de audio.",
    "Watch team demo ↗": "Ver demostración del equipo ↗",
    "Visit live Linguavision ↗": "Visitar Linguavision ↗",
    "Agromarket-focused website": "Sitio web para agromercados",
    "A website concept that presents agromarket information, product categories, special offers, and listings in one place.": "Un sitio web que presenta información de agromercados, categorías de productos, ofertas especiales y listados en un solo lugar.",
    "Participated in planning, design, development, and presentation.": "Participé en la planificación, el diseño, el desarrollo y la presentación.",
    "HTML · CSS · JavaScript · PHP · MySQL.": "HTML · CSS · JavaScript · PHP · MySQL.",
    "Watch website demo ↗": "Ver demostración del sitio ↗",
    "Visit live website ↗": "Visitar sitio web ↗",
    
    "04 / EXPERIENCE & VOLUNTEERING": "04 / EXPERIENCIA Y VOLUNTARIADO",
    "Growing through ": "Creciendo a través de ",
    "experience.": "experiencias.",
    "Learning, serving, and building skills through meaningful experiences.": "Aprendiendo, sirviendo y desarrollando habilidades mediante experiencias significativas.",
    "ACADEMIC EXPERIENCE": "EXPERIENCIA ACADÉMICA",
    "THREE-YEAR SCHOLARSHIP PROGRAM": "PROGRAMA DE BECAS DE TRES AÑOS",
    "Centro ¡Supérate! ADOC": "Centro ¡Supérate! ADOC",
    "A formative three-year experience focused on English, computing, programming, and values. It helped me strengthen my communication, digital skills, confidence, and commitment to continuous learning.": "Una experiencia formativa de tres años enfocada en inglés, informática, programación y valores. Me permitió fortalecer mi comunicación, habilidades digitales, confianza y compromiso con el aprendizaje continuo.",
    "VOLUNTEERING": "VOLUNTARIADO",
    "FEBRUARY 2026": "FEBRERO DE 2026",
    "Hogar de Ancianos San Vicente de Paul": "Hogar de Ancianos San Vicente de Paul",
    "Participated in a volunteer visit with ADOC Volunteers, supporting an activity focused on companionship, kindness, and respect for older adults.": "Participé en una visita de voluntariado con ADOC Volunteers, apoyando una actividad enfocada en el acompañamiento, la amabilidad y el respeto hacia las personas adultas mayores.",
    "Volunteer activity · ADOC Volunteers": "Actividad de voluntariado · ADOC Volunteers",
    "COMMUNITY SERVICE": "SERVICIO COMUNITARIO",
    "COMMUNITY PARTICIPATION": "PARTICIPACIÓN COMUNITARIA",
    "Plaza San Diego cleanup": "Jornada de limpieza en Plaza San Diego",
    "Took part in a community cleanup activity, contributing to the care of a shared public space and promoting responsibility for the environment.": "Participé en una jornada de limpieza comunitaria, contribuyendo al cuidado de un espacio público y promoviendo la responsabilidad con el medioambiente.",
    "Community service · Environmental care": "Servicio comunitario · Cuidado ambiental",
    "TRAINING & CERTIFICATIONS": "FORMACIÓN Y CERTIFICACIONES",
    "TECHNICAL & PERSONAL DEVELOPMENT": "DESARROLLO TÉCNICO Y PERSONAL",
    "Continuous learning": "Aprendizaje continuo",
    "Microsoft Excel 2019:": "Microsoft Excel 2019:",
    "assessment score of 980/1000.": "resultado de evaluación de 980/1000.",
    "Arduino:": "Arduino:",
    "introductory electronics and programming training through Centro ¡Supérate! ADOC.": "formación introductoria en electrónica y programación en Centro ¡Supérate! ADOC.",
    "Basic finance:": "Finanzas básicas:",
    "Programa Empresarial ¡Supérate! ADOC.": "Programa Empresarial ¡Supérate! ADOC.",
    "Each experience has taught me that learning is more meaningful when I use it to contribute and support others.": "Cada experiencia me ha enseñado que aprender tiene más sentido cuando utilizo mis conocimientos para contribuir y apoyar a los demás.",
    "05 / SKILLS": "05 / HABILIDADES",
    "06 / CONTACT": "06 / CONTACTO",
    "04 / SKILLS": "04 / HABILIDADES",
    "05 / CERTIFICATIONS & COURSES": "05 / CERTIFICACIONES Y CURSOS",
    "06 / SKILLS": "06 / HABILIDADES",
    "07 / CONTACT": "07 / CONTACTO",
    "SEVEN SECTIONS · ONE STORY": "SIETE SECCIONES · UNA HISTORIA",
    "CERTIFICATIONS": "CERTIFICACIONES",
    "PERSONAL DEVELOPMENT": "DESARROLLO PERSONAL",
    "LEARNING THROUGH PRACTICE": "APRENDER A TRAVÉS DE LA PRÁCTICA",
    "I enjoy building new skills through academic challenges, technology projects, English practice, and learning experiences that help me grow personally and professionally.": "Disfruto desarrollar nuevas habilidades mediante retos académicos, proyectos tecnológicos, práctica del inglés y experiencias de aprendizaje que me ayudan a crecer personal y profesionalmente.",
    "Learning with ": "Aprender con ",
    "purpose.": "propósito.",
    "A collection of certifications and courses that represent my commitment to learning and developing new skills.": "Una colección de certificaciones y cursos que representan mi compromiso con el aprendizaje y el desarrollo de nuevas habilidades.",
    "OFFICIAL CERTIFICATION": "CERTIFICACIÓN OFICIAL",
    "Excel Associate": "Excel Associate",
    "Excel Expert": "Excel Expert",
    "Microsoft Office Specialist: Excel Associate — Microsoft 365 Apps.": "Microsoft Office Specialist: Excel Associate — Microsoft 365 Apps.",
    "Microsoft Office Specialist: Excel Expert — Microsoft 365 Apps.": "Microsoft Office Specialist: Excel Expert — Microsoft 365 Apps.",
    "Earned November 4, 2025": "Obtenida el 4 de noviembre de 2025",
    "Earned March 25, 2026": "Obtenida el 25 de marzo de 2026",
    "Verify certificate ↗": "Verificar certificado ↗",
    "ENGLISH LANGUAGE": "IDIOMA INGLÉS",
    "TOEIC Listening and Reading": "TOEIC Listening and Reading",
    "English listening and reading assessment.": "Evaluación de comprensión auditiva y lectora en inglés.",
    "2025 · Centro ¡Supérate! ADOC": "2025 · Centro ¡Supérate! ADOC",
    "TECHNOLOGY COURSE": "CURSO DE TECNOLOGÍA",
    "Arduino & Basic Electronics": "Arduino y Electrónica Básica",
    "Introductory learning in Arduino, electronics, and basic programming.": "Formación introductoria en Arduino, electrónica y programación básica.",
    "PERSONAL DEVELOPMENT": "DESARROLLO PERSONAL",
    "Basic Personal Finance": "Finanzas Personales Básicas",
    "A foundational course in personal finance.": "Curso introductorio sobre finanzas personales.",
    "The verification links are available for the two official Microsoft Excel certifications. Other course records can be added when their digital certificates are available.": "Los enlaces de verificación están disponibles para las dos certificaciones oficiales de Microsoft Excel. Se podrán agregar los demás certificados digitales cuando estén disponibles."
    "Skills & ": "Habilidades y ",
    "strengths.": "fortalezas.",
    "Tap a card to highlight that part of my toolkit.": "Toca una tarjeta para destacar esa área de mis habilidades.",
    "Technical skills": "Habilidades técnicas",
    "Practiced through my website projects, database work, spreadsheets, and introductory electronics activities.": "Desarrolladas mediante mis proyectos web, trabajo con bases de datos, hojas de cálculo y actividades introductorias de electrónica.",
    "Personal strengths": "Fortalezas personales",
    "Creative problem-solving": "Resolución creativa de problemas",
    "Willingness to learn": "Disposición para aprender",
    "Strengthened through collaborative school projects, presentations, and working toward shared goals.": "Fortalecidas mediante proyectos escolares colaborativos, presentaciones y trabajo para alcanzar objetivos compartidos.",
    "Languages": "Idiomas",
    "Native": "Nativo",
    "Basic / Intermediate": "Básico / Intermedio",
    "I keep practicing English to become more confident and clear when communicating.": "Sigo practicando inglés para comunicarme con mayor confianza y claridad.",
    "05 / CONTACT": "05 / CONTACTO",
    "Thank you for": "Gracias por",
    "being ": "estar ",
    "here.": "aquí.",
    "I am always open to learning, sharing ideas, and discovering new opportunities.": "Siempre estoy dispuesta a aprender, compartir ideas y descubrir nuevas oportunidades.",
    "Let’s connect": "Conectemos",
    "“Dream big, keep learning, and make it happen.”": "«Sueña en grande, sigue aprendiendo y hazlo realidad».",
    "BACK TO TOP ↑": "VOLVER ARRIBA ↑",
    "Hi! Thanks for visiting my portfolio ♡": "¡Hola! Gracias por visitar mi portafolio ♡"
  };

  const originalText = new Map();
  const header = document.querySelector(".site-header");
  if (!header) return;

  const switcher = document.createElement("button");
  switcher.type = "button";
  switcher.className = "language-toggle";
  switcher.textContent = "ES";
  switcher.setAttribute("aria-label", "Cambiar idioma a español");
  switcher.setAttribute("title", "Español");
  const headerMark = header.querySelector(".header-mark");
  header.insertBefore(switcher, headerMark || null);

  const style = document.createElement("style");
  style.textContent = `
    .language-toggle {
      min-width: 42px; height: 36px; padding: 0 11px;
      border: 1px solid #e6e1dc; border-radius: 22px;
      background: #fff; color: #5643a2; cursor: pointer;
      font: 800 11px "DM Sans", Arial, sans-serif;
      letter-spacing: .6px; transition: background .2s ease, transform .2s ease;
    }
    .language-toggle:hover { background: #eee9fb; transform: translateY(-1px); }
    .language-toggle:focus-visible { outline: 3px solid rgba(86,67,162,.3); outline-offset: 3px; }
    @media (max-width: 650px) {
      .site-header { gap: 10px; }
      .language-toggle { min-width: 39px; height: 34px; padding: 0 9px; }
    }
  `;
  document.head.appendChild(style);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement && ["SCRIPT", "STYLE", "VIDEO", "NOSCRIPT"].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    textNodes.push(node);
    originalText.set(node, node.nodeValue);
  }

  const applyLanguage = (language) => {
    const spanish = language === "es";
    textNodes.forEach((node) => {
      const original = originalText.get(node);
      const trimmed = original.trim();
      const translated = Object.entries(translations).find(([key]) => key.trim() === trimmed)?.[1];
      if (spanish && translated) {
        const leading = original.match(/^\\s*/)?.[0] || "";
        const trailing = original.match(/\\s*$/)?.[0] || "";
        node.nodeValue = leading + translated + trailing;
      } else {
        node.nodeValue = original;
      }
    });
    document.documentElement.lang = spanish ? "es" : "en";
    switcher.textContent = spanish ? "EN" : "ES";
    switcher.setAttribute("aria-label", spanish ? "Switch language to English" : "Cambiar idioma a español");
    switcher.setAttribute("title", spanish ? "English" : "Español");
  };

  switcher.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "en" ? "es" : "en");
  });
})();
