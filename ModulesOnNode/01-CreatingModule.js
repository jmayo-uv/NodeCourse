//Forma de crear una función
const sumTwoAndTwo = function (){
    return 2+2;
}

//Así se indica cuando se quiere exportar un modulo, por lo general se le pone el mismo nombre de la función
exports.sumTwoAndTwo = sumTwoAndTwo;


//Otra forma de exportar

exports.suma = function (numero1, numero2){
    return numero1 + numero2;
}