import { createElement, randomNotes, upLetter, calculMoyenne } from "../utils/utils.js"
import { Class } from "./classes.js"


export class Student {

    /**
     * Class représentant l'élève individuellement
     * @param {string} firstname prénom de l'élève
     * @param {string} name nom de l'élève
     * @param {string} classe classe
     */
    constructor (firstname, name, classe) {

        this.firstname = upLetter(firstname, 0)
        this.name = upLetter(name, 0)
        this.classe = classe
        this.notes = {
            mathematiques: randomNotes(4),
            anglais: randomNotes(4),
            technologie: randomNotes(4)
        }
        
        // calcul de la moyenne (si erreur, retourne 0.00)
        if (calculMoyenne([calculMoyenne(this.notes.mathematiques),calculMoyenne(this.notes.anglais),calculMoyenne(this.notes.technologie)])) {
            this.moyenne = calculMoyenne([calculMoyenne(this.notes.mathematiques),calculMoyenne(this.notes.anglais),calculMoyenne(this.notes.technologie)])
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

    /**
     * Fonction qui créer et ajoute au body le menu des notes
     */
    noteMenu() {
        // suppression si menu présent
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
        // Ajout des sélecteurs de menus
        let menuSelectors = []
        menuSelectors.push(createElement('p', {class: 'menu-selector', id: 'notes'}, 'Notes'))
        menuSelectors.push(createElement('p', {class: 'menu-selector', id: 'edt'}, 'Emploi du temps'))
        menuSelectors.forEach(e => {noteMenu.append(e)})
        // Ajout du nom de l'élève
        noteMenu.append(createElement('p',{},`${this.name} ${this.firstname}`))
        // Ajout des éléments
        Object.keys(this.notes).forEach(e => {
            const noteElement = createElement('div', {
                class: `subject-notes`
            }, `${e.toUpperCase()} ${createElement('p',{},' - ').innerText} ${calculMoyenne(this.notes[e])}`)
            this.notes[e].forEach(n => {
                noteElement.append(
                    createElement('p',{
                        class: 'note'
                    }, `${n}`)
                )
            noteMenu.append(noteElement)
        
            })
        })
        // ajout du menu au contenu du body
        document.querySelector('.student-menu').append(noteMenu)
    }
}
