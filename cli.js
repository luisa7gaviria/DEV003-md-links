#!/usr/bin/env node
const { statsArrLinks, statusRequest } = require('./api')
const mdLinks = require('./index')
const colors = require('colors')

const firOption = process.argv[2]
const secOption = process.argv[3] 
const thrOption = process.argv[4]

colors.setTheme({
    error: ['yellow', 'underline'],
    mdError: ['brightCyan', 'italic'],
    mdGuide: ['inverse','underline','italic'],
    mdPath: ['cyan','underline'],
    mdCommand: ['brightGreen', 'bold']
})

function help(){
    console.log('\n---------------------------------->')
    console.log(' * A guide to mdLinks:\n'.mdGuide)
    console.log(colors.brightRed(' Before you start: '+'Make sure you write your commands correctly!\n'))
    console.log(' >'.magenta+' To see basic info about a file, type: '+'Your file name'.mdPath +'\n')
    console.log(' >'.magenta+' To know the status of file links, type: '+'Your file.md'.mdPath +' '+'--validate'.mdCommand +'\n')
    console.log(' >'.magenta+' To see stats about file links, type: '+'Your file.md'.mdPath +' '+'--stats'.mdCommand +'\n')
    console.log(' >'.magenta+' To see stats about links status, type: '+'Your file.md'.mdPath+' '+'--validate --stats '.mdCommand+ 'or '+ '--stats --validate'.mdCommand)
    console.log('\n---------------------------------->')
}

function cli() {
     if (secOption === '--validate' && thrOption === '--stats' || secOption === '--stats' && thrOption === '--validate') {
        mdLinks(firOption, {validate: true}).then(content => statusRequest(content)

        .then(res => {
           const statsValidated = statsArrLinks(res, 'href', true)
           console.log('\n---------------------------------->'.yellow)
           console.log(` Stats from ${firOption} \n`.mdPath)
           console.log(` Total: ${statsValidated.Total}`)
           console.log(` Unique: ${statsValidated.Unique}`)
           console.log(` Broken: ${statsValidated.Broken}\n`)
        }))
        .catch(err => console.log(`${err}`.error))

    } else if ( secOption === '--validate') {
        mdLinks(firOption, {validate: true}).then(content => statusRequest(content)

        .then(res => console.log(colors.brightCyan(res))))
        .catch(err => console.log(`${err}`.error))

    } else if (secOption === '--stats') {
        mdLinks(firOption, {validate: false})
        
        .then(res => {
            const stats = statsArrLinks(res, 'href', true)
            console.log('\n---------------------------------->'.yellow)
            console.log(` Stats from ${firOption} \n`.mdPath)
            console.log(` Total: ${stats.Total}`)
            console.log(` Unique: ${stats.Unique}\n`)
         })
        .catch(err => console.log(`${err}`.error))

    } else if (firOption === undefined) {
        help()

    } else if (firOption === '--help') {
        help()

    } else {
        mdLinks(firOption, {validate: false})
        .then(res => console.log(colors.brightCyan(res)))
        .catch(err => console.log(`${err}`.error))
    }
}

cli() 