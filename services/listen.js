const {Client, LocalAuth} = require('whatsapp-web.js');
const DatabaseService = require('./DatabaseService');

const dbService = new DatabaseService('./database.db');

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

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const isGroup = chat.isGroup;

    if (!isGroup) {
        if(clients.includes(msg.from)) {
            dbService.getMessage((reply) => {
                console.log(`Old client`)
                console.log('From db: ' + reply)

                let appliedPatternMessage = reply.replace('$nome', attendant.name)
                    .replace('$bio', attendant.bio)
                    .replace('$contato', attendant.link)

                console.log('From conversion: ' + appliedPatternMessage)
                client.sendMessage(sender, appliedPatternMessage);
            })
        }
        else {
            console.log("New customer: " + msg);
            const sender = msg.from;

            dbService.getNextAttendantById(currentAttendantId, (err, attendant) => {
                dbService.getMessage((message) => {
                    console.log('From db: ' + message)

                    let appliedPatternMessage = message.replace('$nome', attendant.name)
                        .replace('$bio', attendant.bio)
                        .replace('$contato', attendant.link)

                    console.log('From conversion: ' + appliedPatternMessage)
                    client.sendMessage(sender, appliedPatternMessage);
                    currentAttendantId = attendant.id;
                })
                clients.push(msg.from);
            })
        }
    }
});

client.initialize();
process.stdin.resume();