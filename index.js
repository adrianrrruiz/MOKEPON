const express = require("express") //Permite utilizar las librerias instaladas con npm

const app = express() //Para generar una instancia del servidor

app.get("/", (req, res) => { //Le decimos a express que cuando reciba un peticion el raiz respnda "hola"
    res.send("Hola")
})

app.listen(8080, () => { //Que escuche continuamente en el puerto 8080 las peticiones de los clientes
    console.log("servidor funcionando");
})