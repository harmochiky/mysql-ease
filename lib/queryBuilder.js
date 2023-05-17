const mysql = require("mysql");

module.exports = function (instructionObj) {
  let query = "";
  switch (instructionObj.type) {
    case "SELECT":
      let tables = instructionObj.fields.join(", ");
      if (!tables) {
        tables = "*";
      }
      query += `SELECT ${tables} FROM ${instructionObj.tables.join(", ")}`;

      if (instructionObj.joinClauses.length > 0) {
        instructionObj.joinClauses.forEach((clause) => {
          query += ` ${clause.type} ${clause.table} ON ${clause.field} = ${clause.otherField}`;
        });
      }
      if (instructionObj.whereClauses.length > 0) {
        query += " WHERE";
        instructionObj.whereClauses.forEach((clause, i) => {
          if (i > 0) {
            query += ` ${clause.type}`;
          }
          query += ` ${clause.column} ${clause.operator} ${mysql.escape(
            clause.value
          )}`;
        });
      }
      if (instructionObj.andClauses.length > 0) {
        query += " AND";
        instructionObj.andClauses.forEach((clause, i) => {
          if (i > 0) {
            query += ` ${clause.type}`;
          }
          query += ` ${clause.column} ${clause.operator} ${mysql.escape(
            clause.value
          )}`;
        });
      }
      if (instructionObj.orderClauses.length > 0) {
        query += " ORDER BY";
        instructionObj.orderClauses.forEach((clause) => {
          query += ` ${clause.column} ${clause.direction}`;
        });
      }
      if (instructionObj.limit !== null) {
        query += ` LIMIT ${instructionObj.limit}`;
      }
      if (instructionObj.offset !== null) {
        query += ` OFFSET ${instructionObj.offset}`;
      }
      break;
    case "INSERT":
      query += `INSERT INTO ${instructionObj.tables[0]} (${Object.keys(
        instructionObj.values
      ).join(", ")}) VALUES (${Object.values(instructionObj.values)
        .map((value) => mysql.escape(value))
        .join(", ")})`;
      break;
    case "UPDATE":
      query += `UPDATE ${instructionObj.tables[0]} SET ${Object.entries(
        instructionObj.values
      )
        .map((entry) => `${entry[0]} = ${mysql.escape(entry[1])}`)
        .join(", ")}`;
      if (instructionObj.whereClauses.length > 0) {
        query += " WHERE";
        instructionObj.whereClauses.forEach((clause, i) => {
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
      query += `DELETE FROM ${instructionObj.tables[0]}`;
      if (instructionObj.whereClauses.length > 0) {
        query += " WHERE";
        instructionObj.whereClauses.forEach((clause, i) => {
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
