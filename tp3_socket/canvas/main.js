const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")
const w = canvas.width
const h = canvas.height

let p = { x:null, y: null}

canvas.addEventListener("mousemove", (e) => {
    c.beginPath()
    c.lineWidth = 4
    c.strokeStyle = "pink"
    c.arc(e.pageX, e.pageY, 10, 0, Math.PI*2)
    c.fillStyle = linear-gradient(orange, yellow, green, cyan, blue, violet)
    c.fill()
})