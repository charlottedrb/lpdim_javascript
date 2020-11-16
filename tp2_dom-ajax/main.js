document.addEventListener("DOMContentLoaded", () => {
    //====================================================================VARS
    const body = document.querySelector("body")
    
    //====================================================================FUNCTIONS
    let displayBeer = (beer, i) => {
        let article = _("article", section)
        let h2 = _("h2", article, beer.name)

        let color = _("p", article, "Couleur : ")
        let colorSpan = _("span", color, beer.color)
        
        let degre = _("p", article, "Degré : ")
        let degreSpan = _("span", degre, beer.degre)

        h2.setAttribute("contenteditable", "true")
        colorSpan.setAttribute("contenteditable", "true")
        degreSpan.setAttribute("contenteditable", "true")

        let onblurChange = (element, param) => {
            // fetch("services.php?action=update&id=" + beer.id + "&" + param + "=" + element.innerHTML).then((response) => {
                //     return response.json()
                // })
            ajax("services.php", { action: "update", id: beer.id, param: element.innerHTML }).then((beers) => {
                beers.forEach(displayBeer)
            })
            }
        h2.onblur = onblurChange(h2, "name")
        colorSpan.onblur = onblurChange(colorSpan, "color")
        degreSpan.onblur = onblurChange(degreSpan, "degre")

        let delButton = _("button", article, "X", null, "delButton")
        delButton.addEventListener("click", () => {
            fetch("services.php?action=delete&id=" + beer.id).then((response) => {
                return response.json()
            }).then((beers) => {
                beers.forEach(displayBeer)
            })
        })
    }

    function ajax(url, params) {
        let parametrizedUrl = url+"?"
        for(const [k, v] of Object.entries(params)){
            parametrizedUrl += k + "=" + v + "&"
        }
        parametrizedUrl = parametrizedUrl.substring(0, parametrizedUrl.length-1)
        return fetch(parametrizedUrl).then((response) => {
            return response.json()
        })
    }

    //====================================================================ACTIONS
    //---------------------------------------------------EN TETE
    let header = _("header", body)
    _("h1", header, "Les bonnes bières du lundi matin")
    let section = _("section", body)

    //---------------------------------------------------DONNEES
    // fetch("services.php?action=list").then((response) => { //récupère le contenu de l'url 
    //     return response.json()
    // }).then((beers) => {
    //     beers.forEach(displayBeer)
    // })

    ajax("services.php", {action: "list"}).then((beers) => {
        beers.forEach(displayBeer)
    })

    //---------------------------------------------------FORMULAIRE
    let formDiv = _("div", body, null, "formDiv")
    
    let p = _("p", formDiv)
    _("span", p, "Nom")
    let nameInput = _("input", p)

    p = _("p", formDiv)
    _("span", p, "Couleur")
    let colorInput = _("input", p)

    p = _("p", formDiv)
    _("span", p, "Degré")
    let degreInput = _("input", p)

    let addButton = _("button", p, "Ajouter")

    addButton.addEventListener("click", () => {
        // fetch("services.php?action=add&name=" + nameInput.value + "&coleur=" + colorInput.value + "&degre=" + degreInput.value)
        // .then((response) => {
        //     return response.json()
        // }).then((data) => {
        //     displayBeer(data.object)
        // })
        ajax("services.php", {action: "add", name: nameInput.value, color: colorInput.value, degre: degreInput.value}).then((data) => {
            displayBeer(data.object)
        })
    })

}) // ContentLoaded


//--------------------------------------------------------------------
//Fonction de factorisation de la création d'élément DOM 
function _(tag, parent, text=null, id=null, classs=null){
    let element = document.createElement(tag)
    if(text) element.appendChild(document.createTextNode(text))
    parent.appendChild(element)
    if(id) element.id = id
    if(classs) element.classList.add(classs)
    return element
}