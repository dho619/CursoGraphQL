module.exports = {
    precoComDesconto(produto) {
        if (produto.desconto) {
            desconto = produto.preco * produto.desconto / 100
            return produto.preco - desconto
        }
        else return null
        
    }
}