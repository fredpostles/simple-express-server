// bring in mysql
const mysql = require("mysql");

// set up the connection to the database
const connection = mysql.createConnection({
  port: 3306,
  database: "account",
  user: "root",
  password: "",
  host: "localhost",
});

// connect
connection.connect();

// query the db, using SQL inside query function
// first param is SQL query
// second is callback function to run on response

// connection.query(`SELECT * FROM students;`, (error, results) => {
//   console.log("error:", error);
//   console.log("results:", results);
// });

// promisified version
function asyncMySQL(query, variables) {
  return new Promise((resolve, reject) => {
    connection.query(query, variables, (error, results) => {
      if (error) {
        console.log("Connection to server failed; check server is running!");
        reject("mySQL error:", error);
      }

      resolve(results);
    });
  });
}

// test the connection
// async function test() {
//   const results = await asyncMySQL(`SELECT * FROM students;`);
//   console.log(results);
// }

// test();

// export the connection
module.exports = asyncMySQL;
