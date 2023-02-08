const sectors = [
  { color: '#E5243B', label: 'Carlos' },
  { color: '#DDA63A', label: 'Boru' },
  //{ color: '#4C9F38', label: 'Dimas' },
  { color: '#C5192D', label: 'Rosicler' },
  { color: '#FF3A21', label: 'Moraima' },
  //{ color: '#E5243B', label: 'Leonardo' },
  { color: '#FCC30B', label: 'Yamel' },
  //{ color: '#A21942', label: 'Daniel' },
  { color: '#FD6925', label: 'Javier' },
  { color: '#DD1367', label: 'Alejandro' },
  { color: '#FD9D24', label: 'Lissette' },
  { color: '#BF8B2E', label: 'Ana M' },
  { color: '#3F7E44', label: 'Carla' },
  { color: '#0A97D9', label: 'Lubel' },
  { color: '#56C02B', label: 'Luis' },
  { color: '#00689D', label: 'Jonathan' },
  { color: '#19486A', label: 'Yuletza' },
  { color: '#E5243B', label: 'Claudia' },
  { color: '#DDA63A', label: 'Robert' }
  //{ color: '#E5243B', label: 'Cindy' },
  //{ color: '#DDA63A', label: 'Alexis' }
]

var canvas = document.getElementsByTagName('canvas')[0]
canvas.width = 600
canvas.height = 600

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
  const ang = arc * i
  ctx.save()
  // COLOR
  ctx.beginPath()
  ctx.fillStyle = sector.color
  ctx.moveTo(rad, rad)
  ctx.arc(rad, rad, rad, ang, ang + arc)
  ctx.lineTo(rad, rad)
  ctx.fill()
  // TEXT
  ctx.translate(rad, rad)
  ctx.rotate(ang + arc / 2)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 18px sans-serif'
  ctx.fillText(sector.label, rad - 10, 10)
  //
  ctx.restore()
}

function rotate() {
  const sector = sectors[getIndex()]
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
  spinEl.textContent = !angVel ? 'SPIN' : sector.label
  spinEl.style.background = sector.color
}

function frame() {
  if (!angVel) return
  angVel *= friction // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0 // Bring to stop
  ang += angVel // Update angle
  ang %= TAU // Normalize angle
  rotate()
}

function engine() {
  frame()
  requestAnimationFrame(engine)
}

function init() {
  sectors.forEach(drawSector)
  rotate() // Initial rotation
  engine() // Start engine
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.45)
  })
}

init()
