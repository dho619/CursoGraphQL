const usuario = require('./usuario')
const perfil = require('./perfil')
const usuario_perfil = require('./usuario_perfil')

 module.exports = {
    ...usuario,
    ...perfil,
    ...usuario_perfil,
 }