import { createElement } from "../utils/utils.js"
import { Class } from "./classes.js"


export class Student {

    constructor (firstname, name, classe) {

        this.firstname = firstname
        this.name = name
        this.classe = classe
        this.notes = {
            maths: [],
            anglais: [],
            tech: []
        }
        this.moyenne = this.calculMoyenne([
            this.calculMoyenne(this.notes.maths),
            this.calculMoyenne(this.notes.anglais),
            this.calculMoyenne(this.notes.tech)
        ])

        this.modelElement = createElement('div', {
            class: 'model-student'
        }, ``)
        this.textElement = createElement('p', {}, `${name.toUpperCase()} ${firstname}`)
        this.modelElement.append(this.textElement)
        this.textClass = createElement('p', {}, `${classe}`)
        this.modelElement.append(this.textClass)
    }

    calculMoyenne(notes) {
        let moyen;
        notes.forEach(note => {
            moyen += note
        })
        return moyen / notes.length
    }
}
