// Script para que en la url, sin importar el enlace, siempre se muestre "https://www.alvaroromano.com"

window.onload = function () {
    window.history.pushState(
        '',
        document.title,
        'https://www.alvaroromano.com'
    );
}
