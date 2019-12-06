const express = require('express');
const app = express();
//Esta variable de entorno se utilizará para cambiar el puerto si está siendo utilizado o no
const port = process.env.port || 3003

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


app.listen(port)
    console.log('Server Listening on 3003')