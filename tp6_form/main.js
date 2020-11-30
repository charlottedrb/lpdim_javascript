document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")

    for (const div of form.querySelectorAll("div")) {

        //-------------------------- DOUBLE RADIO / Switch 
        let radios = div.querySelectorAll('input[type="radio"]')
        if(radios.length == 2){

            let labels = div.querySelectorAll("label")
            let values = { }

            for (let i in radios) {
                if (radios[i].classList) {
                    radios[i].classList.add("hide")
                    labels[i].classList.add("hide")
                    values[radios[i].value] = labels[i].innerText
                }
            }
            
            _("span", div, labels[0].innerText, null, "souitchLabel")
            const souitch = _("div", div, null, null, "souitch")
            const ball = _("span", souitch, null, null, "ball")
            _("span", div, labels[1].innerText, null, "souitchLabel")

            souitch.addEventListener("click", () => {
                ball.classList.toggle("clicked")
                if(ball.classList.contains("clicked")){
                    radios[1].checked = true
                    radios[0].checked = false
                } else {
                    radios[1].checked = false
                    radios[0].checked = true
                }
            })
        }
        //--------------------------
        let select = div.querySelector("select")
        if(select){
            let values = Array.from(select.querySelectorAll("option"))
                .map(option => option.value)
            select.classList.add("hide")
            const label = div.querySelector("label")

            let selectAccess = _("span", label, null, null, "selectAccess")
            selectAccess.style.left = (label.innerText.length*8)+"px"

            let angle = -Math.PI/3
            let valueElements = []
            let text = document.createTextNode("") 
            selectAccess.appendChild(text)

            for (let value of values) {
                if(value != ""){
                    let valueElement = _("span", selectAccess, value, null, "valueElement")
                    valueElements.push(valueElement)
                    let x = 50 * Math.cos(angle)
                    let y = 50 * Math.sin(angle)
                    valueElement.style.top = y + "px"
                    valueElement.style.left = x + "px"
    
                    angle += Math.PI/4
    
                    valueElement.addEventListener("click", () => {
                        select.value = value
                        text.data = value
                    })
                }
            }

            selectAccess.addEventListener("click", () => {
                selectAccess.classList.toggle("active")
            })
        }

        //--------------------------
        let range = div.querySelector("input[type=range]")
        if(range){
            let rangeValue = _("span", div, range.value, null, "rangeValue")
            range.addEventListener("input", () => {
                rangeValue.innerText = range.value
            })
        }
    }

})

function _(tag, parent, text = null, id = null, classs = null) {
    let element = document.createElement(tag)
    if (text) element.appendChild(document.createTextNode(text))
    parent.appendChild(element)
    if (id) element.id = id
    if (classs) element.classList.add(classs)
    return element
}