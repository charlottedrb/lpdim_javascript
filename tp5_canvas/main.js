document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas")
    canvas.width = window.innerWidth
    const c = canvas.getContext("2d")

    const w = canvas.width
    const h = canvas.height

    let angle = 0; 
    let delta = Math.PI/90

    let last = null
    let delay = 30

    let image = document.createElement("img")
    image.src = "img.jpg"

    let animate = (timestamp) => {
        if(!last){
            last = timestamp
        }
        //permet de smooth un peu l'animation et de régler la vitesse
        if(timestamp - last > delay){
            last = timestamp

            c.clearRect(0, 0, w, h)
            
            c.save()
            c.translate(500, 200)
            c.rotate(angle)
            c.beginPath()
            // c.fillStyle = "orange"
            // c.rect(-100, -100, 200, 200)
            // c.fill()
            c.drawImage(image, 0, 0)
            c.restore()

            c.beginPath()
            c.font = '48px sans-serif'
            c.fillStyle = "black"
            c.fillText("HOP", 120, 120)

            angle += delta
        }
        

        window.requestAnimationFrame(animate)
    }
    //relance la fonction la fonction d'affichage dès qu'il a la possibilité
    window.requestAnimationFrame(animate)
})