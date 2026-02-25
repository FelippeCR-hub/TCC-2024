function showPaymentForm(type) {
    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('.boleto-container').style.display = 'none';

    if (type === 'cartao') {
        document.querySelector('.form-container').style.display = 'block';
    } else if (type === 'boleto') {
        document.querySelector('.boleto-container').style.display = 'block';
    }
}

function generateBoleto() {
    const boletoContainer = document.querySelector('.boleto-details');


    const valorOriginal = 40000.00;
    const percentualJuros = 2.5;
    const meses = 12;


    const valorTotal = valorOriginal + (valorOriginal * percentualJuros / 100);
    const valorPrestacao = valorTotal / meses;


    const valorOriginalFormatted = valorOriginal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    const valorTotalFormatted = valorTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    const valorPrestacaoFormatted = valorPrestacao.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const codigoBarras = "10491.54321 67890.000001 23456.789012 8 901200123456";


    const dataVencimento = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');
    const beneficiario = "Cars Imports";
    const cedente = "Banco do Brasil";
    const pagador = "Felipe Andrade Souza";
    const cpfPagador = "369.741.258-00";
    const nossoNumero = "11 986981750";

    boletoContainer.innerHTML = `
        <div class="boleto">
            <div class="boleto-header">
                <img src="bb.jpg" alt="Logo do Banco" class="logo-banco">
                <h3>Boleto Bancário</h3>
                <p>${cedente}</p>
                <p>Beneficiário: ${beneficiario}</p>
                <p>Nosso Número: ${nossoNumero}</p>
            </div>
            <div class="boleto-body">
                <p><strong>Valor Original:</strong> <span class="valor">${valorOriginalFormatted}</span></p>
                <p><strong>Valor Total (com Juros):</strong> <span class="valor">${valorTotalFormatted}</span></p>
                <p><strong>Percentual de Juros:</strong> <span>${percentualJuros}%</span></p>
                <p><strong>Valor da Prestação:</strong> <span class="valor">${valorPrestacaoFormatted}</span></p>
                <p><strong>Data de Vencimento:</strong> ${dataVencimento}</p>
                <p><strong>Pagador:</strong> ${pagador}</p>
                <p><strong>CPF:</strong> ${cpfPagador}</p>
            </div>
            <div class="boleto-footer">
                <div class="codigo">Código de Barras: <span id="codigoBarras">${codigoBarras}</span></div>
                <button onclick="copyCodigoBarras()">Copiar Código de Barras</button>
                <p>Utilize o código acima para efetuar o pagamento.</p>
            </div>
        </div>
    `;
}


function copyCodigoBarras() {
    const codigoBarrasElement = document.getElementById("codigoBarras");
    const codigoBarras = codigoBarrasElement.innerText;


    const tempInput = document.createElement("input");
    tempInput.value = codigoBarras;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Código de barras copiado para a área de transferência!");
}