// li -> Button

document.querySelectorAll('.cliqueable').forEach(element => {
    element.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });

    // Soporte para teclado
    element.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const url = this.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    }
  });
  
});
