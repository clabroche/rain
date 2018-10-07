const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
canvas.width = document.querySelector('body').clientWidth
canvas.height = document.querySelector('body').clientHeight
const rains = Array(500).fill('').map(_ => new Rain())
const sploshs = []

function Rain() {
  this.init = function () {
    this.x = Math.floor(Math.random() * canvas.width),
    this.y = -Math.floor(Math.random() * canvas.height),
    this.v = Math.random() * 0.2+ 2
  }
  this.init()
}
Rain.prototype.update = function () {
  if(this.y >= canvas.height) {
    sploshs.push(...Array(10).fill('').map(_=>new Splosh(this.x, this.y, this.v)))
    this.init()
  }
  else this.y += this.v
  this.draw()
}
Rain.prototype.draw = function () {
  ctx.fillStyle='white'
  ctx.fillRect(this.x, this.y, 1, 10)
}

function Splosh (x,y, v) {
  this.x = x
  this.y = y
  this.v = v
  this.angle = Math.random() * 360
  this.life = 50
}
Splosh.prototype.update = function () {
  if(this.life === 0) return sploshs.splice(sploshs.indexOf(this), 1)
  this.life = this.life -1
  this.x += this.v /2 * Math.cos(this.angle * Math.PI / 180);
  this.y += this.v /2 * Math.sin(this.angle * Math.PI / 180);
  this.draw()
}
Splosh.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = 'white'
  ctx.arc(this.x, this.y, this.life * 2 / 50, 0, 2* Math.PI )
  ctx.fill()
}
const refresh = function() {

  var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#777777');
  gradient.addColorStop(1, '#333333');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  rains.map(rain => rain.update())
  sploshs.map(splosh=>splosh.update())
}
setInterval(() => {
  refresh();
}, 5  );