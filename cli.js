#!/usr/bin/env node
const mdLinks = require('./index')
const colors = require('colors')

//agregando algunos argumentos
const [,, ...args] = process.argv

// pintando hello world con los argumentos dados
mdLinks(`${args}`).then(console.log)


