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








