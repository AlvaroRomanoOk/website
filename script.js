// 1. FUNCIÓN CARGAR SECCIÓN (UNIFICADA)
function cargarSeccion(url) {
    const navMenu = document.querySelector('.nav') || document.querySelector('#nav');
    if (navMenu) navMenu.classList.remove('visible');

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar la sección");
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;

            // SEO y limpieza de URL al cambiar de página
            const nombrePagina = url.split('/').pop().replace('.html', '');
            window.history.pushState({path: nombrePagina}, '', nombrePagina);
            document.title = "Alvaro Romano | " + nombrePagina.toUpperCase();
            
            // Forzar limpieza de cualquier ancla residual al cargar nueva sección
            history.replaceState(null, document.title, window.location.pathname);
        })
        .catch(error => console.error(error));
}

// 2. NAVEGACIÓN MOBILE
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => nav.classList.add("visible"));
cerrar.addEventListener("click", () => nav.classList.remove("visible"));

// 3. LÓGICA DE SCROLL Y ELIMINACIÓN DE ANCLAS
let isScrolling = false;

const handleUniversalScroll = (event) => {
    if (window.innerWidth < 1280) return;

    const panels = Array.from(document.querySelectorAll('.snap-section'));
    if (panels.length === 0) return;

    event.preventDefault();
    if (isScrolling) return;

    const headerHeight = 96;
    const currentScroll = window.scrollY + headerHeight;
    
    const currentIndex = panels.findIndex(panel => {
        return panel.offsetTop >= currentScroll - 10 && panel.offsetTop <= currentScroll + 10;
    });

    let targetPanel;
    if (event.deltaY > 0) {
        targetPanel = panels[currentIndex + 1];
    } else {
        targetPanel = panels[currentIndex - 1];
    }

    if (targetPanel) {
        isScrolling = true;
        
        window.scrollTo({
            top: targetPanel.offsetTop - headerHeight,
            behavior: 'smooth'
        });

        // --- AQUÍ VA LA LIMPIEZA DE LA URL ---
        // Esto elimina el #fragmento mientras haces scroll
        history.replaceState(null, document.title, window.location.pathname + window.location.search);

        setTimeout(() => {
            isScrolling = false;
        }, 700);
    }
};

// Eventos iniciales
window.onload = () => cargarSeccion('pages/inicio.html');
window.addEventListener('wheel', handleUniversalScroll, { passive: false });