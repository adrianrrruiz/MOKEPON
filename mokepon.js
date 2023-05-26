const sectionAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('boton-reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascota = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas =document.getElementById('contenedor-tarjetas')
const contenedorBotonesAtaque = document.getElementById('botones-ataque')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let opcionDeAtaques
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/hipodogue.png', 5)
let capipepo = new Mokepon('Capipepo','./assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya','./assets/ratigueya.png', 5)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'}
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'}
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){

    sectionAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class= "tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })
    
    

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'

    //sectionAtaque.style.display = 'flex'

    if(inputHipodoge.checked){
        spanMascota.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){  
        spanMascota.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascota.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert("No seleccionaste nada :(")
        location.reload()
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    mokepones.forEach((mokepon) => {
        if(mascotaJugador === mokepon.nombre){
            ataques = mokepon.ataques
        }
    })

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorBotonesAtaque.innerHTML += opcionDeAtaques
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.background = '#146C94'
                boton.disabled = true
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#146C94'
                boton.disabled = true
            }else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#146C94'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques

    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    
    if(ataqueAleatorio === 0 || ataqueAleatorio === 1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio === 3 || ataqueAleatorio === 4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }

    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for(let i = 0; i < ataqueJugador.length; i++){
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosOponente(i,i)
            crearMensaje("EMPATE 😬") 
        }else if(ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA'){
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE 🥳") 
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO'){
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE 🥳") 
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA'){
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE 🥳") 
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponente(i,i)
            crearMensaje("PERDISTE ✖️") 
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('Esto fue un empate')
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('FELICITACIONES!! GANASTE 😆')
    }else {
        crearMensajeFinal('Lo siento, perdiste 😔')
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min) 
}

function pintarCanvas(){
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.drawImage(mascotaJugadorObjeto.mapaFoto, mascotaJugadorObjeto.x, mascotaJugadorObjeto.y, mascotaJugadorObjeto.ancho, mascotaJugadorObjeto.alto)
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function obtenerObjetoMascota(mascota_Jugador){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota_Jugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function iniciarMapa(){
    mapa.width = 500
    mapa.height = 500

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}



window.addEventListener('load', iniciarJuego)