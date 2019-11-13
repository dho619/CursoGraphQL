const db = require('../../config/db')

module.exports = {
    perfis() {
        return db('perfis')
    },
    async perfil(_, { filtro }) {
        if (!filtro) return null
        let { id, nome } = filtro
        let perfil= {}
        if(id){
            perfil = await db('perfis').select().where({id}).first()
        } else if(nome) {
            perfil = await db('perfis').select().where({nome}).first()
        }
        return perfil?perfil:null

    }
}