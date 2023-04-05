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

const statusRequest = (Arrlink) => {    
   
    const resultLinks = Arrlink.map(element => {
       return axios.get(element.href)
        .then(res => {
          return {
            file: element.file,
            text: element.text,
            href :element.href,
            status : res.status, 
            mensaje : res.statusText
            };
        })
        .catch(err => {
            if (!err.response) {
              return {
                file: element.file,
                text: element.text,
                href :element.href,
                status : -1, 
                mensaje : 'Not Found'
            }
            } else {
            return {
                file: element.file,
                text: element.text,
                href :element.href,
                status : err.response.status, 
                mensaje : err.response.statusText
            }
            
            }
        })
      })
  return Promise.all(resultLinks)
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
    statsArrLinks,
    statusRequest
}