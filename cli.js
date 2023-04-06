#!/usr/bin/env node
const { statsArrLinks, statusRequest } = require('./api')
const mdLinks = require('./index')
const colors = require('colors')

const firOption = process.argv[2]
const secOption = process.argv[3] 
const thrOption = process.argv[4]

colors.setTheme({
    error: ['yellow', 'underline'],
    mdError: ['cyan', 'italic'],
    mdGuide: ['inverse','underline','italic'],
    mdPath: ['cyan','underline']
})

function help(){
    console.log('\n---------------------------------->')
    console.log(' * A guide to mdLinks:\n'.mdGuide)
    console.log(' >'.magenta+' To see basic info about a file, type: '+'Your file name'.bgMagenta.white +'\n')
    console.log(' >'.magenta+' To know the status of file links, type: '+'Your file.md'.mdPath +' '+'--validate'.green +'\n')
    console.log(' >'.magenta+' To see stats about file links, type: '+'Your file.md'.mdPath +' '+'--stats'.green +'\n')
    console.log(' >'.magenta+' To see stats about links status, type: '+'Your file.md'.mdPath+' '+'--validate --stats '.green+ 'or '+ '--stats --validate'.green)
    console.log('\n---------------------------------->')
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