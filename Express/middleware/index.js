const express = require('express');
const app = express();

//Se importa el modulo date, en el cual se encuentra el middleware para ver la hora
const date = require('./date')

//Esta variable de entorno se utilizará para cambiar el puerto si está siendo utilizado o no
const port = process.env.port || 3003

//Instrucción para ejecutar un middleware, esta viene incluida en express y lo que hace es transformarlo en json
app.use(express.json())


app.use(date)

app.use('/api/date', (req, res, next) => {
    console.log('Request type: ', req.method)
    next()
})


app.get('/api/date', (req, res)=>{
    res.status(200)
    res.send()
})

app.listen(port, ()=> 
    console.log('Server Listening on '+ port))