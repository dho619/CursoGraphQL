const { usuarios, perfis } = require('../data/db');

module.exports = { //exportando as chamadas possiveis
    ola() {
        return 'Hello Word!'
    },
    horaAtual() {
        return new Date;
    },
    usuarioLogado() {
        return {
            id: 1,
            nome: 'Teste',
            email: 'teste@hotmail.com',
            idade: 23,
            salario_real: 1234.56,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            nome: 'Arroz',
            preco: 12.00,
            desconto: 10,
        }
    },
    numeros(){
        //return [4,5,12,5,6]
        const crescente = (a, b) => a - b
        return Array(6).fill(0).map(n => parseInt( //ordenando os numeros
            Math.random() * 60 + 1)).sort(crescente)
    },
    usuarios() {
        return usuarios
    },
    usuario(_, { id }) {
        const selecionados = usuarios.filter( // filtando se o id passado e igual ao id de algum usuario
            u => u.id == id)
        return selecionados ? selecionados[0] : null
    },
    perfis(){
        return perfis
    },
    perfil(_, { id }){
        const sel = perfis.filter(
            p => p.id == id
        )
        return sel ? sel[0] : null
    }
}