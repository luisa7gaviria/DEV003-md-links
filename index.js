const {pathExistence, absOrRel, toAbsolute, pathExtension, readFile} = require('./api')

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    if (!pathExistence(path)) {
      reject('Path does not exists')
    } else if (pathExistence(path)){
      resolve(path)
    }
  })
  
}

// aquí es donde voy aceptando o rechazando la promesa 
mdLinks('mdLinks.md')
.then(data => console.log(data))
.catch(err => console.log(err))
module.exports = mdLinks
