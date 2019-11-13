// Update with your config settings.
const { connection } = require('./.env')
module.exports = {
    client: 'mysql',
    // connection: {
    //   database: 'banco',
    //   user:     'user',
    //   password: 'senha'
    // },
    connection, //para nao subir a senha para o git, ela fica no arquivo .env
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
