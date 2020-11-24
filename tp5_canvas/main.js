document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas")
    canvas.width = window.innerWidth
    const c = canvas.getContext("2d")

    const w = canvas.width
    const h = canvas.height

    let angle = 0; 
    let minAngle = Math.PI/3
    let angleSpeed = 0 
    let delta = Math.PI/1800

    let last = null
    let delay = 1

    let image = document.createElement("img")
    image.src = "img.jpg"

    let mouse = { x: 0, y: 0 }
    canvas.addEventListener('mousemove', (event) => {
        mouse.x = event.pageX
        mouse.y = event.pageY
    })

    let animate = (timestamp) => {
        if(!last){
            last = timestamp
        }
        //permet de smooth un peu l'animation et de régler la vitesse
        if(timestamp - last > delay){
            last = timestamp

            c.clearRect(0, 0, w, h)

            c.save()
            c.translate(w / 2, h / 2)
            c.rotate(angle)
            c.beginPath()
            
            c.arc(-w/2+mouse.x, -h/2+mouse.y, 100, 0, Math.PI*2)
            c.clip()

            //drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur)
            c.drawImage(image, 0, 0, image.width, image.height,
                        -w, -h, 2*w, 2*w*image.height/image.width)
            
            c.closePath()
            c.restore()

            c.beginPath()
            c.font = '48px sans-serif'
            c.fillStyle = "white"
            c.fillText("HOUSE", 120, 120)

            c.beginPath()
            c.font = '12px sans-serif'
            c.fillStyle = "white"
            c.fillText(timestamp, 10, 30)

            // c.beginPath()
            // c.fillStyle = "darkseagreen"
            // c.rect(-100, -100, 200, 200)
            // c.fill()

            angle += delta
        }
        

        window.requestAnimationFrame(animate)
    }
    //relance la fonction la fonction d'affichage dès qu'il a la possibilité
    window.requestAnimationFrame(animate)
})