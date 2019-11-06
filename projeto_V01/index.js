const { ApolloServer, gql} = require('apollo-server');
const { importSchema } = require('graphql-import');

const resolvers = require('./resolvers'); //caminho dos resolvers (tipo construtores)
const schemaPath = './schema/index.graphql'; //caminho dos schemas (tipo models)


const server = new ApolloServer({ //inicializando o servidor Apollo
    typeDefs: importSchema(schemaPath), //importando os schemas
    resolvers //mostrandos onde esta os resolvers 
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})