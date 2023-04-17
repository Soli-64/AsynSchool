import { createElement, randint, randomNotes } from "../utils/utils.js"
import { Class } from "./classes.js"


export class Student {

    constructor (firstname, name, classe) {

        this.firstname = firstname
        this.name = name
        this.classe = classe
        this.notes = {
            mathematiques: randomNotes(4),
            anglais: randomNotes(4),
            technologie: randomNotes(4)
        }
        
        if (this.calculMoyenne([this.calculMoyenne(this.notes.mathematiques),this.calculMoyenne(this.notes.anglais),this.calculMoyenne(this.notes.technologie)])) {
            this.moyenne = this.calculMoyenne([this.calculMoyenne(this.notes.mathematiques),this.calculMoyenne(this.notes.anglais),this.calculMoyenne(this.notes.technologie)])
        } else {
            this.moyenne = '0.00'
        }
        
        // élément dans la création de la classe
        this.modelElement = createElement('div', {
            class: 'model-student'
        }, ``)
        this.textElement = createElement('p', {}, `${name.toUpperCase()} ${firstname}`)
        this.modelElement.append(this.textElement)
        this.textClass = createElement('p', {}, `${classe}`)
        this.modelElement.append(this.textClass)

        // element dans les listes
        const divStudent = createElement('div', {class: 'student-manager'}, ``)
        const nameF = createElement('p', {class: ''}, `${this.name.toUpperCase()} ${this.firstname}`)
        divStudent.append(nameF)
        const noteZone = createElement('div', {class: 'noteZone', id: `note${this.name}`}, `${this.moyenne}`)
        divStudent.append(noteZone)
        this.divStudent = divStudent

        // listeners
        this.divStudent.addEventListener('click', () => {
            this.noteMenu()
        })
    }

    calculMoyenne(notes) {
        var b = notes.length,
        c = 0, i;
        for (i = 0; i < b; i++){
            c += Number(notes[i]);
        }
        return (c/b).toFixed(2);
    }

    noteMenu() {
        
        document.querySelector('.note-menu')?.remove()
        // Réglage de la largeur des éléments préexistants
        document.querySelector('.class-container').style.width = '45vw'
        document.querySelectorAll('.student-manager').forEach(e => {
            e.style.width = '42vw'
        })
        // Création du menu
        const noteMenu = createElement('div', {
            class: 'note-menu'
        }, '')
        // Ajout du nom de l'élève
        noteMenu.append(createElement('p',{},`${this.name} ${this.firstname}`))
        // Ajout des éléments
        Object.keys(this.notes).forEach(e => {
            const noteElement = createElement('div', {
                class: `subject-notes`
            }, `${e.toUpperCase()} ${createElement('p',{},' - ').innerText} ${this.calculMoyenne(this.notes[e])}`)
            this.notes[e].forEach(n => {
                noteElement.append(
                    createElement('p',{
                        class: 'note'
                    }, `${n}`)
                )
            noteMenu.append(noteElement)
            })
        })
        
        document.querySelector('.class-manager').append(noteMenu)
    }
}

