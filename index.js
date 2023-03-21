const {readFile} = require('./api')

const mdLinks = (path, option) => {
  readFile(path).then((filedata) => {
    console.log(filedata)
  })
}

// aquí es donde voy aceptando o rechazando la promesa 
mdLinks('mdLinks.md')
module.exports = mdLinks
