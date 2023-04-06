#!/usr/bin/env node
const { statsArrLinks, statusRequest } = require('./api')
const mdLinks = require('./index')
const colors = require('colors')

//argumentos
const firOption = process.argv[2]
const secOption = process.argv[3] 
const thrOption = process.argv[4]

// definiendo temas de colores
colors.setTheme({
    error: ['yellow', 'underline'],
    mdError: ['cyan', 'italic'],
    mdGuide: ['inverse','underline','italic'],
})

// comando de ayuda
function help(){
    console.log(' ---------------------------------->\n')
    console.log(' * A guide to mdLinks:'.mdGuide)
    console.log(' > If you want to see basic info about a file, type: ' +  'Your file name'.bgMagenta.white)
    console.log('')
    console.log('')

}

function cli() {
    if (secOption === '--validate' && thrOption === '--stats' || secOption === '--stats' && thrOption === '--validate') {
        mdLinks(firOption, {validate: true}).then(content => statusRequest(content)

        .then(res => console.log(statsArrLinks(res, 'href', true))))
        .catch(err => console.log(`${err}`.error))

    } else if (secOption === '--validate') {
        mdLinks(firOption, {validate: true}).then(content => statusRequest(content)

        .then(console.log))
        .catch(err => console.log(`${err}`.error))

    } else if (secOption === '--stats') {
        mdLinks(firOption, {validate: false})
        
        .then(content => console.log(statsArrLinks(content, 'href')))
        .catch(err => console.log(`${err}`.error))

    } else if (secOption === '--help') {
        help()

    } else if (firOption === (undefined || '--help')) {
        console.log('Md-Links Error: Please provide a path'.mdError)

    } else {
        mdLinks(firOption, {validate: false})
        .then(console.log)
        .catch(err => console.log(`${err}`.error))
    }
}

cli() 