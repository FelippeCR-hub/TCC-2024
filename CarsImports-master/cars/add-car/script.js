function popularAnosSelect() {
    const anoSelect = document.getElementById('ano');
    const anoAtual = new Date().getFullYear() + 1;

    for (let ano = anoAtual; ano >= 1990; ano--) {
        const option = document.createElement('option');
        option.value = ano;
        option.textContent = ano;
        anoSelect.appendChild(option);
    }
}


document.addEventListener('DOMContentLoaded', popularAnosSelect);


document.getElementById('carForm')?.addEventListener('submit', function (event) {
    event.preventDefault();


    const nome = document.getElementById('nome').value;
    const marca = document.getElementById('marca').value;
    const cor = document.getElementById('cor').value;
    const estado = document.getElementById('estado').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const detalhes = document.getElementById('detalhes').value;
    const ano = document.getElementById('ano').value;
    const categoria = document.getElementById('categoria').value;
    const numPortas = document.getElementById('numPortas').value;
    const numAssentos = document.getElementById('numAssentos').value;
    const combustivel = document.getElementById('combustivel').value;
    const cambio = document.getElementById('cambio').value;


    const imagens = document.getElementById('imagem').files;
    let imagensArray = [];
    for (let i = 0; i < imagens.length; i++) {
        const url = URL.createObjectURL(imagens[i]);
        imagensArray.push(url);
    }


    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    carros.push({
        nome,
        marca,
        cor,
        estado,
        valor,
        detalhes,
        imagensArray,
        ano,
        categoria,
        numPortas,
        numAssentos,
        combustivel,
        cambio
    });
    localStorage.setItem('carros', JSON.stringify(carros));


    window.location.href = 'pp.html';
});


window.onload = function () {
    if (window.location.pathname.endsWith('pp.html')) {
        const carros = JSON.parse(localStorage.getItem('carros')) || [];
        const carsList = document.getElementById('carsList');
        carsList.innerHTML = '';

        carros.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');


            if (car.imagensArray && car.imagensArray.length > 0) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                car.imagensArray.forEach(imgUrl => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = `Imagem de ${car.nome}`;
                    imageContainer.appendChild(img);
                });
                carCard.appendChild(imageContainer);
            }


            const infoDiv = document.createElement('div');
            infoDiv.classList.add('car-info');

            infoDiv.innerHTML = `
                <h3>${car.nome}</h3>
                <div class="car-specs">
                    <div class="spec-item">
                        <strong>Marca:</strong> ${car.marca}
                    </div>
                    <div class="spec-item">
                        <strong>Modelo:</strong> ${car.categoria}
                    </div>
                    <div class="spec-item">
                        <strong>Ano:</strong> ${car.ano}
                    </div>
                    <div class="spec-item">
                        <strong>Cor:</strong> ${car.cor}
                    </div>
                    <div class="spec-item">
                        <strong>Estado:</strong> ${car.estado}
                    </div>
                    <div class="spec-item">
                        <strong>Portas:</strong> ${car.numPortas}
                    </div>
                    <div class="spec-item">
                        <strong>Assentos:</strong> ${car.numAssentos}
                    </div>
                    <div class="spec-item">
                        <strong>Combustível:</strong> ${car.combustivel}
                    </div>
                    <div class="spec-item">
                        <strong>Câmbio:</strong> ${car.cambio}
                    </div>
                </div>
                <p class="price">
                    ${parseFloat(car.valor).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    })}
                </p>
            `;

            carCard.appendChild(infoDiv);


            const detalhesButton = document.createElement('button');
            detalhesButton.classList.add('details-button');
            detalhesButton.textContent = 'Mais Detalhes';
            detalhesButton.onclick = function () {
                const detalhesCompletos = `
                    Nome: ${car.nome}
                    Marca: ${car.marca}
                    Categoria: ${car.categoria}
                    Ano: ${car.ano}
                    Cor: ${car.cor}
                    Estado: ${car.estado}
                    Número de Portas: ${car.numPortas}
                    Número de Assentos: ${car.numAssentos}
                    Combustível: ${car.combustivel}
                    Câmbio: ${car.cambio}
                    Valor: ${parseFloat(car.valor).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    })}
                    
                    Detalhes Adicionais:
                    ${car.detalhes}
                `;
                alert(detalhesCompletos);
            };
            carCard.appendChild(detalhesButton);

            carsList.appendChild(carCard);
        });
    }
};


document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;


    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    menuToggle.addEventListener('click', toggleMenu);


    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    overlay.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });


    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});


window.addEventListener('orientationchange', function () {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.overlay');

    if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});


const mobileInputs = document.querySelectorAll('input[type="text"], input[type="number"], select, textarea');
mobileInputs.forEach(input => {
    input.addEventListener('focus', function () {
        if (window.innerWidth <= 768) {
            input.setAttribute('readonly', true);
            input.removeAttribute('readonly');
        }
    });
});