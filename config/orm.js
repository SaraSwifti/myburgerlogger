// Import MySQL connection.

const connection = require('./connection');

const orm = {
    all(table, cb) {
        const queryString = `SELECT * FROM ${table};`;
        const query = connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
        console.log(query.sql);
    },
    create(table, column, value, cb) {
        let queryString = `INSERT INTO ${table} SET ?`;
        const query = connection.query(queryString,
            {
                [column]: value,
            },
            (err, result) => {
            if (err) throw err;
            cb(result);
        })
        console.log(query.sql);
    }, 
    update(table, column, value, condition, cb) {
        let queryString = `UPDATE ${table} SET ${column} = ${value} WHERE ${condition};`;
        const query = connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
        console.log(query.sql);
    },
    delete(table, condition, cb) {
        let queryString = `DELETE FROM ${table} WHERE ${condition}`;
        const query = connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
        console.log(query.sql);
    }
};

module.exports = orm;