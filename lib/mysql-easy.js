const connection = require("./connection");
const queryBuilder = require("./queryBuilder");

class MysqlEasy {
  constructor() {
    this.queryObj = {
      type: "",
      tables: [],
      fields: [],
      values: [],
      joinClauses: [],
      whereClauses: [],
      andClauses: [],
      orderClauses: [],
      limit: null,
      offset: null,
    };
    this.results = null;
    this.transactionActive = false;
  }

  /**
   * Specifies the table(s) to select from.
   * @param {string} table - The table name.
   * @returns {MysqlEasy} - The updated instance.
   */
  from(table) {
    this.queryObj.tables.push(table);
    return this;
  }
  /**
   * Specifies the table to insert into.
   * @param {string} table - The table name.
   * @returns {MysqlEasy} - The updated instance.
   */
  into(table) {
    this.queryObj.tables = [table];
    return this;
  }

  /**
   * Specifies the fields to select. Default is all fields ("*").
   * @param  {...any} fields - The fields to select.
   * @returns {MysqlEasy} - The updated instance.
   */
  select(...fields) {
    this.queryObj.type = "SELECT";
    this.queryObj.fields = fields;
    return this;
  }

  /**
   * Specifies the values to insert.
   * @param {any} values - The values to insert.
   * @returns {MysqlEasy} - The updated instance.
   */
  insert(values) {
    this.queryObj.type = "INSERT";
    this.queryObj.values = values;
    return this;
  }

  /**
   * Specifies the values to update.
   * @param {any} values - The values to update.
   * @returns {MysqlEasy} - The updated instance.
   */
  update(values) {
    this.queryObj.type = "UPDATE";
    this.queryObj.values = values;
    return this;
  }

  /**
   * Specifies the deletion operation.
   * @returns {MysqlEasy} - The updated instance.
   */
  delete() {
    this.queryObj.type = "DELETE";
    return this;
  }

  /**
   * Specifies an inner join clause.
   * @param {string} table - The table to join.
   * @param {string} field - The field to join on.
   * @param {string} otherField - The field in the joined table to match.
   * @returns {MysqlEasy} - The updated instance.
   */
  innerJoin(table, field, otherField) {
    this.queryObj.joinClauses.push({
      type: "INNER JOIN",
      table,
      field,
      otherField,
    });
    return this;
  }

  /**
   * Specifies a join clause.
   * @param {string} table - The table to join.
   * @param {string} operator - The join operator.
   * @param {string} condition - The join condition.
   * @returns {MysqlEasy} - The updated instance.
   */
  join(table, operator, condition) {
    this.queryObj.joinClauses.push({
      type: "JOIN",
      table,
      operator,
      condition,
    });
    return this;
  }
  /**
   * Specifies a left join clause.
   * @param {string} table - The table to join.
   * @param {string} operator - The join operator.
   * @param {string} condition - The join condition.
   * @returns {MysqlEasy} - The updated instance.
   */
  leftJoin(table, operator, condition) {
    this.queryObj.joinClauses.push({
      type: "LEFT JOIN",
      table,
      operator,
      condition,
    });
    return this;
  }

  /**
   * Specifies a right join clause.
   * @param {string} table - The table to join.
   * @param {string} operator - The join operator.
   * @param {string} condition - The join condition.
   * @returns {MysqlEasy} - The updated instance.
   */
  rightJoin(table, operator, condition) {
    this.queryObj.joinClauses.push({
      type: "RIGHT JOIN",
      table,
      operator,
      condition,
    });
    return this;
  }

  /**
   * Specifies a where clause.
   * @param {string} column - The column to apply the condition on.
   * @param {string} operator - The comparison operator.
   * @param {any} value - The value to compare against.
   * @returns {MysqlEasy} - The updated instance.
   */
  where(column, operator, value) {
    this.queryObj.whereClauses.push({
      type: "WHERE",
      column,
      operator,
      value,
    });
    return this;
  }

  /**
   * Specifies an and clause.
   * @param {string} column - The column to apply the condition on.
   * @param {string} operator - The comparison operator.
   * @param {any} value - The value to compare against.
   * @returns {MysqlEasy} - The updated instance.
   */
  and(column, operator, value) {
    this.queryObj.andClauses.push({
      type: "AND",
      column,
      operator,
      value,
    });
    return this;
  }

  /**
   * Specifies an or where clause.
   * @param {string} column - The column to apply the condition on.
   * @param {string} operator - The comparison operator.
   * @param {any} value - The value to compare against.
   * @returns {MysqlEasy} - The updated instance.
   */
  orWhere(column, operator, value) {
    this.queryObj.whereClauses.push({
      type: "OR WHERE",
      column,
      operator,
      value,
    });
    return this;
  }

  /**
   * Specifies the column to order by.
   * @param {string} column - The column to order by.
   * @param {string} direction - The sort direction (default: "ASC").
   * @returns {MysqlEasy} - The updated instance.
   */
  orderBy(column, direction = "ASC") {
    this.queryObj.orderClauses.push({
      type: "ORDER BY",
      column,
      direction,
    });
    return this;
  }

  /**
   * Specifies the maximum number of rows to return.
   * @param {number} limit - The maximum number of rows.
   * @returns {MysqlEasy} - The updated instance.
   */
  limit(limit) {
    this.queryObj.limit = limit;
    return this;
  }
  /**
   * Specifies the number of rows to skip.
   * @param {number} offset - The number of rows to skip.
   * @returns {MysqlEasy} - The updated instance for method chaining.
   */

  offset(offset) {
    this.queryObj.offset = offset;
    return this;
  }

  /**
   * Returns the generated query as a string.
   * @returns {string} - The generated query.
   */
  returnQueryAsString() {
    let query = queryBuilder(this.queryObj);
    return query;
  }

  /**
   * Executes the generated query and returns the results.
   * @returns {Promise<any>} - A promise that resolves to the query results.
   * @throws {Error} - If there is an error executing the query.
   */
  async query() {
    let sqlConnection = connection.getConnection();
    let query = queryBuilder(this.queryObj);
    this.queryObj = {
      type: "",
      tables: [],
      fields: [],
      values: [],
      joinClauses: [],
      whereClauses: [],
      andClauses: [],
      orderClauses: [],
      limit: null,
      offset: null,
    };
    this.results = null;

    return await new Promise((resolve, reject) => {
      if (!sqlConnection)
        return reject({
          connection: "Database connection does not seem to be exist",
        });
      if (query === "") return reject({ invalid: "Not enough arguments" });

      sqlConnection.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  /**
   * Begins a transaction.
   * @returns {Promise<void>} - A promise that resolves when the transaction is started.
   * @throws {Error} - If a transaction is already active.
   */
  async beginTransaction() {
    if (this.transactionActive) {
      throw new Error("Transaction is already active.");
    }

    let sqlConnection = connection.getConnection();

    return await new Promise((resolve, reject) => {
      sqlConnection.beginTransaction((error) => {
        if (error) {
          return reject(error);
        }
        this.transactionActive = true;
        resolve();
      });
    });
  }

  /**
   * Commits the active transaction.
   * @returns {Promise<void>} - A promise that resolves when the transaction is committed.
   * @throws {Error} - If no transaction is active.
   */
  async commitTransaction() {
    if (!this.transactionActive) {
      throw new Error("No active transaction.");
    }

    let sqlConnection = connection.getConnection();

    return await new Promise((resolve, reject) => {
      sqlConnection.commit((error) => {
        if (error) {
          sqlConnection.rollback(() => {
            reject(error);
          });
        } else {
          this.transactionActive = false;
          resolve();
        }
      });
    });
  }

  /**
   * Rolls back the active transaction.
   * @returns {Promise<void>} - A promise that resolves when the transaction is rolled back.
   * @throws {Error} - If no transaction is active.
   */
  async rollbackTransaction() {
    if (!this.transactionActive) {
      throw new Error("No active transaction.");
    }

    let sqlConnection = connection.getConnection();

    return await new Promise((resolve, reject) => {
      sqlConnection.rollback(() => {
        this.transactionActive = false;
        resolve();
      });
    });
  }
}

const mysqleasy = new MysqlEasy();
module.exports = mysqleasy;
