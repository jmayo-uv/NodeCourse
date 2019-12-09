function getCar(id) {
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            console.log('Obtenido coche 23')
            resolve({
                id: 23, model: 'X3', company: 'BMW'
            })
        }, 3000)
    })
}



function getModel(model){
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            console.log('Obtenido modelo X3')
            resolve({
                speed: 230, seat: '5', size: '4*5'
            })
        }, 3000)
    })
}

//Consumiendo las promesas
const promesa = getCar(23)
promesa
    .then (coche => getModel(coche.model))
    .then (model => console.log(model))
    .catch (err => console.log(err.message))