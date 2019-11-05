const {usuarios, proximoId} = require('../../data/db');

function indiceUsuario(filtro) {
    if(!filtro) return -1

    const { id, email } = filtro
    if(id){
        return usuarios.findIndex(
            u => u.id === id) //senao achar nada i recebe -1
    } else if(email){
        return usuarios.findIndex(
            u => u.email === email) //senao achar nada i recebe -1
    }
    return -1
}


module.exports = {
    // { nome, email, idade }
    novoUsuario(_, { dados } ) {
        const emailExistente = usuarios.some( //se algum email existir, ele vai ser 1
            u => u.email === dados.email)
        
        if (emailExistente) { //1 e o mesmo que true
            throw new Error('E-mail ja cadastrado!')
        }

        const novo = {
            id: proximoId(),
            ...dados, //todos atributos serao colocados aqui
            perfil_id: 1,
            status: 'ATIVO'
        }
        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, { filtro }) {
        const i = indiceUsuario(filtro)
        if (i < 0) return null //por isso, menor que 0
        
        const excluidos = usuarios.splice(i, 1)//para excluit (id, numero de elementos para excluir)
                                              //splice serve para alterar tbm
        return excluidos ? excluidos[0] : null
    },
    alterarUsuario(_, { filtro, dados}) {
        const i = indiceUsuario(filtro)
        if(i < 0) return null

        const usuario = {
            ...usuarios[i],
            ...dados//os valores de dados sobrepoem
        }         //os de usuarios, ja que sao os novos valores
                 //ja os que nao tem em args, continua o mesmo
        
        usuarios.splice(i, 1, usuario) //ele excluir e adiciona o novo no lugar
        return usuario
    }

}