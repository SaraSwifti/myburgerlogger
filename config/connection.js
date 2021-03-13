//Inside the `connection.js` file, setup the code to connect Node to MySQL.

 //  * Export the connection.//// Set up MySQL connection.
const mysql = require('mysql');
//connection parameters
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  // NOTE: Be sure to add your MySQL password here!
  password: process.env.mysqlpw,
  database: 'burgers_db',
});

// Make connection.
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// Export connection for our ORM to use.
module.exports = connection;