const db = require('../config/db');

const novoUsuario = {
    nome: 'Pedro',
    email: 'pedro@empresa.com.br',
    senha: '12345678'
}

async function exercicio(){
    //count
    const { qtde } = await db('usuarios')
        .count('* as qtde').first()

    //inserir (se count === 0)
    if (qtde === 0){
        await db('usuarios').insert(novoUsuario)
    }
    //consultar
    let { id } = await db('usuarios')
        .select('id').limit(1).first()

    console.log(id)

    //alterar
    await db('usuarios').where({id})//{id} = {id: id}
        .update({nome: 'João das Neve',
                 email: 'joaodaneves@corvo.com'})

    return await db('usuarios').where({id})
}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())