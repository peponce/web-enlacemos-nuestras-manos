/* ==========================================================================
   ASOCIACIÓN ENLACEMOS NUESTRAS MANOS - LOGICA INTERACTIVA & ACCESIBILIDAD
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimatedCounters();
  initRedComunitariaDropdown();
  initProjectTabs();
  initModals();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initInteractionTracking();
  initCookieBanner();
});

/* ==========================================================================
   1. NAVEGACIÓN Y MENÚ MÓVIL
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sombra al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle del menú móvil
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Cerrar el menú móvil al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });
  }

  // Active indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));
}

/* ==========================================================================
   2. CONTADORES DE IMPACTO ANIMADOS (IntersectionObserver)
   ========================================================================== */
function initAnimatedCounters() {
  const statElements = document.querySelectorAll('.counter-val');
  if (!statElements.length) return;

  const animateNumber = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1800;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(target * easeOut);

      element.textContent = currentVal.toLocaleString('es-ES');

      if (frame >= totalFrames) {
        element.textContent = target.toLocaleString('es-ES');
        clearInterval(counter);
      }
    }, frameRate);
  };

  const statsSection = document.querySelector('.stats-bar');
  if (!statsSection) return;

  let hasAnimated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(animateNumber);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}

/* ==========================================================================
   3. PESTAÑAS DE FILTRADO PARA PROYECTOS Y SERVICIOS
   ========================================================================== */
function initProjectTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects-grid');

  if (!tabButtons.length || !projectCards.length) return;

  if (projectsGrid) {
    projectsGrid.setAttribute('data-count', projectCards.length);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      trackInteraction('cambio-pestana', { categoria: filter });
      let visibleCount = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          visibleCount++;
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });

      if (projectsGrid) {
        projectsGrid.setAttribute('data-count', visibleCount);
      }
    });
  });
}

/* ==========================================================================
   4. MODAL ACCESIBLE DE DETALLES Y GALERÍA FOTOGRÁFICA
   ========================================================================== */
const projectDetails = {
  banco: {
    title: 'Banco de Alimentos',
    category: 'Área Social',
    images: ['Imagen1.webp', 'Imagen2.webp', 'Imagen4.webp', 'Imagen5.webp', 'Imagen6.webp', 'Imagen7.webp'],
    description: 'Servicio semanal de entrega de alimentos frescos, precocinados, lácteos y lotes básicos para familias y personas en situación de vulnerabilidad en el barrio de Sagrada Família.',
    collaboration: 'En colaboración activa con la Fundació Banc dels Aliments, Fundació Ferrer Sustainability, Aldi, DiSA Càritas Sagrada Família y Mercabarna.',
    hours: 'Repartos y atención: Miércoles de 09:00 a 12:30 h.'
  },
  ropero: {
    title: 'Ropero Solidario',
    category: 'Área Social',
    images: ['Imagen8.webp'],
    description: 'Dispensación periódica de ropa, calzado para adultos e infantil, abrigos y accesorios en perfecto estado, seleccionados y clasificados por nuestro equipo de voluntarios.',
    collaboration: 'Gestionado gracias a donaciones vecinales, fundaciones aliadas y particulares.',
    hours: 'Atención presencial con cita previa y días asignados.'
  },
  acogida: {
    title: 'Asesoramiento y 1ª Acogida',
    category: 'Área Social',
    images: ['Imagen9.webp'],
    description: 'Espacio de escucha empática, orientación en trámites de empadronamiento, tarjeta sanitaria, ayudas sociales y derivación oficial a organismos públicos competentes.',
    collaboration: 'En coordinación permanente con Servicios Sociales del Ayuntamiento de Barcelona y el Pla Comunitari de la Sagrada Família.',
    hours: 'Miércoles (09:00 - 12:30) y 2º Viernes de mes (16:00 - 19:00).'
  },
  podologia: {
    title: 'Podología Solidaria',
    category: 'Salud y Bienestar',
    images: ['Imagen3.webp'],
    description: 'Atención podológica preventiva y tratamientos especializados para personas mayores y colectivos con escasos recursos, evitando complicaciones de movilidad.',
    collaboration: 'Proyecto trimestral coordinado junto al CAP Sagrada Família y CAP Roger de Flor.',
    hours: 'Sesiones trimestrales programadas con los centros de atención primaria.'
  },
  ocular: {
    title: 'Revisión Ocular y Préstamo Ortopédico',
    category: 'Salud y Bienestar',
    images: ['Imagen10.webp', 'Imagen11.webp', 'Imagen12.webp'],
    description: 'Campañas semestrales de salud visual gratuita con graduación y asesoramiento, junto a un banco de préstamo sin coste de material ortopédico (sillas de ruedas, andadores y muletas).',
    collaboration: 'En colaboración con la Fundació Temps i Compromís.',
    hours: 'Campañas semestrales anunciadas en la asociación.'
  },
  idiomas: {
    title: 'Cursos de Idiomas para la Inclusión',
    category: 'Formación y Empleo',
    images: ['Imagen13.webp', 'Imagen14.webp', 'Imagen15.webp', 'Imagen16.webp', 'Imagen17.webp', 'Imagen18.webp'],
    description: 'Clases formativas y prácticas de catalán, castellano e inglés impartidas por profesores voluntarios para facilitar la integración comunitaria y el acceso al empleo.',
    collaboration: 'Abierto a todos los vecinos del distrito.',
    hours: 'Grupos en horario de mañana y tarde.'
  },
  costura: {
    title: 'Talleres de Costura y Habilidades Textiles',
    category: 'Formación y Empleo',
    images: ['Imagen20.webp', 'Imagen21.webp'],
    description: 'Formación técnica y creativa en patronaje, arreglo y confección de prendas para fomentar la autosuficiencia, el emprendimiento y la convivencia vecinal.',
    collaboration: 'Equipado con máquinas de coser donadas por la comunidad.',
    hours: 'Talleres semanales.'
  },
  camarero: {
    title: 'Curso de Ayudante de Camarero y Hostelería',
    category: 'Formación y Empleo',
    images: ['Imagen22.webp', 'Imagen23.webp', 'Imagen24.webp'],
    description: 'Capacitación profesional en servicio de sala, protocolo básico de hostelería, certificado de manipulador de alimentos y salidas con prácticas formativas.',
    collaboration: 'Con visitas culturales e intermediación con el sector de restauración.',
    hours: 'Convocatorias periódicas anuales.'
  },
  ucrania: {
    title: 'Ayuda Humanitaria a Ucrania',
    category: 'Acción Internacional',
    images: ['Imagen50.webp', 'Imagen51.webp', 'Imagen53.webp'],
    description: 'Campaña continua de recogida, empaquetado y transporte de medicamentos de emergencia, material sanitario y suministros esenciales a zonas de conflicto.',
    collaboration: 'En red con entidades de ayuda humanitaria internacional.',
    hours: 'Punto de recogida activo en nuestra sede.'
  },
  cuba: {
    title: 'Envío de Contenedores a Cuba',
    category: 'Acción Internacional',
    images: ['Imagen54.webp', 'Imagen55.webp', 'Imagen56.webp'],
    description: 'Gestión logística y carga de contenedores solidarios con alimentos no perecederos, ropa, material escolar y ortopédico con entrega directa y trazable.',
    collaboration: 'Coordinado estrechamente con la ONG Acordes.',
    hours: 'Campañas periódicas de carga y envío.'
  },
  festa: {
    title: 'Festa Major de Barri (Sagrada Família)',
    category: 'Comunidad y Ocio',
    images: [
      'Imagen35.webp', 'Imagen36.webp', 'Imagen37.webp', 'Imagen38.webp', 'Imagen39.webp',
      'Imagen40.webp', 'Imagen41.webp', 'Imagen42.webp', 'Imagen43.webp', 'Imagen45.webp',
      'Imagen46.webp', 'Imagen47.webp', 'Imagen48.webp', 'Imagen49.webp'
    ],
    description: 'Presencia activa en las fiestas patronales del barrio con talleres infantiles, juegos tradicionales, pintacaras, globoflexia, ludoteca comunitaria y reparto de rosas solidarias.',
    collaboration: 'En la Coordinadora d’Entitats de la Sagrada Família.',
    hours: 'Durante las fechas festivas anuales del barrio.'
  },
  navidad: {
    title: 'Campaña de Navidad y Reyes',
    category: 'Comunidad y Ocio',
    images: [
      'Imagen25.webp', 'Imagen26.webp', 'Imagen27.webp', 'Imagen28.webp', 'Imagen29.webp',
      'Imagen30.webp', 'Imagen31.webp', 'Imagen32.webp', 'Imagen33.webp'
    ],
    description: 'Recogida y reparto de juguetes nuevos para que ningún niño del barrio se quede sin ilusión, entrega de libros y celebración de almuerzo comunitario de Año Nuevo.',
    collaboration: 'Con aportaciones de comercios locales, vecinos y empresas solidarias.',
    hours: 'Diciembre y primeros días de enero.'
  },
  voluntariado: {
    title: 'Formación Continua al Voluntariado',
    category: 'Comunidad y Ocio',
    images: ['Imagen58.webp', 'Imagen59.webp'],
    description: 'Cursos formativos específicos para voluntarios: manipulación de alimentos, prevención de riesgos, confidencialidad y escucha activa en el ámbito social.',
    collaboration: 'Impartido por técnicos especialistas.',
    hours: 'Jornadas de capacitación periódicas.'
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalCollab = document.getElementById('modalCollab');
  const modalHours = document.getElementById('modalHours');
  const modalClose = document.getElementById('modalClose');
  const modalGallery = document.getElementById('modalGallery');
  const modalGalleryCount = document.getElementById('modalGalleryCount');

  // Elementos de Lightbox
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!modalBackdrop) return;

  window.openModal = function(key) {
    const data = projectDetails[key];
    if (!data) return;
    trackInteraction('ver-galeria', { accion: 'abrir_proyecto', proyecto: key });

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.description;
    modalCollab.textContent = data.collaboration;
    modalHours.textContent = data.hours;

    // Renderizar la galería de fotos
    if (modalGallery) {
      modalGallery.innerHTML = '';
      if (data.images && data.images.length > 0) {
        if (modalGalleryCount) {
          modalGalleryCount.textContent = `(${data.images.length} fotos reales)`;
        }
        data.images.forEach((imgSrc, index) => {
          const item = document.createElement('div');
          item.className = 'modal-gallery-item';
          item.setAttribute('tabindex', '0');
          item.setAttribute('role', 'button');
          item.setAttribute('aria-label', `Ampliar fotografía ${index + 1} de ${data.title}`);
          const thumbSrc = imgSrc.replace(/\.webp$/, '-sm.webp');
          item.innerHTML = `
            <img src="${thumbSrc}" alt="${data.title} - Foto ${index + 1}" loading="lazy" width="280" height="180">
            <span class="modal-gallery-badge">Foto ${index + 1} de ${data.images.length}</span>
          `;
          item.addEventListener('click', () => openLightbox(imgSrc));
          item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(imgSrc);
            }
          });
          modalGallery.appendChild(item);
        });
      } else {
        if (modalGalleryCount) modalGalleryCount.textContent = '';
      }
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  };

  window.closeModal = function() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.openLightbox = function(src) {
    if (!lightbox || !lightboxImg) return;
    trackInteraction('ver-galeria', { accion: 'ampliar_foto', imagen: src });
    lightboxImg.src = src;
    lightbox.classList.add('open');
  };

  window.closeLightbox = function() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
  };

  modalClose.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      // Cierra al hacer clic en cualquier parte fuera de la propia imagen
      if (e.target !== lightboxImg) {
        closeLightbox();
      }
    });
  }

  // Accesibilidad de teclado para tarjetas de proyecto y momentos fotográficos
  document.querySelectorAll('.project-card, .gallery-card').forEach(card => {
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
    }
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Modal Legal (Aviso y Privacidad) cierre en fondo exterior
  const legalModal = document.getElementById('legalModal');
  if (legalModal) {
    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) {
        closeLegalModal();
      }
    });
  }

  // Soporte directo para hash en la URL (#aviso-legal, #politica-privacidad)
  try {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#aviso-legal' || hash === '#aviso') {
      setTimeout(() => openLegalModal('aviso'), 150);
    } else if (hash === '#politica-privacidad' || hash === '#privacidad') {
      setTimeout(() => openLegalModal('privacidad'), 150);
    }
  } catch (e) {}

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('open')) {
        closeLightbox();
      } else if (modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    }
  });
}

/* ==========================================================================
   5. FORMULARIO DE CONTACTO & TOAST ACCESIBLE
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('mainContactForm');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  const errorBox = document.getElementById('formErrorBox');

  if (!form) return;

  const showError = (msg) => {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = 'block';
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const hideError = () => {
    if (errorBox) {
      errorBox.textContent = '';
      errorBox.style.display = 'none';
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const motivo = document.getElementById('motivo').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    const privacidad = document.getElementById('privacidad');

    if (!nombre) {
      showError('Por favor, indica tu nombre completo.');
      document.getElementById('nombre').focus();
      return;
    }

    if (!email) {
      showError('Por favor, introduce tu correo electrónico.');
      document.getElementById('email').focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('Por favor, introduce una dirección de correo electrónico válida (ejemplo: nombre@correo.com).');
      document.getElementById('email').focus();
      return;
    }

    if (!motivo) {
      showError('Por favor, selecciona el motivo de tu consulta.');
      document.getElementById('motivo').focus();
      return;
    }

    if (!mensaje) {
      showError('Por favor, escribe tu mensaje o consulta.');
      document.getElementById('mensaje').focus();
      return;
    }

    if (privacidad && !privacidad.checked) {
      showError('Debes aceptar la Política de Privacidad para poder enviar el formulario.');
      privacidad.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Enviando mensaje...</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="spin-icon">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
    `;

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        trackInteraction('submit-formulario', { motivo: motivo });
        if (toast && toastMsg) {
          toastMsg.textContent = `¡Muchas gracias, ${nombre}! Hemos recibido tu mensaje sobre "${motivo}" y te responderemos en breve a tu correo.`;
          toast.classList.add('show');

          setTimeout(() => {
            toast.classList.remove('show');
          }, 6000);
        }
        form.reset();
        hideError();
      } else {
        showError(result.message || 'Hubo un error al procesar el envío. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      showError('Error de conexión al enviar el formulario. También puedes escribirnos directamente a: info@enlacemosnuestrasmanos.org o llamarnos al 635 09 53 01.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ==========================================================================
   MODAL LEGAL ACCESIBLE (AVISO LEGAL Y PRIVACIDAD RGPD)
   ========================================================================== */
window.openLegalModal = function(type) {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  switchLegalTab(type || 'aviso');
};

window.closeLegalModal = function() {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

window.switchLegalTab = function(type) {
  const contentAviso = document.getElementById('contentAvisoLegal');
  const contentPriv = document.getElementById('contentPrivacidad');
  const tabAviso = document.getElementById('tabAviso');
  const tabPriv = document.getElementById('tabPrivacidad');

  if (type === 'privacidad') {
    if (contentAviso) contentAviso.style.display = 'none';
    if (contentPriv) contentPriv.style.display = 'block';
    if (tabAviso) tabAviso.classList.remove('active');
    if (tabPriv) tabPriv.classList.add('active');
  } else {
    if (contentAviso) contentAviso.style.display = 'block';
    if (contentPriv) contentPriv.style.display = 'none';
    if (tabAviso) tabAviso.classList.add('active');
    if (tabPriv) tabPriv.classList.remove('active');
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const legalModal = document.getElementById('legalModal');
    if (legalModal && legalModal.style.display === 'flex') {
      closeLegalModal();
    }
  }
});

/* ==========================================================================
   6. BOTÓN VOLVER ARRIBA
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. DESPLAZAMIENTO SUAVE
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.startsWith('#!')) return;

      try {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      } catch (err) {
        // Ignora silenciosamente selectores que no sean elementos del DOM
      }
    });
  });
}

/* ==========================================================================
   8. DESPLEGABLES QUIÉNES SOMOS (PRIMERA ACOGIDA Y RED COMUNITARIA)
   ========================================================================== */
function initRedComunitariaDropdown() {
  const entityButtons = document.querySelectorAll('.network-entity-btn');
  const detailContainer = document.getElementById('networkEntityDetail');

  const dropdownConfigs = [
    {
      key: 'acogida',
      toggleBtn: document.getElementById('primeraAcogidaToggle'),
      closeBtn: document.getElementById('primeraAcogidaClose'),
      panel: document.getElementById('primera-acogida'),
      openLabel: 'Ocultar Primera Acogida',
      closedLabel: 'Ver información y horarios'
    },
    {
      key: 'red',
      toggleBtn: document.getElementById('redComunitariaToggle'),
      closeBtn: document.getElementById('redComunitariaClose'),
      panel: document.getElementById('redComunitariaPanel'),
      openLabel: 'Ocultar Proyecto Solidaridad en Red',
      closedLabel: 'Ver Proyecto Solidaridad en Red'
    }
  ].filter((cfg) => cfg.toggleBtn && cfg.panel);

  if (!dropdownConfigs.length) return;

  const setConfigState = (cfg, isOpen) => {
    cfg.toggleBtn.setAttribute('aria-expanded', String(isOpen));
    cfg.panel.setAttribute('aria-hidden', String(!isOpen));
    cfg.panel.classList.toggle('open', isOpen);
    cfg.panel.inert = !isOpen;

    const ctaText = cfg.toggleBtn.querySelector('.about-feature-cta-text');
    if (ctaText) {
      ctaText.textContent = isOpen ? cfg.openLabel : cfg.closedLabel;
    }
  };

  dropdownConfigs.forEach((cfg) => {
    setConfigState(cfg, false);

    cfg.toggleBtn.addEventListener('click', () => {
      const isCurrentlyOpen = cfg.panel.classList.contains('open');

      // Cerrar cualquier otro desplegable abierto en la misma sección
      dropdownConfigs.forEach((other) => {
        if (other !== cfg && other.panel.classList.contains('open')) {
          setConfigState(other, false);
        }
      });

      setConfigState(cfg, !isCurrentlyOpen);

      if (!isCurrentlyOpen) {
        setTimeout(() => {
          const rect = cfg.panel.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.72) {
            cfg.panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 120);
      }
    });

    if (cfg.closeBtn) {
      cfg.closeBtn.addEventListener('click', () => {
        setConfigState(cfg, false);
        cfg.toggleBtn.focus();
      });
    }
  });

  if (window.location.hash === '#primera-acogida') {
    const acogidaCfg = dropdownConfigs.find((cfg) => cfg.key === 'acogida');
    if (acogidaCfg) setConfigState(acogidaCfg, true);
  }

  const totalColonias = 1510;
  const entityDeliveries = {
    enlacemos: {
      name: 'Asociación Enlacemos Nuestras Manos',
      colonias: 630,
      image: 'Imagen25.webp',
      isPhoto: true,
      imageAlt: 'Entrega de colonias y juguetes en la Asociación Enlacemos Nuestras Manos',
      summary: 'Reparto directo desde nuestra sede en el barrio de Sagrada Família (Barcelona) a niños y niñas de familias atendidas en la asociación, combinando colonias y juguetes para que tuvieran un regalo el día de Reyes.',
      gallery: [
        { src: 'Imagen25.webp', alt: 'Mesa de entrega de colonias y regalos de Reyes' },
        { src: 'Imagen27.webp', alt: 'Preparación de colonias y juguetes para las familias' }
      ]
    },
    gradeblat: {
      name: 'El Gra de Blat',
      colonias: 600,
      image: '96.webp',
      isPhoto: false,
      imageAlt: 'Logotipo de El Gra de Blat',
      summary: 'Entrega de 600 colonias a la entidad colaboradora El Gra de Blat dentro del proyecto Solidaridad en Red, ampliando el alcance del donativo de Air Val Internacional S.A. a más familias y menores en situación de vulnerabilidad.',
      website: 'https://www.facebook.com/gradeblat/?locale=es_ES'
    },
    estel: {
      name: "L'Estel del Matí",
      colonias: 260,
      image: '97.webp',
      isPhoto: false,
      imageAlt: "Identidad de Associació Col·lectiu Cristià L'Estel del Matí",
      summary: "Distribución de 260 colonias al Col·lectiu Cristià L'Estel del Matí (Granollers) para sumarlas a su campaña solidaria de Navidad y llevar un detalle de Reyes a niños y niñas de familias en riesgo de exclusión social.",
      website: 'https://www.granollers.cat/adreces/cooperacio-i-desenvolupament/col%C2%B7lectiu-cristia-lestel-del-mati-granollers'
    },
    emmanuel: {
      name: 'Residencia Infantil Emmanuel',
      colonias: 20,
      image: '95.webp',
      isPhoto: true,
      imageAlt: 'Residencia Infantil Emmanuel',
      summary: 'Entrega de 20 colonias destinadas a los niños y niñas acogidos en la Residencia Infantil Emmanuel, compartiendo la ilusión del día de Reyes dentro de la red de entidades colaboradoras.',
      website: 'https://resi-rie.org/'
    }
  };

  let activeEntityKey = null;

  const clearActiveEntity = () => {
    activeEntityKey = null;
    entityButtons.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      const hintSpan = btn.querySelector('.network-entity-hint span');
      if (hintSpan) hintSpan.textContent = 'Ver entrega';
    });
    if (detailContainer) {
      detailContainer.hidden = true;
      detailContainer.innerHTML = '';
    }
  };

  const renderEntityDetail = (key) => {
    const data = entityDeliveries[key];
    if (!data || !detailContainer) return;

    const percent = ((data.colonias / totalColonias) * 100).toFixed(1).replace('.', ',');
    const percentWidth = Math.max(4, Math.round((data.colonias / totalColonias) * 100));

    let extraActionsHtml = '';
    if (data.gallery && data.gallery.length > 0) {
      const thumbs = data.gallery.map((photo, idx) => {
        const thumbSrc = photo.src.replace(/\.webp$/, '-sm.webp');
        return `
          <button type="button" class="network-detail-thumb" data-lightbox-src="${photo.src}" aria-label="Ampliar foto ${idx + 1} de la entrega en ${data.name}">
            <img src="${thumbSrc}" alt="${photo.alt}" loading="lazy" width="100" height="75">
          </button>
        `;
      }).join('');
      extraActionsHtml += `<div class="network-detail-thumbs">${thumbs}</div>`;
    }

    if (data.website) {
      extraActionsHtml += `
        <a href="${data.website}" target="_blank" rel="noopener noreferrer" class="network-detail-link">
          <span>Conocer la entidad</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;
    }

    detailContainer.innerHTML = `
      <div class="network-detail-layout">
        <button type="button" class="network-detail-media ${data.isPhoto ? 'is-photo' : ''}" data-lightbox-src="${data.image}" aria-label="Ampliar imagen de ${data.name}">
          <img src="${data.image}" alt="${data.imageAlt}" loading="lazy">
        </button>
        <div>
          <div class="network-detail-top">
            <h5>${data.name}</h5>
            <span class="network-detail-pill">${data.colonias} colonias</span>
          </div>
          <p class="network-detail-text">${data.summary}</p>
          <div class="network-detail-bar-wrap">
            <div class="network-detail-bar-meta">
              <span>Parte del reparto en red</span>
              <span>${data.colonias} de ${totalColonias.toLocaleString('es-ES')} colonias (${percent} %)</span>
            </div>
            <div class="network-detail-bar-track" aria-hidden="true">
              <div class="network-detail-bar-fill" style="width: ${percentWidth}%;"></div>
            </div>
          </div>
          ${extraActionsHtml ? `<div class="network-detail-actions">${extraActionsHtml}</div>` : ''}
        </div>
      </div>
    `;

    detailContainer.querySelectorAll('[data-lightbox-src]').forEach((el) => {
      el.addEventListener('click', () => {
        const src = el.getAttribute('data-lightbox-src');
        if (src && typeof window.openLightbox === 'function') {
          window.openLightbox(src);
        }
      });
    });

    detailContainer.hidden = false;
  };

  entityButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-entity');
      if (!key) return;

      if (activeEntityKey === key) {
        clearActiveEntity();
        return;
      }

      activeEntityKey = key;
      entityButtons.forEach((item) => {
        const isSelected = item === btn;
        item.classList.toggle('active', isSelected);
        item.setAttribute('aria-expanded', String(isSelected));
        const hintSpan = item.querySelector('.network-entity-hint span');
        if (hintSpan) hintSpan.textContent = isSelected ? 'Ocultar entrega' : 'Ver entrega';
      });

      renderEntityDetail(key);
    });
  });
}

/* ==========================================================================
   8. REGISTRO DE EVENTOS E INTERACCIONES (Teléfono, Maps, Email, Formulario)
   ========================================================================== */
function trackInteraction(eventName, eventDetails = {}) {
  // 1. Envío silencioso a Cloudflare Edge (0 cookies, sin demoras de carga)
  try {
    const endpoint = `/api/event/${eventName}.json`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint);
    } else {
      fetch(endpoint, { method: 'GET', keepalive: true, cache: 'no-store' }).catch(() => {});
    }
  } catch (e) {
    // Silencioso
  }

  // 2. Google Analytics 4 (activo y sincronizado con gtag y dataLayer)
  const gaEventName = eventName.replace(/-/g, '_');
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', gaEventName, eventDetails);
    }
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: gaEventName }, eventDetails));
    }
  } catch (e) {
    // Silencioso
  }
}

function initInteractionTracking() {
  // Clics en llamada telefónica (+34 635 09 53 01)
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      const tel = link.getAttribute('href').replace('tel:', '');
      trackInteraction('click-telefono', {
        telefono: tel,
        event_category: 'contacto',
        event_label: tel
      });
    }, { passive: true });
  });

  // Clics en correo electrónico
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href').replace('mailto:', '');
      trackInteraction('click-email', {
        email: email,
        event_category: 'contacto',
        event_label: email
      });
    }, { passive: true });
  });

  // Clics en dirección de Google Maps
  document.querySelectorAll('a[href*="google.com/maps"], a[href*="maps.google"]').forEach(link => {
    link.addEventListener('click', () => {
      trackInteraction('click-maps', {
        direccion: 'Passatge de Gaiola, 8, 12',
        event_category: 'contacto',
        event_label: 'Google Maps Gaiola'
      });
    }, { passive: true });
  });

  // Clics en perfil de Instagram
  document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
    link.addEventListener('click', () => {
      trackInteraction('click-instagram', {
        red_social: 'instagram',
        cuenta: 'enlacemosnuestrasmanos',
        event_category: 'redes_sociales',
        event_label: 'Instagram oficial'
      });
    }, { passive: true });
  });
}

/* ==========================================================================
   9. GESTIÓN DEL CONSENTIMIENTO DE COOKIES (RGPD / AEPD)
   ========================================================================== */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const btnAccept = document.getElementById('btnAcceptCookies');
  const btnReject = document.getElementById('btnRejectCookies');

  if (!banner) return;

  function dismissBanner(consentValue) {
    try {
      localStorage.setItem('cookie_consent', consentValue);
    } catch (e) {}
    banner.style.display = 'none';
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': consentValue === 'accepted' ? 'granted' : 'denied'
      });
    }
  }

  // Vincular eventos de cierre de forma permanente
  if (btnAccept) {
    btnAccept.addEventListener('click', function(e) {
      if (e) e.preventDefault();
      dismissBanner('accepted');
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', function(e) {
      if (e) e.preventDefault();
      dismissBanner('rejected');
    });
  }

  // Verificación de consentimiento previo: solo se muestra en la primera visita
  var savedConsent = null;
  try {
    savedConsent = localStorage.getItem('cookie_consent');
  } catch (e) {}

  if (savedConsent) {
    banner.style.display = 'none';
    return;
  }

  // Muestra el banner únicamente al inicio
  setTimeout(function() {
    try {
      if (localStorage.getItem('cookie_consent')) return;
    } catch (e) {}
    banner.style.display = 'block';
  }, 600);
}


