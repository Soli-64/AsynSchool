/**
 * 
 * @param {string} tagName 
 * @param {object} parentClass
 * @param {innertext} string
 * @param {innerhtml} string
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes, innertext=''){

    const element = document.createElement(tagName)
    for (const [attribut, value] of Object.entries(attributes)) {
        if (value !== null) {
            element.setAttribute(attribut, value)
        }
    }
    element.innerText = innertext
    return element
}


export function addClass(elements, classes) {
    elements.forEach(e => {
        document.querySelector(e).classList.add(classes)
    })
} 