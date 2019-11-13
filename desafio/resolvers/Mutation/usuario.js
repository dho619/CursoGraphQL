const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterusuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []
            if(dados.perfis) {
               for(let filtro of dados.perfis){
                   const perfil = await obterPerfil(_, {
                       filtro
                    })
                    if(perfil) idsPerfis.push(perfil.id)
               } 
            }
            
            delete dados.perfis

            const [ id ] = await db('usuarios').insert(dados)

            for(let perfil_id of idsPerfis){
                await db('usuarios_perfis').insert(
                    {perfil_id, usuario_id: id }
                )
            }
            
            return db('usuarios').select().where({id}).first()
 
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
       
    },
    async excluirUsuario(_, args) {
        try {
            let usuario = await obterusuario(_, args)
    
            if (usuario) {
                let { id } = usuario

                await db('usuarios_perfis').where(
                    {usuario_id: id}).delete()
                
                await db('usuarios').where({id}).del()
            } 

            return usuario
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try{
            let usuario = await obterusuario(_, {filtro})
                if (usuario) {
                    let { id } = usuario
                    if(dados.perfis){
                        await db('usuarios_perfis').where(
                            {usuario_id: id}).delete()
                        for(let filtro of dados.perfis){

                            const perfil = await obterPerfil(_, {filtro})
                            perfil && await db('usuarios_perfis').insert(
                                {perfil_id: perfil.id, usuario_id: id}
                            )
                        } 
                    }
                    delete dados.perfis
                    await db('usuarios').where({id}).update(dados)
                }
            return !usuario? null: {...usuario, ...dados}
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    }
}