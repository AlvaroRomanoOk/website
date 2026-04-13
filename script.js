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

            const nombrePagina = url.split('/').pop().replace('.html', '');
            
            // Actualizamos el historial y el título
            window.history.pushState({path: nombrePagina}, '', nombrePagina);
            document.title = "Alvaro Romano | " + nombrePagina.toUpperCase();
            
            // Forzamos que la URL no tenga ningún #
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

        history.replaceState(null, document.title, window.location.pathname + window.location.search);

        setTimeout(() => {
            isScrolling = false;
        }, 700);
    }
};

// 4. EVENTOS INICIALES Y CARGA INTELIGENTE (EL AJUSTE NUEVO)
window.addEventListener('load', () => {
    // Obtenemos la última parte de la URL de forma segura
    let path = window.location.pathname.split('/').filter(p => p !== "").pop();
    
    // Si la ruta está vacía o es index, cargar inicio.html
    if (!path || path === 'index') {
        cargarSeccion('pages/inicio.html');
    } else {
        // Carga la página correspondiente (inicio, contacto, etc.)
        cargarSeccion(`pages/${path}.html`);
    }

    if (window.location.hash) {
        setTimeout(() => {
            history.replaceState(null, document.title, window.location.pathname);
        }, 10);
    }
});

window.addEventListener('wheel', handleUniversalScroll, { passive: false });

// 5. INTERCEPTAR CLICS EN EL MENÚ
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        const targetId = link.getAttribute('href').slice(1);
        if (!targetId) return;

        e.preventDefault(); 

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = 96;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });

            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    }
});