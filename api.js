const fs = require('fs');
const path = require('path')

const pathExistence = (mdPath) => fs.existsSync(mdPath) //existencia de la ruta
console.log(pathExistence('README.md'))

const absOrRel = (mdPath) => path.isAbsolute(mdPath) //es absoluta?, si no, transformar
console.log(absOrRel('mdLinks.md'))

const toAbsolute = (rel) => path.join(__dirname, rel) //convertir a absoluta
console.log(toAbsolute('mdLinks.md')) 

const pathExtension = (mdPath) => path.extname(mdPath) //obteniendo la extención del archivo
console.log(pathExtension('mdLinks.md'))

const readFile = (mdPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdPath, 'utf-8', (err, data) => { // leyendo el archivo asíncronamente
            err ? reject(err) : resolve(data)
        })
    })
}

module.exports = {
    pathExistence,
    absOrRel,
    toAbsolute,
    pathExtension,
    readFile
}