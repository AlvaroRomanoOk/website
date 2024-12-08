document.querySelectorAll('.cliqueable').forEach(li => {
    li.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });

    // Soporte para teclado
    li.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const url = this.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    }
  });
  
});

