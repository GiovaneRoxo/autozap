const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const {LocalAuth } = require('whatsapp-web.js');
const atendentesPath = './atendentes.json';

const client = new Client({
    authStrategy: new LocalAuth()
});

let atendentes = [];
let atendentesLength;
let atendenteIndex = 0;
let clients = [];

fs.readFile(atendentesPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo de atendentes:', err);
        return;
    }
    atendentes = JSON.parse(data);
    atendentesLength = atendentes.length;
    console.log(atendentesLength, 'atendentes carregados');
    console.log('Lista de atendentes carregada:', atendentes);
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Autozap está pronto!');
});

client.on('message_create', async (msg) => {
    console.log("NUMERO (" + msg.from + "): " + msg.body)  

    // linha de teste
    const sender = msg.from.includes("85067794") ? msg.to : msg.from

    if (msg.type === 'chat' && !clients.includes(msg.from)) {
        const atendente = atendentes[atendenteIndex]
        const message = `Olá! Você será atendido por ${atendente.nome}, ${atendente.bio}, para continuar o atendimento, clique no link a seguir: ${atendente.link}`;
        client.sendMessage(sender, message);
        clients.push(msg.from)

        if(atendenteIndex < atendentesLength - 1) {
            atendenteIndex++;
        } else {
            atendenteIndex = 0;
        }
    }
});

client.initialize();
