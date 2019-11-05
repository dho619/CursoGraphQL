const { perfis, proximoId } = require('../../data/db');

module.exports = {

    novoPerfil(_, { nome }){
        const nomeExiste = perfis.some(
            p => p.nome === nome)

        if (nomeExiste) { //1 e o mesmo que true
            throw new Error('Perfil ja cadastrado!')
        }

        const novo = {
            id: proximoId(),
            nome: nome 
        }

        perfis.push(novo)
        return novo
    },
    excluirPerfil(_, { id }){
        const i = perfis.findIndex(
            p => p.id === id)
        if(i < 0) return null

        const excluido = perfis.splice(i, 1)

        return excluido ? excluido[0] : null
    },
    alterarPerfil(_, { id, nome }){
        const i = perfis.findIndex(
            p => p.id === id)
        if(i < 0) return null

        perfis[i].nome = nome

        return perfis[i]
    }
}