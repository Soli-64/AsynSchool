import { Student } from "../classes/student.js"
import { createElement, addClass } from "../utils/utils.js"


document.querySelector('#accueil').addEventListener('click', () => {
    document.querySelector('.accueil').classList.remove('invisible')
    addClass(['.classes', '.class-creater', '.class-manager'], 'invisible')
})

document.querySelector('#classes').addEventListener('click', () => {
    document.querySelector('.classes').classList.remove('invisible')
    addClass(['.accueil', '.class-creater', '.class-manager'], 'invisible')
})

document.querySelector('.new-class').addEventListener('click', () => {
    document.querySelector('.class-creater').classList.remove('invisible')
    addClass(['.accueil', '.classes', '.class-manager'], 'invisible')
})
