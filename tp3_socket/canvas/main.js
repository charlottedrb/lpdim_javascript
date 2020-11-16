document.addEventListener("DOMContentLoaded", () => {
    //io appelle l'api
    const socket = io("51.83.36.122:8080")
    const canvas = document.querySelector("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const c = canvas.getContext("2d")
    const w = canvas.width
    const h = canvas.height

    canvas.addEventListener("mousemove", (e) => {
        //quand on appuie pas sur le bouton e.buttons = 0
        if(e.buttons != 0){
            socket.emit("point", 
            {
                x: e.pageX, 
                y: e.pageY, 
                color: "lavender"
            })
        }
    })
    socket.on("draw", (enable) => {
        if(enable){
            c.beginPath()
            c.rect(0, 0, w, 10)
            c.fillStyle = "lavender"
            c.fill()
        } else {
            c.clearRect(0, 0, w, 10)
        }
    })

    socket.on("point", (data) => 
    {
        c.beginPath()
        c.arc(data.x, data.y, 5, 0, Math.PI*2)
        c.fillStyle = data.color
        c.fill()
    })
})