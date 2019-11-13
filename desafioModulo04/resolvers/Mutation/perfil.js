const db = require('../../config/db')
const { perfil: perfilFiltro } = require('../Query/perfil')


module.exports = {
    async novoPerfil(_, { dados }) {
        try {
            const [ id ] = await db('perfis').insert(dados)
            
            return db('perfis').where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPerfil(_, args) {
        try {
            let perfil = await perfilFiltro(_, args)
            console.log('aqui')
            if (perfil){
                let { id } = perfil
                await db('usuarios_perfis') //apaga todos os ligamentos
                    .where({ perfil_id: id}).delete()//com usuarios antes

                await db('perfis').where({id}).del()
            }
            return perfil   
        }
        catch(e){
            throw new Error(e.sqlMessage)
        }

    },
    async alterarPerfil(_, { filtro, dados }) {
        try{
            let perfil = await perfilFiltro(_, {filtro})

            if (perfil){
                let { id } = perfil
                await db('perfis').where({id}).update(dados)
            }
            return {...perfil, ...dados}
            
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    }
}