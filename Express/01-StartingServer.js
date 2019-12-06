const express = require('express');
const app = express();
//Esta variable de entorno se utilizará para cambiar el puerto si está siendo utilizado o no
const port = process.env.port || 3003

//Constante para utilizar el paquete express-validator
const { check, validationResult } = require('express-validator');

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

app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.get('/api/cars/list', (req, res) => {
    res.send(['BMW S1', 'AUDI A3','Mercedes Clase A'])
}) 


//Obtener parámetros a través de la URL
app.get('/api/cars/id/:id', (req, res) => {
    res.send(req.params.id)
}) 

//Se pueden enviar y obtener varios parámetros
app.get('/api/cars/:company/:model', (req, res) => {
    res.send(req.params)
}) 

app.get('/api/cars/', (req, res)=>{
    res.send(coches)
})

app.get('/api/cars/:company', (req, res) => {
    //Busca dentro del arreglo si existe algún coche cuya compañía coincida con la compañía enviada por la URL
    const coche = coches.find(coche => coche.company.toLowerCase() === req.params.company.toLowerCase())
    if(!coche){
        //Si no encuentra envía un status de 404 - NOT FOUND
        res.status(404).send('No hay existencia de coches de esa marca')
    }    
    else{
        res.send(coche)
    }
})

app.post('/api/cars', (req, res) => {
    //Asignación de ID para nuevos coches
    var carID = coches.length;
    var coche ={
        id: carID,
        //En el método GET NUNCA van los parámetros en el Body
        company: req.body.company, //En este caso el valor va a venir en el Body
        model: req.body.model,
        year: req.body.year
    }
    
    coches.push(coche); // Instrucción para agregar al final del arreglo el valor de coche
    res.status(201).send(coche);
    
})

app.post('/api/cars2', (req, res) => {
    if(!req.body.company || req.body.company.length < 3 ){
        res.status(400).send('Introduce empresa correcta')
        return 
    } else {
    
        //Asignación de ID para nuevos coches
        var carID = coches.length;
        var coche ={
            id: carID,
            //En el método GET NUNCA van los parámetros en el Body
            company: req.body.company, //En este caso el valor va a venir en el Body
            model: req.body.model,
            year: req.body.year
        }
        
        coches.push(coche); // Instrucción para agregar al final del arreglo el valor de coche
        res.status(201).send(coche);
    }

})

app.post('/api/cars3', [
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})
], (req, res) => {

    //Valida con el nuevo paquete si hubo errores de validación, de ser así devuelve un status 422
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
    }
    //Asignación de ID para nuevos coches
    var carID = coches.length;
    var coche ={
        id: carID,
        //En el método GET NUNCA van los parámetros en el Body
        company: req.body.company, //En este caso el valor va a venir en el Body
        model: req.body.model,
        year: req.body.year
    }
})

app.put('/api/cars/:id', [
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})
], (req, res) => {

    //Valida con el nuevo paquete si hubo errores de validación, de ser así devuelve un status 422
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
    }

    //Búsqueda dentro del arreglo para ver si el ID del coche existe
    const coche = coches.find(coche => coche.id === parseInt(req.params.id))
    
    if(!coche){
        res.status(404).send('El coche con ese ID no existe')
        return
    }

    //Actualización de registro
    coche.company = req.body.company
    coche.model = req.body.model
    coche.year = req.body.year

    //Habitualmente se responde 204 cuando se hace un PUT segun MDN
    res.status(204).send()

})

app.delete('/api/cars/:id', (req, res) => {

    //Búsqueda dentro del arreglo para ver si el ID del coche existe
    const coche = coches.find(coche => coche.id === parseInt(req.params.id))
    
    if(!coche){
        res.status(404).send('El coche con ese ID no existe')
        return
    }

    //Instrucciones para borrar coche
    const index = coches.indexOf(coche)
    coches.splice(index,1)
    res.status(200).send('Coche borrado')
})


app.listen(port, ()=> 
    console.log('Server Listening on '+ port))