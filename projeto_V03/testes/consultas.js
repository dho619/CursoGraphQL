const db = require('../config/db')

// db('perfis')
// .map(p => p.nome)
// .then(nomes => console.log(nomes))
// .finally(() => db.destroy())

// db('perfis').select('nome')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// db.select('nome')
//     .from('perfis')
//     .limit(4).offset(2)
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

db('perfis').select('id','nome')
    //.whereNot({id: 2})
    //.where({id: 2})
    //.where('id','=', '2')
    // .where('nome', 'like', '%m%')//contenha
    .whereIn('id', [1,2,3])
    //.first() //trazer so o primeiro
    .then(res => console.log(res))
    .finally(() => db.destroy())