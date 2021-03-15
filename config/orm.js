// Import MySQL connection.
const connection = require('./connection.js');

// Helper function for SQL syntax to add question marks (?, ?, ?) in query
const printQuestionMarks = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
  const arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (const key in ob) {
    let value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // If string with spaces, add quotations (James Buffet => 'James Buffet')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      // e.g. {name: 'James Buffet'} => ["name='James Buffet'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(`${key}=${value}`);
    }
  }

  // Translate array of strings to a single comma-separated string
  return arr.toString();
};

// Object for all our SQL statement functions.
const orm = {
  selectAll(tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table}`;

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: hamburglar, devoured: true}
  updateOne(table, objColVals, condition, cb) {
    let queryString = `UPDATE ${table}`;

    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  deleteOne(table, condition, cb) {
    let queryString = `DELETE FROM ${table}`;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Export the orm object for the model (burger.js).
module.exports = orm;

// // translate array of strings to a single comma-separated string
// return arr.toString();
// }

// // Object for all our SQL statement functions.
// var orm = {
//     all: function (tableInput, cb) {
//         var queryString = "SELECT * FROM " + tableInput + ";";
//         connection.query(queryString, function (err, result) {
//             if (err) {
//                 throw err;
//             }
//             cb(result);
//         });
//     },
//     //vals is an array for values that we want to save to cols
//     //cols are the columns we want to insert the values into. 
//     create: function (table, cols, vals, cb) {
//         var queryString = "INSERT INTO " + table;

//         queryString += " (";
//         queryString += cols.toString();
//         queryString += ") ";
//         queryString += "VALUES (";
//         queryString += printQuestionMarks(vals.length);
//         queryString += ") ";

//         console.log(queryString);

//         connection.query(queryString, vals, function (err, result) {
//             if (err) {
//                 throw err;
//             }

//             cb(result);
//         });
//     },
//     // An example of objColVals would be the columns and values that you want to update. 
//     //an example of objColVals would be {burger-name, sloppy, devoured: true}
//     update: function (table, objColVals, condition, cb) {
//         var queryString = "UPDATE " + table;

//         queryString += " SET ";
//         queryString += objToSql(objColVals);
//         queryString += " WHERE ";
//         queryString += condition;

//         console.log(queryString);
//         connection.query(queryString, function (err, result) {
//             if (err) {
//                 throw err;
//             }

//             cb(result);
//         });
//     },
//     delete: function (table, condition, cb) {
//         var queryString = "DELETE FROM " + table;
//         queryString += " WHERE ";
//         queryString += condition;

//         connection.query(queryString, function (err, result) {
//             if (err) {
//                 throw err;
//             }

//             cb(result);
//         });
//     }
// };

// // Export the orm object for the model (cat.js).
// module.exports = orm;