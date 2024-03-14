const { Service } = require('node-windows');

const service = new Service({
    name: 'autozap',
    description: 'AutoZap Listen Service',
    script: 'autozap/services/listen.js'
})

service.on('install', function() {
    service.start();
    console.log('Install complete.');
})

service.install();