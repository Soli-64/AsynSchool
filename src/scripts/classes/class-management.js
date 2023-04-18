import { addClass, createElement } from "../utils/utils.js"
import { Class } from "./classes.js"
import { Student } from "./student.js"

/**
 * La fonction newClass met en marche les listeners de fonctionnement des classes (création et management)
 */
const newClass = () => {

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
            const student = new Student(firstname, name, classeName)
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
            finalisation(className, students, id)
        }

        // mise a l'écran de la div .classes et diparition des autres
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
const finalisation = (name, students, id) => {
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
    
    const classeInfos = createElement('div', {class: 'student-manager'}, '')
    classeInfos.append(createElement('span', {}, `${classe.moyenne}`))
    classeInfos.prepend(createElement('p', {}, classe.name))
    
    let divStudentsArray = []
    divStudentsArray.push(classeInfos)
    
    Object.keys(classe.students).sort().forEach(e => {
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


newClass()

// classe générée pour les tests
finalisation('4D', {
    SOCHON: new Student('Louis', 'Sochon', '4D'),
    DUBOIS: new Student('Mathilde', 'Dubois', '4D'),
    VALE: new Student('aria', 'vale', '4D'),
    TCHEN: new Student('lila', 'tchen', '4D'),
    GIRARD: new Student('Antoine', 'Girard', '4D'),
    DURAND: new Student('Lucien', 'Durand', '4D'),
    MARTIN: new Student('Théo', 'Martin', '4D'),
    BERNARD: new Student('Léa', 'Bernard', '4D'),
    DUPONT: new Student('Sébastien', 'Dupont', '4D'),
    MOREAU: new Student('Juliette', 'Moreau', '4D'),
    LAMBERT: new Student('Amélie', 'Lambert', '4D'),
}, '#0001')
