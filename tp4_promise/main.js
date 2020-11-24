//Exercice 1 

    //let buttons = document.querySelectorAll('button')
    // let clicked = [0, 0, 0]
    // for (let i = 0; i < buttons.length; i++) {
    //     if (clicked === [1, 1, 1]) {
    //         console.log("all clicked")
    //         break;
    //     } else {
    //         const b = buttons[i];
    //         b.addEventListener('click', () => {
    //             clicked[i] = 1
    //             console.log(clicked)
    //             console.log(b.id)
    //         })
    //     }
    // }


//-----------------------------------------------------------------
// Méthode classique : CALLBACK

    // function wait(callback) {
    //     setTimeout(callback, 1000)
    // }
    // wait(() => {
    //     console.log(42)
    // })

    // wait(() => {
    //     console.log(73)
    // })

    // wait(() => {
    //     console.log('HOP')
    // })
    //Revient à faire 

    // wait(() => {
    //     console.log(42)
    //     wait(() => {
    //         console.log(73)
    //         wait(() => {
    //             console.log('HOP')
    //         })
    //     })
    // })


//-----------------------------------------------------------------
// Promesses (Promise)

//Exemple : 
// new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("HOP")
//     }, 1000)

// }) 
// .then((data) => {
//     console.log(data)
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(42)
//         }, 1000)
//     })
// })
// .then((data) => {
//     console.log(data)
// })

// new Promise((resolve) => {
//     document.querySelector("#ba").addEventListener('click', (event) => {
//         resolve(event.target)
//     }) 
// })  .then((data) => {
//         console.log(data)
//     })

// let waitForButtonA = new Promise((resolve) => {
//     document.querySelector("#ba").addEventListener('click', (event) => {
//         resolve(event.target)
//     })
// })

// waitForButtonA.then((data) => {
//     console.log(data)
// })

async function f(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(42)
        }, 1000)
    })
}

async function g(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(73)
        }, 1000)
    })
}

async function h(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("HOP")
        }, 1000)
    })
}

async function main(){
    let rf = await f()
    let rg = await g()
    let rh = await h()
    console.log(rf)
    console.log(rg)
    console.log(rh)
}
main()

ajax("connect.php", { }, function(responseConnect) {
    ajax("getdata.php", { }, function(responseData) {
        ajax("getdata.php", { }, function(responseOtherData){
            
        })
    })
})