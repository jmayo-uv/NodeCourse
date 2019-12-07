const express = require('express');
const app = express();
//Esta variable de entorno se utilizará para cambiar el puerto si está siendo utilizado o no
const port = process.env.port || 3003

//Constante para utilizar el paquete express-validator
const { check, validationResult } = require('express-validator');

//Instrucción para ejecutar un middleware, esta viene incluida en express y lo que hace es transformarlo en json
app.use(express.json())

//un middleware tiene acceso a request, response y next
app.use(function (req, res, next){
    console.log('Time: ', Date.now())
    next()
})

app.use(function (req, res, next){
    console.log('Request Type: ', req.method)
    next()
})

//Se puede especificar que solamente se verifique el middleware si se accede a cierta ruta
app.use('/api/login', function (req, res, next) {
    console.log('Checking Login...')
    next()
})

//Esta instrucción sirve para parsear en JSON con Express
app.use(express.json());


//Declarando un array de coches
var coches =[
    {
        id: 0, 
        company: 'BMW',
        model: 'X3',
        year: '2020'
    },
    {
        id: 1, 
        company: 'Audi',
        model: 'A1',
        year: '2021'
    },
    {
        id: 2, 
        company: 'Mercedes',
        model: 'Clase A',
        year: '2022'
    }
]

app.get('/api/cars', (req, res) =>{
    res.send('Hello World!')
})


app.listen(port, ()=> 
    console.log('Server Listening on '+ port))