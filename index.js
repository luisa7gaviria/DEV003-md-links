const {pathExistence, absOrRel, pathExtension, readFile, getFileLinks} = require('./api')

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    if (!pathExistence(path)) {

      reject('Path does not exists')

    } else if (pathExistence(path)){

      if (!pathExtension(absOrRel(path))) {
        reject('File is not type markdown')

      } else {
        
        readFile(absOrRel(path))
        .then(fileText => {

          getFileLinks(fileText, absOrRel(path))
          .then(links => resolve(links))
          .catch(nolink => reject(nolink))
        })
        .catch(noContent => reject(noContent))
      }
    }
  })
  
}

mdLinks('mdLinks.md')
.then(data => data) // lo que resuelvo => arreglos con 3 o 5 datos
.catch(err => err) // lo que rechazo => cosas que pueden rechazar el procedimiento
module.exports = mdLinks
