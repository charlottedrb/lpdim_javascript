document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas")
    const c = canvas.getContext("2d")
    let w, h 

    window.addEventListener("resize", resize)

    function resize(){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    
        w = canvas.width 
        h = canvas.height
    }

    resize()

    //---------------------------GENERATE WORLD
    let points = []
    let nbPoints = 4+Math.floor(Math.random()*2)
    let grd = c.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, "#ff9947");
    grd.addColorStop(1, "#ff7692");
    for (let i = 0; i < nbPoints+1; i++)
        points.push({ 
            x: i * w / nbPoints, 
            y: 0.4*h + Math.random() * (h*0.4) 
        })

    let worldDrawed = false
    let tank = { x: 0.25 * w, y: 0, w: 40, h: 20 }
    let cannonBall = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        r: 5
    }
    let d

    let holes = []


    //---------------------------MOUSE CAPTURE
    const m = { x: 0, y: 0 }
    canvas.addEventListener("mousemove", (e) => {
        m.x = e.pageX
        m.y = e.pageY
    })

    let fire = false
    canvas.addEventListener("click", () => {
        if(!fire){
            fire = true
            cannonBall.x = tank.x
            cannonBall.y = tank.y
            cannonBall.vx = 0
            cannonBall.vy = 0
            cannonBall.ax = 0.01 * (m.x - tank.x )
            cannonBall.ay = 0.01 * (m.y - tank.y )
        }
    })

    //---------------------------KEY CAPTURE
    document.querySelector("body").addEventListener("keydown", (e) => {
        console.log(e.key)
        if(e.key == "ArrowLeft"){
            tank.x -= 10
        }
        if(e.key == "ArrowRight"){
            tank.x += 10
        }
    })


    function game(){
        c.clearRect(0, 0, w, h)

        //---------------------------DRAW WORLD
        c.beginPath()
        let pp = null
        points.forEach((p, i) => {
            if (i === 0)
                c.moveTo(p.x, p.y)
            else
                c.bezierCurveTo(
                    pp.x + 100, pp.y,
                    p.x - 100, p.y,
                    p.x, p.y
                )
            pp = p
        })

        c.lineTo(w + 20, h + 20)
        c.lineTo(0 - 20, h + 20)
        c.fillStyle = grd
        c.fill()

        //if(!worldDrawed){
            //---------------------------GENERATE TANK
            let y = 0
            while (y < h && !c.isPointInPath(tank.x, y)) {
                y++
            }
            console.log(y + " / " + h)
            tank.y = y - 5
        //s}

        //---------------------------CANNON BALL COLLISION
        if(fire){
            fire = 
                !c.isPointInPath(cannonBall.x, cannonBall.y) && 
                cannonBall.x < w &&
                cannonBall.x > 0
            if(c.isPointInPath(cannonBall.x, cannonBall.y)){
                holes.push({ 
                    x: cannonBall.x, 
                    y: cannonBall.y,
                    r: 10*Math.sqrt(Math.pow(cannonBall.vx, 2)+Math.pow(cannonBall.vx, 2))
                })
            }
        }

        //---------------------------DRAW HOLES
        //in parcourt les clés
        //of parcourt les objets
        for (let hole of holes) {
            c.clearRect(
                hole.x-hole.r/2,
                hole.y-hole.r/2, 
                hole.r, hole.r
            )
            // c.beginPath()
            // c.fillStyle = "red"
            // c.rect(
            //     hole.x-hole.r/2,
            //     hole.y-hole.r/2, 
            //     hole.r, hole.r
            // )
            // c.fill()
        }


        //---------------------------DRAW TANK
        c.beginPath()
        c.rect(tank.x-tank.w/2, tank.y-tank.h, tank.w, tank.h)
        c.fillStyle = "black"
        c.fill()
        c.beginPath()
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.moveTo(tank.x, tank.y-tank.h)
        d = Math.sqrt(
            Math.pow(tank.x-m.x, 2) + 
            Math.pow(tank.y-m.y-tank.h, 2))
        c.lineTo(
            tank.x+30*(m.x-tank.x)/d, 
            tank.y-tank.h+30*(m.y-tank.y+tank.h)/d)
        c.stroke()

        //---------------------------DRAW CANNON BALL
        if(fire) {
            c.beginPath()
            c.arc(cannonBall.x, cannonBall.y, cannonBall.r, 0, Math.PI*2)
            c.fillStyle = "black"
            c.fill()

            cannonBall.vx += cannonBall.ax
            cannonBall.vy += cannonBall.ay + 0.05

            cannonBall.ax *= 0.1 
            cannonBall.ay *= 0.1
            
            cannonBall.x += cannonBall.vx
            cannonBall.y += cannonBall.vy
        }

        //---------------------------DRAW MOUSE
        c.beginPath()
        c.strokeStyle = "#763cff"
        c.lineWidth = 3
        c.moveTo(m.x-30, m.y)
        c.lineTo(m.x+30, m.y)
        c.stroke()

        c.beginPath()
        c.moveTo(m.x, m.y-30)
        c.lineTo(m.x, m.y+30)
        c.stroke()

        c.beginPath()
        c.arc(m.x, m.y, 25, 0, 6.3)
        c.stroke()
        
        worldDrawed = true
        window.requestAnimationFrame(game)
    }
    window.requestAnimationFrame(game)
})