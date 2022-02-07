// connecting to db using sequelize

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('nodejs-complete', 'root', 'ramkidev#22', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;

// const sql = require('mysql2')

// const pool = sql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs-complete',
//     password:'ramkidev#22'
// })

// module.exports = pool.promise()