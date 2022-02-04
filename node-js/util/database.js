const sql = require('mysql2')

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs-complete',
    password:'ramkidev#22'
})

module.exports = pool.promise()