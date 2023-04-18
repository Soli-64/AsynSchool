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

/**
 * Fonction qui attribue une classe a tout les éléments passés e paramètres dans elements
 * @param {Array} elements tableau de nom de classes 
 * @param {string} classes classe a attribué aux éléments de elements
 */
export function addClass(elements, classes) {
    elements.forEach(e => {
        document.querySelector(e).classList.add(classes)
    })
}

/**
 * retourne un entier entre 0 et max
 * @param {number} max nombre maximal obtensible souhaité 
 * @returns {number} 
 */
export function randint(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Génère le nombre n de notes aléatoires entre 0 et 24
 * @param {number} n nombres de notes souhaitées 
 * @returns {Array} Array of notes
 */
export function randomNotes(n) {
    const notes = []
    for (let x = 0; x <= (n - 1);x++) {
        notes.push(randint(20) + randint(4))
    }
    return notes
}

/**
 * fonction qui retourne un mot en executant .toUpperCase() sur la lettre[i]
 * @param {string} word mot a rendre 
 * @param {number} i index de la lettre
 * @returns {string} 
 */
export function upLetter(word, i) {
    const words = word.split('')
    words[0] = words[0]?.toUpperCase()
    return words.join('')
}

/**
 * Fonction qui calcul la moyenne des notes données en paramètre
 * @param {Array} notes array de notes 
 * @returns {number} retourne la moyenne des notes
 */
export function calculMoyenne(notes) {
    var b = notes.length,
    c = 0, i;
    for (i = 0; i < b; i++){
        c += Number(notes[i]);
    }
    return (c/b).toFixed(2);
}