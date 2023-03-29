const fs = require('fs');
const path = require('path');
const axios = require('axios')

const pathExistence = (mdPath) => fs.existsSync(mdPath); //existencia de la ruta

const absOrRel = (mdPath) => path.isAbsolute(mdPath); //es absoluta?, si no, transformar

const toAbsolute = (relPath) => path.resolve(relPath); //convertir a absoluta 

const pathExtension = (mdPath) => {     //obteniendo la extensión del archivo
    if (path.extname(mdPath) === '.md') {
        return mdPath
    }
}; 

const readFile = (mdPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdPath, 'utf-8', (err, data) => { // leyendo el archivo asíncronamente
        data === '' ? reject(err = 'No content to read') : resolve(data);
        });
    });
};

const getFileLinks = (fileContent) => { // extrayendo links 
    return new Promise((resolve, reject) => {
        const regLink = /\[(.*?)\]\((.*?)\)/g;
        let result 
        const arrayLinks = []
        while (result = regLink.exec(fileContent)) {
            const fileLinks = result[2]
            arrayLinks.push(fileLinks)
            resolve(arrayLinks)
        };
        if (regLink.exec(fileContent) === null ) {
            reject('This file does not contain links')
        }
    })
};

const statusRequest = (link) => {   //consulta http a AXIOS
    return axios.get(link)
    .then(res => [res.status, res.statusText])
    .catch(err => !err.response ? [-1, 'Not Found'] : [err.response.status, err.response.statusText])
} 

const askingDuplicates = (arrayLink) => {   //Buscando links repetidos- Funcion Stats
    const busqueda = arrayLink.reduce((acc, property) => {
        acc[property.url] = ++acc[property.url] || 0;
        return acc;
    }, {})
    const duplicados = arrayLink.filter((property) => {
        return busqueda[property.url];
    });
  return {
    Total: arrayLink.length,
    Unique: arrayLink.length - duplicados.length
  }
};

module.exports = {
    pathExistence,
    absOrRel,
    toAbsolute,
    pathExtension,
    readFile, 
    getFileLinks,
    
}