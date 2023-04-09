const {pathExistence, absOrRel, pathExtension, readFile, getFileLinks, statusRequest, statsArrLinks} = require('./api')

const mdLinks = (path, option, stats) => {
  return new Promise((resolve, reject) => {
    if (!pathExistence(path)) {

      reject('Path does not exists, please provide a valid path')

    } else if (pathExistence(path)){

      if (!pathExtension(absOrRel(path))) {
        reject('File is not type markdown')

      } else {
        
        readFile(absOrRel(path))
        .then(fileText => {

          if (option.validate === true) {
            getFileLinks(fileText, absOrRel(path))
            .then(links => {
              if (stats === 'stats') {
                statusRequest(links)

                .then(result => resolve(statsArrLinks(result, 'href', true)))
                .catch(err => err)
              } else {
                statusRequest(links)
                
                .then(result => resolve(result))
                .catch(err => err)
              }
            })
            .catch(nolink => reject(nolink)) 

          } else if (option === 'stats') {
           getFileLinks(fileText, absOrRel(path))

           .then(links => {
            resolve(statsArrLinks(links, 'href'))
           })
           .catch(nolink => reject(nolink))
          }

        })
        .catch(noContent => reject(noContent))
      }
    }
  })
}
mdLinks('mdLinks.md', {validate: true}).then(console.log).catch(console.log)
module.exports = mdLinks
