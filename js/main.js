//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")

// elementos del game screen
const scoreNode = document.querySelector("#score")


//* VARIABLES GLOBALES DEL JUEGO

let pollitoObj = null; // esto significa que el pollito no existe aun.
let tuberiasArr = []; // al inicio no habrá ninguna tuberia

let mainIntervalId = null; // empieza null porque el juego no ha empezado
let tuberiasIntervalId = null;

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  console.log("iniciando juego")

  // 1. Ocultar la pantalla de inicio
  splashScreenNode.style.display = "none";

  // 2. Mostrar la pantalla de juego
  gameScreenNode.style.display = "flex";

  // 3. Anadir todos los elementos iniciales del juego
  pollitoObj = new Pollito()
  console.log(pollitoObj)

  // 4. Iniciar el intervalo inicial del juego (gameLoop)
  mainIntervalId = setInterval(() => {
    gameLoop()
  }, Math.round(1000/60))

  // 5. Inciamos otros intervalos que determinan la frecuencia en la que aparecen los elementos del juego.
  tuberiasIntervalId = setInterval(() => {
    tuberiaAppear()
  }, 2000)

}

function gameLoop() {
  // .todo lo que hay en esta funcion se ejecuta 60 veces por segundo
  // aqiu colocamos movimientos automaticos, checkeos de colisiones, animaciones.

  pollitoObj.gravity()

  tuberiasArr.forEach((eachTuberia) => {
    eachTuberia.automaticMovement()
  })

  checkTuberiasDisappear()
  colisionPollitoTuberias()

}

function tuberiaAppear() {

  // scoreNode.innerText++

  let randomPositionY = Math.floor( Math.random() * -200 )
  let distanciaEntreTuberias = 380

  let tuberiaObjArriba = new Tuberia(randomPositionY, "arriba");
  tuberiasArr.push(tuberiaObjArriba)

  let tuberiaObjAbajo = new Tuberia(randomPositionY + distanciaEntreTuberias, "abajo");
  tuberiasArr.push(tuberiaObjAbajo)

  // console.log(tuberiasArr)
}

function checkTuberiasDisappear() {
  // remueve la primera tuberia del array si existe y si ya ha salido de la caja de juego
  let firstTuberia = tuberiasArr[0];
  if (firstTuberia && firstTuberia.x <= (0 - firstTuberia.w)) {
    // IMPORTANTE. cuando removemos un elemento de nuestro juego tenemos que remover dos cosas:
    // 1. remover el objeto (desaparece del juego)
    tuberiasArr.shift()
    // 2. remover el nodo del DOM (desaparece de la vista)
    firstTuberia.node.remove()

    // incremento el score
    scoreNode.innerText = Number(scoreNode.innerText) + 0.5

  }
}

function colisionPollitoTuberias() {

  tuberiasArr.forEach((eachTuberia) => {

    // eachTuberia
    // pollitoObj

    if (
      pollitoObj.x < eachTuberia.x + eachTuberia.w &&
      pollitoObj.x + pollitoObj.w > eachTuberia.x &&
      pollitoObj.y < eachTuberia.y + eachTuberia.h &&
      pollitoObj.y + pollitoObj.h > eachTuberia.y
    ) {
      // Collision detected!
      // console.log("el pollito se estampó")
      gameOver()
    }

  })

}

function gameOver() {

  //* 1. limpiar todos los intervalos
  clearInterval(mainIntervalId)
  clearInterval(tuberiasIntervalId)

  //* 2. ocultar la pantalla de juego
  gameScreenNode.style.display = "none";

  //* 3. mostrar la pantalla final
  gameOverScreenNode.style.display = "flex";

}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", () => {
  startGame()
})

gameBoxNode.addEventListener("click", () => {
  pollitoObj.jump()
})

window.addEventListener("keydown", (event) => {
  // console.log(event.code)
  if (event.code === "Space") {
    pollitoObj.jump()
  }
})



// * PLANIFICACION

// - el fondo ✅
// - el pollito ✅
//    - nodo (img) ✅
//    - x, y, w, h ✅
//    - gravity() y colision abajo ✅
//    - jump() => con su addEventListener ✅
// - las tuberias ✅
//    - nodo (img) ✅
//    - x, y, w, h ✅
//    - tuberiasAppear() ✅
//    - automaticMovement() ✅
// - colisionPollitoTuberias() ✅
// - gameOver() ✅

// - score ✅
// - subirScore() ✅
// - intentar hacer rotacion del pollito
