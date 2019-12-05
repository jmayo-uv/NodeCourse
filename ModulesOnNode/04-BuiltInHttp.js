const http = require('http');

/*
const server = http.createServer();

server.on('connection', (socket)=>{
    console.log('nueva conexión detectada')
})

server.listen(2012)
console.log('escuchando en el puerto 2012...');

*/

/*
const server = http.createServer((req, res)=>{
    
    //Desde aquí se le puede indicar que tipo de dirección intenta ingresar el usuario y en res, indicarle que respuesta tendrá a la petición
    if(req.url === '/'){
        res.write('Hola mundo');
        res.write('desde NodeJS');
        res.end();
    }
    if(req.url === '/coches'){
        res.write('Coche1');
        res.end();
    }

});

server.listen(3030);
console.log('Escuchando en puerto 3030...');

*/

//Dentro de los parámetros de create server debe de ir siempre primero req, y después res
const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        'Content-Type' : 'text/html'
    })
    res.write('<h1>Enviando html... </h1>');
    res.write('<p>Mi web</p>');
    res.end();
}).listen(3000)
    console.log('Server está listo en el puerto 3000... ');
