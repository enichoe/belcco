document.addEventListener('DOMContentLoaded', function() {

  // --- NAVBAR SCROLL BEHAVIOR ---
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Function to update active link
  function updateActiveLink() {
    let currentSection = '';
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active link on scroll and load
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Initial call

  // --- TOGGLE FULL SERVICES LIST ---
  const toggleBtn = document.getElementById('toggleFullList');
  const fullList = document.getElementById('fullServices');
  if (toggleBtn && fullList) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = fullList.classList.contains('collapse');
      toggleBtn.textContent = isHidden ? 'Ocultar lista completa' : 'Ver lista completa de servicios';
    });
  }

  // --- CHATBOT ---
  const openChatBtn = document.getElementById('openChat');
  const closeChatBtn = document.getElementById('closeChat');
  const chatWindow = document.getElementById('chatWindow');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('messages');
  const presetButtons = document.querySelectorAll('.preset-btn');

  if (openChatBtn) openChatBtn.addEventListener('click', () => chatWindow.style.display = 'block');
  if (closeChatBtn) closeChatBtn.addEventListener('click', () => chatWindow.style.display = 'none');

  // Function to add a message to the chat
  function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.className = `mb-2 p-2 rounded ${sender === 'user' ? 'bg-primary text-white align-self-end' : 'bg-light text-dark'}`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Handle preset button clicks
  presetButtons.forEach(button => {
    button.addEventListener('click', () => {
      const msg = button.getAttribute('data-msg');
      addMessage(msg);
      handleBotResponse(msg);
      document.getElementById('presetQuestions').style.display = 'none';
    });
  });

  // Handle form submission
  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const userMsg = chatInput.value.trim();
      if (userMsg) {
        addMessage(userMsg);
        handleBotResponse(userMsg);
        chatInput.value = '';
        document.getElementById('presetQuestions').style.display = 'none';
      }
    });
  }

  // Lógica del bot mejorada
  function handleBotResponse(msg) {
    const userMsg = msg.toLowerCase();
    let response = "Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto."; // Respuesta por defecto

    // Base de conocimiento del bot (palabras clave y respuestas)
    const knowledgeBase = {
      "horario": "Nuestro horario de atención es de Lunes a Viernes de 9am a 6pm.",
      "horarios": "Nuestro horario de atención es de Lunes a Viernes de 9am a 6pm.",
      "servicio": "Ofrecemos desarrollo web, soporte técnico, venta de equipos, automatizaciones, ciberseguridad y capacitaciones. Puedes ver la lista completa en la sección 'Servicios'. ¿Te interesa alguno en particular?",
      "servicios": "Ofrecemos desarrollo web, soporte técnico, venta de equipos, automatizaciones, ciberseguridad y capacitaciones. Puedes ver la lista completa en la sección 'Servicios'. ¿Te interesa alguno en particular?",
      "soporte": "El soporte técnico básico tiene un costo desde S/50. La oferta del mes incluye un paquete de mantenimiento completo por S/60. Para una cotización exacta, por favor detalla tu problema.",
      "precio": "Los precios varían según el servicio. Por ejemplo, el desarrollo web empieza en S/350 y el soporte desde S/50. ¿Sobre qué servicio te gustaría saber el precio?",
      "costo": "Los precios varían según el servicio. Por ejemplo, el desarrollo web empieza en S/350 y el soporte desde S/50. ¿Sobre qué servicio te gustaría saber el precio?",
      "web": "Una página web corporativa puede estar lista entre 7 y 14 días. Ofrecemos desde landing pages hasta tiendas online completas. ¿Qué tipo de web necesitas?",
      "página": "Una página web corporativa puede estar lista entre 7 y 14 días. Ofrecemos desde landing pages hasta tiendas online completas. ¿Qué tipo de web necesitas?",
      "cuotas": "Sí, ofrecemos facilidades de pago. Para proyectos grandes, el pago se puede dividir en 2 o 3 cuotas.",
      "pagar": "Sí, ofrecemos facilidades de pago. Para proyectos grandes, el pago se puede dividir en 2 o 3 cuotas.",
      "oferta": "La oferta de este mes es un paquete de mantenimiento completo para tu PC o laptop por solo S/60. Incluye limpieza, optimización, eliminación de virus y más.",
      "gracias": "¡De nada! Si tienes otra pregunta, no dudes en consultarnos."
    };

    // Buscar una coincidencia en la base de conocimiento
    for (const keyword in knowledgeBase) {
      if (userMsg.includes(keyword)) {
        response = knowledgeBase[keyword];
        break; // Detenerse en la primera coincidencia
      }
    }

    setTimeout(() => addMessage(response, 'bot'), 800);
  }

  // --- UPDATE YEAR IN FOOTER ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // --- MODAL LOGIC ---
  const myModal = new bootstrap.Modal(document.getElementById('couponModal'));

  // Show at 10 seconds
  setTimeout(() => myModal.show(), 10000);

  // Show at 1 minute
  setTimeout(() => myModal.show(), 60000);

  // Show at 5 minutes
  setTimeout(() => myModal.show(), 300000);
});

// --- ANIMATE ON SCROLL ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      // Optional: remove class to re-animate on scroll up
      // entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe all sections with an ID
document.querySelectorAll('section[id]').forEach((section) => {
  observer.observe(section);
});

// Also observe the hero header
const hero = document.querySelector('.hero');
if (hero) {
  observer.observe(hero);
}
