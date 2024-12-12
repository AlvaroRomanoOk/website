// Selecciona todos los elementos con la clase "cliqueable"
document.querySelectorAll('.cliqueable').forEach(element => {
  // Agrega un listener de eventos para el click en cada elemento seleccionado
  element.addEventListener('click', function() {
    // Obtiene el valor del atributo "data-url" del elemento clickeado
    const url = this.getAttribute('data-url');
      //Si el atributo "data-url" está definido, redirige al usuario al a URL especificada
      if (url) {
        window.location.href = url;
      }
  });

    // Agrega soporte para accesibilidad: permite navegar con el teclado
    element.addEventListener('keypress', function (event) {
      // Verifica si la tecla presionada es "Enter"
      if (event.key === 'Enter') {
        // Obtiene el valor del atributo "data-url" del elemento enfocado
        const url = this.getAttribute('data-url');
      //Si el atributo "data-url" está definido, redirige al usuario al a URL especificada
      if (url) {
        window.location.href = url;
      }
    }
  });

});
