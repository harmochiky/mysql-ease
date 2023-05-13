const mysql = require("mysql");

module.exports = function () {
  let query = "";
  switch (this.query.type) {
    case "SELECT":
      let tables = this.query.fields.join(", ");
      if (!tables) {
        tables = "*";
      }
      query += `SELECT ${tables} FROM ${this.query.tables.join(", ")}`;

      if (this.query.joinClauses.length > 0) {
        this.query.joinClauses.forEach((clause) => {
          query += ` ${clause.type} ${clause.table} ON ${clause.operator} ${clause.condition}`;
        });
      }
      if (this.query.whereClauses.length > 0) {
        query += " WHERE";
        this.query.whereClauses.forEach((clause, i) => {
          if (i > 0) {
            query += ` ${clause.type}`;
          }
          query += ` ${clause.column} ${clause.operator} ${mysql.escape(
            clause.value
          )}`;
        });
      }
      if (this.query.orderClauses.length > 0) {
        query += " ORDER BY";
        this.query.orderClauses.forEach((clause) => {
          query += ` ${clause.column} ${clause.direction}`;
        });
      }
      if (this.query.limit !== null) {
        query += ` LIMIT ${this.query.limit}`;
      }
      if (this.query.offset !== null) {
        query += ` OFFSET ${this.query.offset}`;
      }
      break;
    case "INSERT":
      query += `INSERT INTO ${this.query.tables[0]} (${Object.keys(
        this.query.values
      ).join(", ")}) VALUES (${Object.values(this.query.values)
        .map((value) => mysql.escape(value))
        .join(", ")})`;
      break;
    case "UPDATE":
      query += `UPDATE ${this.query.tables[0]} SET ${Object.entries(
        this.query.values
      )
        .map((entry) => `${entry[0]} = ${mysql.escape(entry[1])}`)
        .join(", ")}`;
      if (this.query.whereClauses.length > 0) {
        query += " WHERE";
        this.query.whereClauses.forEach((clause, i) => {
          if (i > 0) {
            query += ` ${clause.type}`;
          }
          query += ` ${clause.column} ${clause.operator} ${mysql.escape(
            clause.value
          )}`;
        });
      }
      break;
    case "DELETE":
      query += `DELETE FROM ${this.query.tables[0]}`;
      if (this.query.whereClauses.length > 0) {
        query += " WHERE";
        this.query.whereClauses.forEach((clause, i) => {
          if (i > 0) {
            query += ` ${clause.type}`;
          }
          query += ` ${clause.column} ${clause.operator} ${mysql.escape(
            clause.value
          )}`;
        });
      }
      break;
    default:
      break;
  }
  return query;
};
