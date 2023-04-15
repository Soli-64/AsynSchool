import { addClass, createElement } from "../utils/utils.js"
import { Class } from "./classes.js"
import { Student } from "./student.js"


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

        document.querySelector('.classes').classList.remove('invisible')
        addClass(['.accueil', '.class-creater', '.class-manager'], 'invisible')

    })

}


const finalisation = (name, students, id) => {
        const classe = new Class(students, name, id)
        console.log(classe.name)
        console.log('classe ajoutée')
        document.querySelector('.classes-article').append(classe.divClassesElement)
        classMenu(classe)
}

const classMenu = (classes) => {
    
    const classe = classes
    let divStudentsArray = []
    Object.keys(classe.students).sort().forEach(e => {
        const student = classe.students[e]
        const divStudent = createElement('div', {class: 'student-manager'}, ``)
        const nameF = createElement('p', {class: ''}, `${student.name.toUpperCase()} ${student.firstname}`)
        divStudent.append(nameF)
        const noteZone = createElement('div', {class: 'noteZone', id: `note${student.name}`}, '')
        divStudent.append(noteZone)
        const classesElement = document.querySelector(`#class-${classes.name}`)
        
        divStudentsArray.push(divStudent)

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

finalisation('4D', {
    TOURRE: new Student('Martin', 'Tourre', '4D'),
    SOCHON: new Student('Louis', 'Sochon', '4D')
}, '#0001')
