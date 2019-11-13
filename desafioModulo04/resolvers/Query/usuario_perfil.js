const db = require('../../config/db')

module.exports = {
    async usuarios_perfis( ) {
        let usuario_perfil = await db('usuarios_perfis').select()
        return usuario_perfil
    },
}