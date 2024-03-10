const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'client-one',
        dataPath: 'auth'
    })
});

let hasAuthenticated = false

client.on('qr', (qr) => {
    console.log('Gerando QR code...')
    qrcode.generate(qr, { small: true });
    hasAuthenticated = true
});

client.on('ready', () => {
    if(hasAuthenticated) {
        console.log('Client autenticado com sucesso!');
        client.destroy().then(() => {
            console.log('Encerrando client.');
            process.exit();
        }).catch((error) => {
            console.error('Error while destroying client:', error);
            process.exit(1);
        });
    } else {
        console.log('Encontramos um login, desconecte o dispositivo do seu whatsapp.')
    }
});

client.initialize();
