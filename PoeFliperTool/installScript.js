var Service = require('node-windows').Service;

var svc = new Service({
  name:'poe_sniper_tool',
  description: 'Sniping Tool for Path Of Exile Trade',
  script: __dirname+'\\dist\\core.js',
  nodeOptions: [
  ]
});
svc.on('install',function(){
  svc.start();
});

svc.install();