const express = require("express") //Permite utilizar las librerias instaladas con npm

const app = express() //Para generar una instancia del servidor

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }
}

app.get("/unirse", (req, res) => { //Le decimos a express que cuando reciba un peticion  a "/unirse" responda con el id
    const id = `${Math.random()}`
    
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin","*") //Lo normal es que las peticiones esten alojadas en el mismo sitio, esto me permite que se puedan hacer solicitudes a cualquier sitio

    res.send(id)
})

app.listen(8080, () => { //Que escuche continuamente en el puerto 8080 las peticiones de los clientes
    console.log("servidor funcionando");
})