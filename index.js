const {readFile, getFileLinks} = require('./api')

const mdLinks = (path, option) => {
  readFile(path).then((filedata) => {
   filedata
  }).catch(error => console.log(error))
}

// aquí es donde voy aceptando o rechazando la promesa 
mdLinks('mdLinks.md')
module.exports = mdLinks
