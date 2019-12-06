const express = require('express');
const app = express();
//Esta variable de entorno se utilizará para cambiar el puerto si está siendo utilizado o no
const port = process.env.port || 3003


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

app.listen(port)
    console.log('Server Listening on 3003')