//Se asigna a una constante un require y la dirección del archivo del módulo a importar
const sumar = require('./01-CreatingModule');

console.log(sumar.sumTwoAndTwo());

//Llamada a la segunda función
console.log(sumar.suma(6,9));