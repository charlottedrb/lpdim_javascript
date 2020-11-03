document.addEventListener("DOMContentLoaded", () => {
    const adminLink = document.querySelector("#admin")
    adminLink.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector("#bg").classList.remove("hidden")

        const canvas = document.querySelector("#auth canvas");
        const c = canvas.getContext("2d")
        let ox, oy, x, y

        const circles = document.querySelectorAll(".circle")
        const auth = document.querySelector("#auth")

        let code = ""

        circles.forEach((circle, i) => {
            circle.addEventListener("mouseenter", () => {
                if(code.indexOf(i) == -1){
                    code += i;
                    circle.classList.add("selected")
    
                    //Rectangle englobant le circle
                    let rect = circle.getBoundingClientRect()
    
                    if(code.length == 1){
                        //Le code n'a qu'un seul caractère, premier point
                        c.beginPath()
                        c.moveTo(circle.offsetLeft + rect.width / 2, circle.offsetTop + rect.height / 2)
                    } else {
                        //les autres points 
                        c.lineTo(circle.offsetLeft + rect.width / 2, circle.offsetTop + rect.height / 2)
                        c.strokeStyle = "lightpink"
                        c.lineWidth = 3
                        c.stroke()
                    }
                }
            })
        });

        auth.addEventListener("mouseleave", () => {
            fetch("auth.php?code=" + code)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelectorAll(".selected").forEach((selectedCircle, j) => {
                    selectedCircle.classList.add(data.ok     ? 'selected-ok' : "selected-fail")
                });

                //Permet de réinitialiser la string, sinon "012" puis "012345"...
                code = ""
    
                setTimeout(() => {
                    document.querySelectorAll(".selected").forEach((selectedCircle, j) => {
                        selectedCircle.classList.remove("selected")
                        selectedCircle.classList.remove("selected-ok")
                        selectedCircle.classList.remove("selected-fail")
                    });
                    c.clearRect(0, 0, canvas.width, canvas.clientHeight)
                    if(data.ok){
                        window.location = "admin"
                    }
                }, 1000)
            })
        })
    })
})

/* les 4 boucles 
for (let index = 0; index < circles.length; index++) {
    console.log(circles[i])
}

for (const key in circles) {
    console.log(circles[i])
}

for (const circle of circles) {
    //parcourt les objets de la liste directement
    console.log(circle)
}

array.forEach((circle, i) => {
    console.log(circle)
});

*/