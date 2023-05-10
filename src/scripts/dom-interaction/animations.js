
const citationElement = document.querySelector("#citation")
const citation = "\"Là où l'éducation rencontre l'innovation.\""
const citationArray = citation.split('')

sentenceAnimater(0, citationArray)

citationElement.innerText = ''

function sentenceAnimater(index, array) {
    setTimeout(() => {
        if (index <= array.length - 1) {
            if (array[index] === ' ') {
                citationElement.innerHTML += '&nbsp;'
            }
            citationElement.innerText += array[index]
            sentenceAnimater(index + 1, array)
        }
    }, 25)
}
