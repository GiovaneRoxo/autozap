const { Service } = require('node-windows');
const { resolve } = require('path');

const path = resolve('./app.js')

const service = new Service({
    name: 'autozap',
    description: 'AutoZap Listen Service',
    script: path
})

service.on('install', function() {
    service.start();
})

service.install();