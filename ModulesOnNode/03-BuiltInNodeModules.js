// os es un Módulo que trae incluido Node, con el cual se pueden obtener ciertos valores del SO

const os = require('os');

//Ejemplos de funciones que incluye el modulo os de Node
console.log('OS Version: ', os.release());
console.log('Free Memory: ', os.freemem());
console.log('Total Memory: ', os.totalmem());