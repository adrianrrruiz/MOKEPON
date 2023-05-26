const express = require("express") //Permite utilizar las librerias instaladas con npm
const cors = require("cors") //Implementando libreria cors

const app = express() //Para generar una instancia del servidor

app.use(cors()) // Para terminar los errores de cors
app.use(express.json()) //Para que soporte las peticiones JSON como parte de su cuerpo

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y) {
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => { //Le decimos a express que cuando reciba un peticion  a "/unirse" responda con el id
    const id = `${Math.random()}`
    
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin","*") //Lo normal es que las peticiones esten alojadas en el mismo sitio, esto me permite que se puedan hacer solicitudes a cualquier sitio

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
}) //Para definir variables en Express se pone en la URI ":"

app.post("/mokepon/:jugadorId/posicion", (req,res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || ""
    const y = req.body.y || ""

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.listen(8080, () => { //Que escuche continuamente en el puerto 8080 las peticiones de los clientes
    console.log("servidor funcionando");
})