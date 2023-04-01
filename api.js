const fs = require('fs');
const path = require('path');
const axios = require('axios')

const pathExistence = (mdPath) => fs.existsSync(mdPath); 

const absOrRel = (mdPath) => !path.isAbsolute(mdPath) ? path.normalize(path.resolve(mdPath)) : mdPath

const pathExtension = (mdPath) => {     
    if (path.extname(mdPath) === '.md') {
        return mdPath
    }
}; 

const readFile = (mdPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdPath, 'utf-8', (err, data) => { 
        data === '' ? reject(err = 'No content to read') : resolve(data);
        });
    });
};

const getFileLinks = (fileContent, mdPath) => { 
    return new Promise((resolve, reject) => {
        const regLink = /\[(.*?)\]\((.*?)\)/g; 
        let result 
        const linkAr = []
        while (result = regLink.exec(fileContent)) {
            linkAr.push({
                file: mdPath,
                text: result[1],
                href: result[2]
            })
            resolve(linkAr)
        };
        if (regLink.exec(fileContent) === null ) {
            reject('This file does not contain links')
        }
    })
};

const statusRequest = (link) => {  // debo devolver los 5 datos de ese file
    return axios.get(link)
    .then(res => {
        return {
         Status: res.status, 
         StatusMessage: res.statusText
        }
    })
    .catch(err => !err.response ? {Status: -1, StatusMessage: 'Not Found'} : {Status: err.response.status, StatusMessage: err.response.statusText})
} 

const statsArrLinks = (arrayLink, key) => { 

    const property = arrayLink.map(obj => obj[key])
    const duplicated = property.filter((urls, index) => {
        return property.indexOf(urls) !== index
    })
    return {
        Total: arrayLink.length,
        Unique: arrayLink.length - duplicated.length
    
    }
};

module.exports = {
    pathExistence,
    absOrRel,
    pathExtension,
    readFile,
    getFileLinks,
    statsArrLinks
}