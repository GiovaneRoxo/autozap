const { Client, LocalAuth } = require('whatsapp-web.js');
const DatabaseService = require('./services/DatabaseService');

const dbService = new DatabaseService('../org.autozap.dashboard/database.db');

let currentAttendantId = 0;
let clients = [];

dbService.getAllAttendants((err, attendants) => {
    if (err) {
        console.error('Error fetching attendants from the database:', err);
        return;
    }
    console.log('Attendants:', attendants);
});

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'client-one',
        dataPath: 'auth'
    })
});

client.on('ready', () => {
    console.log('Autozap está pronto!');
});

client.on('message_received', async (msg) => {
    console.log(msg);
    const chat = await msg.getChat();
    try{
        if (!chat.isGroup && !clients.includes(msg.from)){
            dbService.getNextAttendantById(currentAttendantId, (err, attendant) => { 
                let message = `Olá! Você será atendido por ${attendant.name}, ${attendant.bio}, para continuar o atendimento, clique no link a seguir: ${attendant.link}`;
                client.sendMessage(msg.from, message);
                clients.push(msg.from);
                currentAttendantId = attendant.id;
            })
        }
    }catch(e){
        console.log(e);
    }
});
client.initialize();
process.stdin.resume();