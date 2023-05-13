const mysql = require("mysql");

const init = {
  type: "",
  tables: [],
  fields: [],
  values: [],
  joinClauses: [],
  whereClauses: [],
  orderClauses: [],
  limit: null,
  offset: null,
};

class QueryBuilder {
  constructor() {
    this.query = {
      type: "",
      tables: [],
      fields: [],
      values: [],
      joinClauses: [],
      whereClauses: [],
      orderClauses: [],
      limit: null,
      offset: null,
    };
    this.query = init;
  }

  from(table) {
    this.query.tables.push(table);
    return this;
  }

  into(table) {
    this.query.tables = [table];
    return this;
  }

  /**
   * Fields to select. Default all ("*")
   * @param  {...any} fields
   * @returns
   */
  select(...fields) {
    this.query.type = "SELECT";
    this.query.fields = fields;
    return this;
  }

  insert(values) {
    this.query.type = "INSERT";
    this.query.values = values;
    return this;
  }

  update(values) {
    this.query.type = "UPDATE";
    this.query.values = values;
    return this;
  }

  delete() {
    this.query.type = "DELETE";
    return this;
  }

  join(table, operator, condition) {
    this.query.joinClauses.push({
      type: "JOIN",
      table,
      operator,
      condition,
    });
    return this;
  }

  leftJoin(table, operator, condition) {
    this.query.joinClauses.push({
      type: "LEFT JOIN",
      table,
      operator,
      condition,
    });
    return this;
  }

  rightJoin(table, operator, condition) {
    this.query.joinClauses.push({
      type: "RIGHT JOIN",
      table,
      operator,
      condition,
    });
    return this;
  }

  where(column, operator, value) {
    this.query.whereClauses.push({
      type: "WHERE",
      column,
      operator,
      value,
    });
    return this;
  }

  orWhere(column, operator, value) {
    this.query.whereClauses.push({
      type: "OR WHERE",
      column,
      operator,
      value,
    });
    return this;
  }

  orderBy(column, direction = "ASC") {
    this.query.orderClauses.push({
      type: "ORDER BY",
      column,
      direction,
    });
    return this;
  }

  limit(limit) {
    this.query.limit = limit;
    return this;
  }

  offset(offset) {
    this.query.offset = offset;
    return this;
  }

  execute(callback) {
    const query = this.buildQuery();
    console.log({ query });
    callback(query, callback);
    // this.connection.query(query, callback);
  }

  buildQuery() {
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
  }
}

module.exports = QueryBuilder;
