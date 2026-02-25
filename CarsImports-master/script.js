document.addEventListener('DOMContentLoaded', function () {

    AOS.init({
        duration: 800,
        once: true
    });


    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });


    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });


    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {

                    const offsetTop = targetSection.offsetTop - 80;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth',

                        easing: function (t) {
                            return t < 0.5 ?
                                4 * t * t * t :
                                (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                        }
                    });


                    links.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');


                    history.pushState(null, null, targetId);
                }
            });
        });


        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });


            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    });


    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.addEventListener('touchmove', () => {});
    }


    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;


            const mouseX = `${(x / rect.width) * 100}%`;
            const mouseY = `${(y / rect.height) * 100}%`;


            card.style.setProperty('--mouse-x', mouseX);
            card.style.setProperty('--mouse-y', mouseY);
        });


        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });


    const swiper = new Swiper('.carrosselCarros', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            enabled: false
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });


    document.querySelector('.carrosselCarros').addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });

    document.querySelector('.carrosselCarros').addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });


    const filters = {
        price: document.getElementById('price'),
        color: document.getElementById('color'),
        brand: document.getElementById('brand'),
        cate: document.getElementById('cate')
    };


    const cards = document.querySelectorAll('.card');
    const resetButton = document.querySelector('.reset-filter-btn');


    function filterCars() {
        const selectedFilters = {
            price: filters.price.value,
            color: filters.color.value,
            brand: filters.brand.value,
            cate: filters.cate.value
        };

        cards.forEach(card => {
            let shouldShow = true;
            const cardPrice = parseInt(card.dataset.price);
            const cardColor = card.dataset.color;
            const cardBrand = card.dataset.brand;
            const cardCategory = card.dataset.category;


            if (selectedFilters.price !== 'todas') {
                switch (selectedFilters.price) {
                    case 'ate-200000':
                        shouldShow = cardPrice <= 200000;
                        break;
                    case '200000-400000':
                        shouldShow = cardPrice > 200000 && cardPrice <= 400000;
                        break;
                    case 'acima-400000':
                        shouldShow = cardPrice > 400000;
                        break;
                }
            }


            if (shouldShow && selectedFilters.color !== 'todas') {
                shouldShow = cardColor === selectedFilters.color;
            }


            if (shouldShow && selectedFilters.brand !== 'todas') {
                shouldShow = cardBrand === selectedFilters.brand;
            }


            if (shouldShow && selectedFilters.cate !== 'todas') {
                shouldShow = cardCategory === selectedFilters.cate;
            }


            if (shouldShow) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.classList.add('visible');
                }, 50);
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });


        checkNoResults();
    }


    function checkNoResults() {
        const visibleCards = document.querySelectorAll('.card:not(.hidden)');
        const noResultsEl = document.querySelector('.no-results');

        if (visibleCards.length === 0) {
            if (!noResultsEl) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <h3>Nenhum carro encontrado</h3>
                    <p>Tente ajustar os filtros para ver mais opções.</p>
                `;
                document.querySelector('.card-row').after(message);
            } else {
                noResultsEl.style.display = 'block';
            }
        } else if (noResultsEl) {
            noResultsEl.style.display = 'none';
        }
    }


    function resetFilters() {

        Object.values(filters).forEach(filter => {
            filter.value = 'todas';
        });


        cards.forEach(card => {
            card.classList.remove('hidden');
            card.classList.add('visible');
        });


        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }


    Object.values(filters).forEach(filter => {
        filter.addEventListener('change', filterCars);
    });


    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
});