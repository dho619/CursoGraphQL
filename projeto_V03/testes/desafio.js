const db = require('../config/db');

async function salvarUsuario(nome, email, senha){
    let usuario = await db('usuarios')
        .where({ email })
        .first()
    
    if (usuario){//se existe atualiza
        let UserAlt = {
            nome,
            senha
        }
        await db('usuarios').where({email})
        .update(UserAlt)
    } else {//se nao, cria
        let newUser = {
            email,
            nome,
            senha
        }
        await db('usuarios').insert(newUser)
    }

    usuario = await db('usuarios')
        .where({ email })
        .first()

    return usuario
}

async function salvarPerfil(nome,rotulo) {
    let perfil = await db('perfis')
        .where({ nome })
        .first()
    
    if (perfil){//se existe atualiza
        let UserAlt = {
            rotulo
        }
        await db('perfis').where({nome})
        .update(UserAlt)
    } else {//se nao, cria
        let newUser = {
            nome,
            rotulo
        }
        await db('perfis').insert(newUser)
    }

    perfil = await db('perfis')
        .where({ nome })
        .first()

    return perfil
}

async function adicionarPerfis(usuario, ...perfis){
    let usuario_id = usuario.id
    await db('usuario_perfil')
        .where({usuario_id})
        .delete() //limpando todos perfis do usuario
    for(perfil of perfis){
        let perfil_id = perfil.id
        await db('usuario_perfil').insert({
            usuario_id,
            perfil_id
        })
    }

}

async function executar() {
    const usuario = await salvarUsuario('Joao Das Neves Ja Morto',
    'joao@depre.com', '987654321')
    const perfilA = await salvarPerfil('rh', 'PessoalPraCaralho')
    const perfilB = await salvarPerfil('fin2', 'Financeiro2')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())