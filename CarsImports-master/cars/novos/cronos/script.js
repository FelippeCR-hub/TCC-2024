let currentImageIndex = 0;
const images = ['dentro.jpg', 'frente.jpg', 'tras.jpg', 'lado.jpg','dianteira.jpg','porta.jpg','motor.jpg','banco.jpg','roda.jpg'];
function openLightbox(image) {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox-image').src = image;
    currentImageIndex = images.indexOf(image);
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('lightbox-image').src = images[currentImageIndex];
}
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById("lightbox-image").src = images[currentImageIndex];
    document.getElementById("lightbox-image").style.transform = "scale(1.1)";
}
document.addEventListener('keydown', function(event) {
    if (document.getElementById("lightbox").style.display === "block") {
        if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});