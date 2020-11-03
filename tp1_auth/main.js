document.addEventListener("DOMContentLoaded", () => {
    const adminLink = document.querySelector("#admin")
    adminLink.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector("#bg").classList.remove("hidden")

        const circles = document.querySelectorAll(".circle")
        const auth = document.querySelector("#auth")
        let code = ""

        circles.forEach((circle, i) => {
            circle.addEventListener("mouseenter", () => {
                if(code.indexOf(i) == -1){
                    code += i;
                }
                circle.classList.add("selected")
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