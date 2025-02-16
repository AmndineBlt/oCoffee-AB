// BURGER MENU
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger-menu");
    const navLinks = document.getElementById("nav-links");

    burger.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        // Changer l'icône au clic
        if (navLinks.classList.contains("active")) {
            burger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
});

// CARROUSEL
document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('#coffee-carousel', {
        type       : 'loop',   // Permet le défilement infini
        perPage    : 1,        // Nombre d'éléments visibles à la fois
        gap        : '1rem',   // Espace entre les éléments
        autoplay  : true,       // Lancer le carrousel automatiquement
        focus      : 'center', // Centrer l'élément actif
        arrows     : true,     // Affiche les flèches de navigation
        pagination: true,     // Affiche la pagination
        breakpoints: {
            768: {
                perPage: 1,  // Carrousel sur 1 élément pour les écrans plus petits
            },
            1024: {
                perPage: 2,  // Carrousel sur 2 éléments pour les écrans moyens
            },
        },
    });

    splide.mount(); // Il faut appeler mount() sur l'instance splide.
});
