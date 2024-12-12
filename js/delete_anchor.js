// Agrega un manejador al evento "onhashchange" de la ventana
// Este evento se activa cuando el fragmento del hash en la URL cambia
window.onhashchange = function () {
    // Usa el método pushState para actualizar el historial del navegador
    // Reemplaza el estado actual sin el fragmento del hash en la URL
    window.history.pushState(
        '',                   // Estado vacío: no se pasa información adicional al historial
        document.title,       // Mantiene el título actual de la página
        window.location.pathname // Define la URL sin incluir el fragmento del hash
    );
};
