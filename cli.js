#!/usr/bin/env node
const { statsArrLinks, statusRequest } = require('./api')
const mdLinks = require('./index')
const colors = require('colors')

//argumentos
const firOption = process.argv[2]
const secOption = process.argv[3] 
const thrOption = process.argv[4]

// comando de ayuda
function help(){
    console.log('escribí ayuda')

}
// si viene --validate,--stats o ambos mirar bien el orden
function cli() {
    if (secOption === '--validate') {
        mdLinks(firOption, {validate: true}).then(content => statusRequest(content).then(console.log))

    } else if (secOption === '--validate' && thrOption === '--stats') {
        console.log('escribió ambas')

    } else if (secOption === '--stats') {
        mdLinks(firOption, {validate: false}).then(content => console.log(statsArrLinks(content)))

    } else if (secOption === '--help') {
        help()
    } else {
        mdLinks(firOption, {validate: false}).then(console.log).catch(console.log)
    }
}

 // funcion que consume md links, autoejecutada
cli() 