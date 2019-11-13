const db = require('../../config/db')

module.exports = {
    async usuarios( ) {
        return db('usuarios')
    },
    
    async usuario(_, { filtro }) {
        if (!filtro) return null
        let { id, email } = filtro
        let usuario= {}
        if(id){
            usuario = await db('usuarios').select().where({id}).first()
        } else if(email) {
            usuario = await db('usuarios').select().where({email}).first()
        }
        return usuario?usuario:null
    },
}