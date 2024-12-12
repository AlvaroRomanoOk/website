// Selección de elementos en el DOM
const header = document.querySelector('header'); // Selecciona el elemento <header>
const contacto = document.querySelector('#contacto'); // Selecciona el elemento con ID "contacto"

// Configuración del Intersection Observer API
const observerOptions = {
    root: null, // Define el contenedor raíz como el viewport (valor por defecto)
    threshold: [0.74, 0.75], // Define los puntos de intersección en los que se activará el callback
};

// Callback del Intersection Observer
const observerCallback = (entries) => {
    // Itera sobre las entradas de intersección
    entries.forEach((entry) => {
        // Si el elemento está visible y el ratio de intersección es igual o mayor al 75%
        if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            // Añade la clase 'hidden' al elemento <header>
            header.classList.add('hidden');
        } else {
            // Quita la clase 'hidden' si el elemento ya no está visible
            header.classList.remove('hidden');
        }
    });
};

// Crear el Intersection Observer y observar la sección "contacto"
const observer = new IntersectionObserver(observerCallback, observerOptions);
// Comienza a observar el elemento seleccionado
observer.observe(contacto);
