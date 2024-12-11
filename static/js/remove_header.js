// Configuración del Intersection Observer API

const header = document.querySelector('header');
const contacto = document.querySelector('#contacto');

// Configuración del Intersection Observer API

const observerOptions = {
    root: null,
    threshold: [0.74, 0.75],
};

// Callback del Observer

const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    });
};

// Crear el Observer y observar la sección
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(contacto);