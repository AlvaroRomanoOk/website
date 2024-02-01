const button = document.querySelector('.menu');
const nav = document.querySelector('.nav');

function closeMenu() {
    nav.classList.remove('active');
}

button.addEventListener('click', () => {
    nav.classList.toggle('active');
});


const menuLinks = document.querySelectorAll('.nav a');

menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});
