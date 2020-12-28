'use strict';

const app = require('../src/main/app');
const http = require('http');
const debug = require('debug')('api:server');

const port = normalizePort(process.env.PORT || '4567');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log('porta setada: ' + port);


/*
função para tratar a escolha da porta
*/
function normalizePort (val){
    let porta = parseInt(val, 10);

    if(isNaN(porta)){ return val; }
    
    if (porta >= 0){ return porta; }
    
    return false;
}//end nomrmalizePort