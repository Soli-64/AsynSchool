import { createElement } from "../utils/utils.js";


export class Class {

    /**
     * @param {object} students au format  NAME: new Student('Firstname', 'Name', 'class') 
     * @param {string} tagName ex: 4D
     * @param {string} id '#0001'
     */
    constructor (students, name, id) {

        this.name = name
        this.students = students
        this.id = id

        // élément dans le container de classes
        const divClassesElement = createElement('div', {
            class: 'class',
            id: `class-${name}`
        }, '')
        const spanName = createElement('span', {
            class: 'name-class'
        }, this.name)
        divClassesElement.prepend(spanName)
        const spanStudentsNumber = createElement('span', {
            class: 'n-students'
        }, `${
            Object.keys(this.students)  
                .length
                .toString()} élèves`)
        divClassesElement.append(spanStudentsNumber)
        this.divClassesElement = divClassesElement

        document.querySelector('.header').addEventListener('mouseenter', () => {
            document.querySelector('.note-menu')?.remove()
        })

    }
}