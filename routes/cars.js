const express = require('express')
//const app = express()


//Constante para utilizar el paquete express-validator
const { check, validationResult } = require('express-validator');

//Para poder dividir en rutas se utiliza esto en lugar de App
const router = express.Router();

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

router.get('/', (req, res) => {
    res.send(coches)
})

router.get('/list', (req, res) => {
    res.send(['BMW S1', 'AUDI A3','Mercedes Clase A'])
})

//Obtener parámetros a través de la URL
router.get('/id/:id', (req, res) => {
    res.send(req.params.id)
}) 

//Se pueden enviar y obtener varios parámetros
router.get('/:company/:model', (req, res) => {
    res.send(req.params)
}) 

router.get('/:company', (req, res) => {
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

router.post('/', (req, res) => {
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

router.post('/2', (req, res) => {
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

router.post('/3', [
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

router.put('/:id', [
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

router.delete('/:id', (req, res) => {

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


module.exports = router