const Gerencianet = require('gerencianet');

// Suas credenciais da API do Gerencianet
let options = {
    client_id: 'seu_client_id',
    client_secret: 'seu_client_secret',
    sandbox: true  // Defina como false em produção
};

// Informações do pagamento (valores em centavos)
let body = {
    calendario: {
        expiracao: 3600  // 1 hora
    },
    valor: {
        original: "10.00"  // R$ 10,00
    },
    chave: "sua-chave-pix",
    solicitacaoPagador: "Descrição da compra"
};

// Gerando a cobrança Pix e QR Code
Gerencianet(options).pixCreateImmediateCharge([], body)
    .then(response => {
        const txid = response.txid;

        // Agora, gere o QR Code
        Gerencianet(options).pixGenerateQRCode({ id: txid })
            .then(qrCodeResponse => {
                console.log(qrCodeResponse.qrcode);  // O código Pix gerado
                console.log(qrCodeResponse.imagemQrcode);  // Link da imagem do QR Code
            })
            .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
