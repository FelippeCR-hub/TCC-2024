document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;


    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }


    hamburger.addEventListener('click', toggleMenu);


    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) &&
            !navMenu.contains(e.target) &&
            navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });


    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});