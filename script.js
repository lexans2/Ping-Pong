// Obter o elemento canvas do DOM
var canvas = document.getElementById("gameCanvas")

// Obter o contexto 2D do canvas
var ctx = canvas.getContext("2d")

// Variáveis do jogo
var raioBola = 10
var x = 100
var y = 150
var dx = 2
var dy = -2
var raqueteAltura = 10
var raqueteLargura = 80
var raqueteX = 260
var contadorColisoes=0
// Funções de desenho
function desenhaBola() {
  ctx.beginPath()
  ctx.arc(x, y, raioBola, 0, 2 * Math.PI)
  ctx.fillStyle = "yellow"
  ctx.fill()
  ctx.closePath()
}

function desenhaRaquete() {
  ctx.beginPath()
  ctx.rect(
    raqueteX,
    canvas.height - raqueteAltura,
    raqueteLargura,
    raqueteAltura
  )
  ctx.fillStyle = "red"
  ctx.fill()
  ctx.closePath()
}
// contador criado por ale
function desenhaContador() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "black"
  ctx.fillText("Pontos: " + contadorColisoes, 8, 20)
}

function aumentaNivel(){
if (dx > 0) {
    dx += 0.5 // Aumenta a velocidade horizontal positiva
  } else {
    dx -= 0.5 // Aumenta a velocidade horizontal negativa
  }
  
  if (dy > 0) {
    dy += 0.5 // Aumenta a velocidade vertical positiva
  } else {
    dy -= 0.5 // Aumenta a velocidade vertical negativa
  }
}
function diminuiRaquete(){
  raqueteLargura-=5
}
// Função de atualização do jogo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  desenhaBola()
  desenhaRaquete()
  desenhaContador()

  // Atualizar a posição da bola
  x += dx
  y += dy

  // Verificar colisão com as paredes
  if (x + dx > canvas.width - raioBola || x + dx < raioBola) {
    dx = -dx
  }
  if (y + dy < raioBola) {
    dy = -dy
    contadorColisoes++
  } else if (y + dy > canvas.height - raioBola) {
    // Verificar colisão com a raquete
    if (x > raqueteX && x < raqueteX + raqueteLargura) {
      dy = -dy
    } else {
      // Fim de jogo
      alert("Gamer Over!!!")
      dx = 0
      dy = 0
    }
  }

  // Mover a raquete
  if (direita && raqueteX < canvas.width - raqueteLargura) {
    raqueteX += 7
  } else if (esquerda && raqueteX > 0) {
    raqueteX -= 7
  }
}

// Lidar com as teclas pressionadas
function teclaPressionada(event) {
  if (event.keyCode == 39) {
    direita = true
  } else if (event.keyCode == 37) {
    esquerda = true
  }
}

function teclaSolta(event) {
  if (event.keyCode == 39) {
    direita = false
  } else if (event.keyCode == 37) {
    esquerda = false
  }
}

// Adicionar ouvintes de eventos de teclado
document.addEventListener("keydown", teclaPressionada, false)
document.addEventListener("keyup", teclaSolta, false)

// Chamar a função de atualização do jogo a cada 10 milissegundos
setInterval(draw, 10)
