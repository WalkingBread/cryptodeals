
const mobile_view = document.querySelector('.crd-mobile-view');
const nav = document.querySelector('.crd-nav-links');
const nav_links = document.querySelectorAll('.crd-nav-links li');

mobile_view.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    nav_links.forEach((link, index) => {
        if(link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index  / 7 + 0.5}s`;
        }
    });

    mobile_view.classList.toggle('toggle')
});