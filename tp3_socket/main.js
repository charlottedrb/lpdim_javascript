document.addEventListener("DOMContentLoaded", () => {
    //io appelle l'api
    const socket = io("51.83.36.122:8080")
    
    const pseudo = document.querySelector("#pseudo")
    const text = document.querySelector("#text")
    const button = document.querySelector("#chat button")
    
    //nous met direct dans le input #text
    text.focus()
    text.addEventListener("keyup", (e) => {
        if(e.key == "Enter"){
            send()
        }
    })
    button.addEventListener('click', send)

    function send() {
        socket.emit("message", {
            pseudo: pseudo.value, 
            text: text.value
        })
        text.value = ""
    }

    const messages = document.querySelector("#messages")

    socket.on("message", (data) => {
        let message = _('div', messages, null, "message")
        let pseudo = _('span', message, data.pseudo, "pseudoMsg")
        let textMsg = _('p', message, data.text, "textMsg")
        //scrollTop : nb de pixel à partir du haut
        messages.scrollTop = messages.scrollHeight
        
    })

   

    //Fonction de factorisation de la création d'élément DOM 
    function _(tag, parent, text = null, id = null, classs = null) {
        let element = document.createElement(tag)
        if (text) element.appendChild(document.createTextNode(text))
        parent.appendChild(element)
        if (id) element.id = id
        if (classs) element.classList.add(classs)
        return element
    }
})