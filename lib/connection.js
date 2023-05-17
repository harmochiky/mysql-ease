const mysql = require("mysql");

let connection = null;

function initializeConnection(config) {
  connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("Connected to MySQL database!");
  });
}

function getConnection() {
  return connection;
}

module.exports = {
  initializeConnection,
  getConnection,
};
