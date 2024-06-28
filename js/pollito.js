class Pollito {

  constructor() {
    // aqui estarán todas las propiedades de cada pollito
    this.node = document.createElement("img")
    this.node.src = "./images/flappy.png"
    gameBoxNode.append(this.node)

    this.x = 70 // posición eje X
    this.y = 50 // posición eje Y 
    this.w = 40 // ancho
    this.h = 35 // alto

    // configuración inicial de el elemento
    this.node.style.position = "absolute"; // para poder usar las propiedades top y left
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.gravitySpeed = 2;
    this.jumpSpeed = 35;

    // tiene una propiedad de transición (permite que al cambiar forma o tamaño de imagen, sea más fluido)
    this.node.style.transition = "transform 0.3s"
    this.node.style.transform = "rotate(60deg)"

  }

  // aqui estarán todos los métodos de cada pollito
  gravity() {
    // console.log("intentando hacer gravedad")
    this.y += this.gravitySpeed
    // SIEMPRE QUE MODIFICAMOS UN VALOR NUMERICO DE POSICIÓN O DIMENSIÓN, ACTUALIZAMOS TAMBIEN EL DOM (LEFT, TOP, WIDTH O HEIGHT)
    this.node.style.top = `${this.y}px`;

    if ((this.y + this.h) >= gameBoxNode.offsetHeight) {
      gameOver()
    }

  }

  jump() {
    // console.log("intentando saltar")
    
    if (this.y >= 0) {
      // solo si el pollito está dentro de la caja de juego (desde arriba) puede saltar
      this.y -= this.jumpSpeed;
      this.node.style.top = `${this.y}px`;

      // ejemplo rotar imagen
      this.node.style.transform = "rotate(-30deg)"

      setTimeout(() => {
        this.node.style.transform = "rotate(60deg)"
      }, 100)
    }




  }

}