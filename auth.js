const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'client-one',
        dataPath: 'auth'
    })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.destroy().then(() => {
        console.log('Client destroyed successfully.');
        process.exit();
    }).catch((error) => {
        console.error('Error while destroying client:', error);
        process.exit(1);
    });
});

client.initialize();
