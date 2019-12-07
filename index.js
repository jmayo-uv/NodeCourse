const express = require('express')
const app = express()
const car = require('./routes/cars')

//Esta variable de entorno se utilizará para cambiar el puerto si está siendo utilizado o no
const port = process.env.port || 3003

//Instrucción para ejecutar un middleware, esta viene incluida en express y lo que hace es transformarlo en json
app.use(express.json())

app.use('/api/cars', car)

//Esta instrucción sirve para parsear en JSON con Express
app.use(express.json())

app.listen(port, ()=> 
    console.log('Server Listening on '+ port))