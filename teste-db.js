const mysql = require("mysql2/promise");

mysql.createConnection({
    host: "mysql",
    user: "dani_user",
    password: "Dani04096524",
    database: "crud"
})
    .then(() => console.log("CONECTOU"))
    .catch(console.error);