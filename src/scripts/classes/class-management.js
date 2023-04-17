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
        document.querySelector('.classes-article').append(classe.divClassesElement)
        classMenu(classe)
}

const classMenu = (classes) => {
    
    const classe = classes
    
    const classeInfos = createElement('div', {class: 'student-manager'}, '')
    classeInfos.append()
    
    let divStudentsArray = []
    
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

finalisation('4D', {
    SOCHON: new Student('Louis', 'Sochon', '4D'),
    TOURRE: new Student('Martin', 'Tourre', '4D'),
    DETOC: new Student('Mateo', 'Detoc', '4D'),
    DUPRE: new Student('Lila', 'Dupre', '4D'),
    GONCALVES: new Student('Chloe', 'Goncalves', '4D'),
    ROY: new Student('Esteban', 'Roy', '4D'),
    SEHIL: new Student('Keissy', 'Sehil', '4D'),
    DESAULTY: new Student('Clément', 'Desaulty', '4D'),
    LANGFORD: new Student('Alban', 'Langford', '4D'),
    FERNANDEZ: new Student('Roméo', 'Fernandez', '4D'),
    PIRON: new Student('Alexis', 'Piron', '4D'),
}, '#0001')
