document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body")
    let header = _("header", body)
    _("h1", header, "Les bonnes bières du lundi matin")
})

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
//--------------------------------------------------------------------