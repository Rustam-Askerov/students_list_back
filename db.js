const pg = require('pg')

const pool = new pg.Pool({
    user:"postgres",
    password: "admin",
    host:"localhost",
    database:"students_list_db",
    port:"5432",
})

module.exports = pool