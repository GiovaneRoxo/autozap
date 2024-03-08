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
    qrcode.generate(qr, { small: true });
    hasAuthenticated = true
});

client.on('ready', () => {
    if(hasAuthenticated) {
        console.log('Client is ready!');
        client.destroy().then(() => {
            console.log('Client destroyed successfully.');
            process.exit();
        }).catch((error) => {
            console.error('Error while destroying client:', error);
            process.exit(1);
        });
    } else {
        console.log('Performing logout');
        client.logout().then(
            client.initialize()
        )
    }
});

client.initialize();
