const promesa = new Promise ((resolve, reject) =>{
                setTimeout(()=> {
                    resolve({ id: 1, model: 'Leon', company: 'Seat' })
                    reject(new Error('Se ha producido un error al leer la BD'))
                },3000)
            })


promesa
    .then(result=> console.log(result)) // El lo que resuelve el resolve
    .catch(err => console.log(err.message)) //Es lo que resuelve el reject