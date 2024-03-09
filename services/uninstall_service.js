const { Service } = require('node-windows');

const service = new Service({
    name: 'autozap',
    description: 'AutoZap Listen Service',
    script: 'autozap/services/listen.js'
})

service.on('uninstall', function() {
    console.log('Uninstall complete.');
})

service.uninstall();