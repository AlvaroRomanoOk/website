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
            
            // Actualizamos el historial y el título
            window.history.pushState({path: nombrePagina}, '', nombrePagina);
            document.title = "Alvaro Romano | " + nombrePagina.toUpperCase();
            
            // Forzamos que la URL no tenga ningún # al cargar la nueva página 
            history.replaceState(null, document.title, window.location.pathname);
        })
        .catch(error => console.error(error));
}

// 2. NAVEGACIÓN MOBILE
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

if (abrir && cerrar) {
    abrir.addEventListener("click", () => nav.classList.add("visible"));
    cerrar.addEventListener("click", () => nav.classList.remove("visible"));
}

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

        // Limpieza de la URL durante el scroll 
        history.replaceState(null, document.title, window.location.pathname + window.location.search);

        setTimeout(() => {
            isScrolling = false;
        }, 700);
    }
};

// 4. EVENTOS INICIALES Y CARGA INTELIGENTE
window.addEventListener('load', () => {
    // Detectamos la URL actual para no cargar siempre "inicio" al refrescar
    const path = window.location.pathname.replace('/', '');
    
    if (path === '' || path === 'index' || path === 'inicio') {
        cargarSeccion('pages/inicio.html');
    } else {
        // Intenta cargar la página según la URL actual
        cargarSeccion(`pages/${path}.html`);
    }

    // Limpieza de hash si el usuario entró con un enlace directo con # 
    if (window.location.hash) {
        setTimeout(() => {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }, 10);
    }
});

window.addEventListener('wheel', handleUniversalScroll, { passive: false });

// 5. INTERCEPTAR CLICS EN EL MENÚ (Para evitar que aparezca el # momentáneamente)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        const targetId = link.getAttribute('href').slice(1);
        if (!targetId) return; // Si es solo "#", no hacemos nada

        e.preventDefault(); 

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = 96;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });

            // Borramos el rastro del # en la URL inmediatamente 
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    }
});