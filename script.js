function cargarSeccion(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            
            // --- ESTO MEJORA EL SEO ---
            // Cambia la URL en la barra del navegador sin recargar la página
            const nombrePagina = url.split('/').pop().replace('.html', '');
            window.history.pushState({path: nombrePagina}, '', nombrePagina);
            
            // Cambia el título de la pestaña para que Google sepa dónde está
            document.title = "Alvaro Romano | " + nombrePagina.toUpperCase();
        });
}






const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})





function cargarSeccion(archivo) {

    document.querySelector('.nav').classList.remove('visible');

    fetch(archivo)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar la sección");
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error(error));
}

window.onload = () => cargarSeccion('pages/inicio.html');









let isScrolling = false; // Bloqueo para evitar saltos múltiples accidentales

const handleUniversalScroll = (event) => {
    if (window.innerWidth < 1280) return;

    // Buscamos qué paneles "snap" hay en el DOM actualmente
    const panels = Array.from(document.querySelectorAll('.snap-section'));
    
    // Si no hay paneles con esa clase, dejamos que el scroll sea normal
    if (panels.length === 0) return;

    event.preventDefault();

    // Si ya se está moviendo, ignoramos nuevos movimientos de rueda
    if (isScrolling) return;

    const headerHeight = 96;
    // Buscamos cuál es el panel que está más cerca del tope actual
    const currentScroll = window.scrollY + headerHeight;
    
    // Encontramos el índice del panel actual
    const currentIndex = panels.findIndex(panel => {
        return panel.offsetTop >= currentScroll - 10 && panel.offsetTop <= currentScroll + 10;
    });

    let targetPanel;

    if (event.deltaY > 0) {
        // Hacia abajo: ir al siguiente panel si existe
        targetPanel = panels[currentIndex + 1];
    } else {
        // Hacia arriba: ir al panel anterior si existe
        targetPanel = panels[currentIndex - 1];
    }

    if (targetPanel) {
        isScrolling = true;
        window.scrollTo({
            top: targetPanel.offsetTop - headerHeight,
            behavior: 'smooth'
        });

        // Desbloqueamos después de que termine la animación (aprox 700ms)
        setTimeout(() => {
            isScrolling = false;
        }, 700);
    }
};

window.addEventListener('wheel', handleUniversalScroll, { passive: false });