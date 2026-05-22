const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'tradentrondb'
});

db.connect((err) => {

    if (err) {

        console.log('Database Connection Failed');
        console.log(err);

    } else {

        console.log('MySQL Connected');

    }

});

module.exports = db;