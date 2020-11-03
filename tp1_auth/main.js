document.addEventListener("DOMContentLoaded", () => {
    const adminLink = document.querySelector("#admin")
    adminLink.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector("#bg").classList.remove("hidden")

        const circles = document.querySelectorAll(".circle")
        circles.forEach((circle, i) => {
            circle.addEventListener("mouseenter", () => {
                console.log(i);
            })
        });
        
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