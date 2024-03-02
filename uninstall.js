const {resolve} = require('path');
let path = resolve('./app.js')
console.log(path);

var Service = require('node-windows').Service;
var svc = new Service({
    name: 'autozap',
    description: 'autozap test service',
    script: path
})

svc.on('uninstall',function(){
    console.log('Uninstall complete.');
});

svc.uninstall();