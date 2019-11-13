const usuarios = [{
    id: 1,
    nome: 'João da Neve',
    email: 'joaodaneve@hotmail.com',
    idade: 28,
    perfil_id: 1,
    status: 'ATIVO'
},{
    id: 2,
    nome: 'Mestre dos Magos',
    email: 'mestre@hotmail.com',
    idade: 279,
    perfil_id: 2,
    status: 'ATIVO'
}, {
    id: 3,
    nome: 'Anabelle',
    email: 'carafeia@hotmail.com',
    idade: 5,
    perfil_id: 1,
    status: 'BLOQUEADO'
}
]

const perfis = [
{id: 1, nome: 'Comum'},
{id: 2, nome: 'Administrador'}
]

module.exports = { usuarios, perfis}