const fs = require('fs');
const path = require('path');
const axios = require('axios')

const pathExistence = (mdPath) => fs.existsSync(mdPath); //existencia de la ruta

const absOrRel = (mdPath) => path.isAbsolute(mdPath); //es absoluta?, si no, transformar

const toAbsolute = (relPath) => path.resolve(relPath); //convertir a absoluta 

const pathExtension = (mdPath) => path.extname(mdPath); //obteniendo la extención del archivo

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
        while (result= regLink.exec(fileContent)) {
            const fileLinks = result[2]
            arrayLinks.push(fileLinks)
            resolve(arrayLinks)
        };
        if (regLink.exec(fileContent) === null ) {
            reject('This file does not contain links')
        }
    })
};

const statusRequest = (link) => {
    return new Promise((resolve) => {
        resolve(axios.get(link)) 
    });
} 

// grupo href=url
// text
// ruta del archivo

module.exports = {
    pathExistence,
    absOrRel,
    toAbsolute,
    pathExtension,
    readFile, 
    getFileLinks,
    statusRequest
}