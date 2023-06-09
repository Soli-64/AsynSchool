import { createElement, calculMoyenne } from "../utils/utils.js";


export class Class {

    /**
     * @param {object} students au format  NAME: new Student('Firstname', 'Name', 'class') 
     * @param {string} tagName ex: 4D
     * @param {string} id '#0001'
     */
    constructor (students, name, id) {

        this.name = name
        // classement dans l'ordre alphabétique
        this.students = {}
        const s = students
        const sSort = Object.keys(s).sort()
        sSort.forEach(s => {
            this.students[s] = students[s]
        })
        
        this.id = id
        
        this.generalMoyenne()

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
            document.querySelector('.class-container').style.width = ''
            document.querySelectorAll('.student-manager').forEach(e => {
                e.style.width = ''
            })
        })

    }

    generalMoyenne() {
        let studentsMoyennes = []
        Object.keys(this.students).forEach(student => {
            studentsMoyennes.push(this.students[student].moyenne)
        })
        this.moyenne = calculMoyenne(studentsMoyennes)
    }
}