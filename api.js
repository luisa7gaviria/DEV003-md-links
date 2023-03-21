const fs = require('fs');
const path = require('path')

const pathExistence = (mdPath) => fs.existsSync(mdPath) //existencia de la ruta
console.log(pathExistence('README.md'))

const absOrRel = (mdPath) => path.isAbsolute(mdPath) //es absoluta?, si no, transformar
console.log(absOrRel('mdLinks.md'))

const toAbsolute = (rel) => path.join(__dirname, rel) //convertir a absoluta
console.log(toAbsolute('mdLinks.md')) 

const pathExtension = (mdPath) => path.extname(mdPath) //obteniendo la extención del archivo
console.log(pathExtension('README.md'))

// const readFile = (mdPath) => fs.readFile(mdPath, 'utf-8', cb)
// console.log(readFile('README.md'))