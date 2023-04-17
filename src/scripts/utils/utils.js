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

export function randint(max) {
    return Math.floor(Math.random() * max);
}

export function randomNotes(n) {
    const notes = []
    for (let x = 0; x <= (n - 1);x++) {
        notes.push(randint(20))
    }
    return notes
}
