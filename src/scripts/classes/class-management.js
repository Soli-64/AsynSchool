import { addClass, createElement, reSizeBody } from "../utils/utils.js"
import { Class } from "./classes.js"
import { Student } from "./student.js"

/**
 * La fonction newClass met en marche les listeners de fonctionnement des classes (création et management)
 */
const runningFunctionality = () => {

    let className;
    let students = {};
    let id;

    document.querySelector('.new-student').addEventListener('click', () => {
        const firstname = document.querySelector('#student-firstname')
            .value
            .trim()
        document.querySelector('#student-firstname').value = ''
        const name = document.querySelector('#student-name')
            .value
            .trim()
        document.querySelector('#student-name').value = ''

        const classeName = `${document.querySelector('#class-level-definer').value}${document.querySelector('#letter-choice').value}`
        
        // vérification du nom de la classe (un chiffre et une lettre)
        if (firstname && name && classeName.trim().split('').length === 2) {
            const student = new Student(firstname, name.toUpperCase(), classeName)
            students[student.name] = student
            document.querySelector('.students-list').append(student.modelElement)
        }
        
    })

    document.querySelector('.finished').addEventListener('click', () => {

        const classeName = `${document.querySelector('#class-level-definer').value}${document.querySelector('#letter-choice').value}`
        className = classeName
        id = '#0001'

        // Réinisialisation des choix
        document.querySelector('#class-level-definer').selectedIndex = 0
        document.querySelector('#letter-choice').value = ''
        document.querySelector('.students-list').innerHTML = ''
        document.querySelector('.new-student').removeEventListener('click', {})
        document.querySelector('.finished').removeEventListener('click',  {})

        // Vérification que le nom de la classe est complet
        if (Object.keys(students).length !== 0) {
            newClass(students, className, id)
        }

        // mise a l'écran de la div .classes et disparition des autres
        document.querySelector('.classes').classList.remove('invisible')
        addClass(['.accueil', '.class-creater', '.class-manager'], 'invisible')

    })

}

/**
 * Fonction de création de la classe (pour éviter les interferances des variables a cause des addEvenListener)
 * @param {string} name nom de la classe (ex: 4D) 
 * @param {object} students Objet des élèves
 * @param {string} id '#0001'
 */
const newClass = (students, name, id) => {
        const classe = new Class(students, name, id)
        document.querySelector('.classes-article').prepend(classe.divClassesElement)
        classMenu(classe)
}

/**
 * Fonction qui créer la liste, affiche les moyennes et enclenche les listeners pour le menu de notes
 * @param {Class} classes Class représentant la classe  
 */
const classMenu = (classes) => {
    
    const classe = classes
    
    const classeInfos = createElement('div', {class: 'student-manager class-model'}, '')
    classeInfos.append(createElement('span', {}, `${classe.moyenne}`))
    classeInfos.prepend(createElement('p', {}, classe.name))
    // ajout du listener => menu d'ajout des notes
    classeInfos.addEventListener('click', () => {
            document.querySelector('.note-menu')?.remove()
            document.querySelector('.class-menu')?.remove()
    
            //  création de l'élément
            const classMenu = createElement('div', {
                class: 'class-menu'
            }, '')

            // calcul de sa hauteur
            classMenu.style.height = `${document.querySelector('.class-container').offsetHeight}px`

            // Note-Grid
            const noteGrid = createElement('div', {class: 'student-note-grid'}, '')
            Object.keys(classe.students).forEach(e => {noteGrid.append(createElement('input', {
                class: 'note-input',
                id: `new-note-${e}`,
                type: 'text'
            }, ''))})
            classMenu.prepend(noteGrid)

            // Menu déroulant pour les matières
            const subjectDefiner = createElement('select', {
                class: 'note-subject-definer'
            }, '')
            Object.keys(Object.values(classe.students)[0].notes).forEach(subject => {
                subjectDefiner.append(createElement('option', {}, `${subject}`))
            })
            classMenu.append(subjectDefiner)

            // Boutton de validation
            const addNotesButton = createElement('button', {class: 'new-note-button'}, 'Ajouter une note')
            classMenu.append(addNotesButton)
                        
            // Note-Grid-Header
            noteGrid.prepend(createElement('p', {class: 'note-input-header'}, 'Notes'))


            // Ajout du listener
            addNotesButton.addEventListener('click', (event) => {
                document.querySelectorAll('.note-input').forEach(e => {
                    if (Number(e.value)) {
                        if (Number(e.value) <= 20 && Number(e.value) >= 0) {
                            classe.students[e.id.replace('new-note-', '')].notes[subjectDefiner.value].push(Number(e.value))
                        }
                    }
                    e.value = '' 
                })
                updateMoyennes(classes)
            })

            // Ajout de l'élément au visuel
            document.querySelector('.student-menu').append(classMenu)
        }
    )
    
    let divStudentsArray = []
    divStudentsArray.push(classeInfos)
    
    Object.keys(classe.students).forEach(e => {
        const student = classe.students[e]
        const classesElement = document.querySelector(`#class-${classe.name}`)
        
        divStudentsArray.push(student.divStudent)

        classesElement.addEventListener('click', () => {
            document.querySelector('.class-manager').classList.remove('invisible')
            addClass(['.accueil', '.class-creater', '.classes'], 'invisible')
            document.querySelector('.class-container').innerHTML = ''
            divStudentsArray.forEach(e => {
                document.querySelector('.class-container').append(e)
            })

        })

    })

}

function updateMoyennes(classe) {
    console.log(classe)
    console.log('test')
    Object.keys(classe.students).forEach((s) => {
        classe.students[s].moyenne = classe.students[s].generalMoyenne()
    })
    document.querySelectorAll('.noteZone').forEach(e => {
        //console.log(classe.students[e.id.replace('note', '').toUpperCase()])
        console.log(e.innerHTML)
        e.innerHTML = classe.students[e.id.replace('note', '').toUpperCase()].moyenne
        console.log(e.innerHTML)
    })
}

// Lancement du code (initialisation)
if (true) {

    runningFunctionality()
    
    reSizeBody()
    document.querySelector('body').addEventListener('click', () => {
        reSizeBody()
    })

    // classe générée pour les tests
    newClass({
        SOCHON: new Student('Louis', 'Sochon', '4D'),
        TCHEN: new Student('lila', 'tchen', '4D'),
        DUBOIS: new Student('Mathilde', 'Dubois', '4D'),
        VALE: new Student('aria', 'vale', '4D'),
        GIRARD: new Student('Antoine', 'Girard', '4D'),
        DURAND: new Student('Lucien', 'Durand', '4D'),
        MARTIN: new Student('Théo', 'Martin', '4D'),
        BERNARD: new Student('Léa', 'Bernard', '4D'),
        DUPONT: new Student('Sébastien', 'Dupont', '4D'),
        MOREAU: new Student('Juliette', 'Moreau', '4D'),
        LAMBERT: new Student('Amélie', 'Lambert', '4D'),
    }, '4D', '#0001')

    // seconde classe générée pour les tests
    newClass({
        TEST: new Student('Hugo', 'Test', '4D'),
        TCHEN: new Student('lila', 'tchen', '4D'),
        DUBOIS: new Student('Mathilde', 'Dubois', '4D'),
        VALE: new Student('aria', 'vale', '4D'),
        GIRARD: new Student('Antoine', 'Girard', '4D'),
        DURAND: new Student('Lucien', 'Durand', '4D'),
        MARTIN: new Student('Théo', 'Martin', '4D'),
        BERNARD: new Student('Léa', 'Bernard', '4D'),
        DUPONT: new Student('Sébastien', 'Dupont', '4D'),
        MOREAU: new Student('Juliette', 'Moreau', '4D'),
        LAMBERT: new Student('Amélie', 'Lambert', '4D'),
    }, '1C', '#0001')

}
