# mysql-ease

mysql-ease is a lightweight and simplified MySQL query builder and data access wrapper for Node.js. It provides an intuitive API to construct and execute MySQL queries with ease.

## Features

- **Simple and Intuitive**: Build MySQL queries effortlessly using a chainable API.
- **Flexible Query Building**: Construct SELECT, INSERT, UPDATE, and DELETE queries with various clauses and conditions.
- **Query Customization**: Add JOIN clauses, WHERE conditions, ORDER BY, LIMIT, and OFFSET to refine your queries.
- **Transaction Support**: Begin, commit, and rollback transactions with ease.
- **Promise-based API**: Execute queries asynchronously using Promises.
- **Configurable Connection**: Easily set up and configure the MySQL database connection.

## Installation

Install the `mysql-ease` package from npm:

```shell
npm install mysql-ease
```

# mysql-ease

mysql-ease is a lightweight and simplified MySQL query builder and data access wrapper for Node.js. It provides an intuitive API to construct and execute MySQL queries with ease.

## Features

- **Simple and Intuitive**: Build MySQL queries effortlessly using a chainable API.
- **Flexible Query Building**: Construct SELECT, INSERT, UPDATE, and DELETE queries with various clauses and conditions.
- **Query Customization**: Add JOIN clauses, WHERE conditions, ORDER BY, LIMIT, and OFFSET to refine your queries.
- **Transaction Support**: Begin, commit, and rollback transactions with ease.
- **Promise-based API**: Execute queries asynchronously using Promises.
- **Configurable Connection**: Easily set up and configure the MySQL database connection.

## Installation

Install the `mysql-ease` package from npm:

```shell
npm install mysql-ease
```

### Introduction

`mysql-ease` is a powerful and user-friendly MySQL query builder and data access wrapper designed to simplify database interactions in Node.js applications. It provides an easy-to-use API that allows developers to construct and execute MySQL queries without the need to write raw SQL statements.

### Why mysql-ease?

Writing complex SQL queries can be time-consuming and error-prone. mysql-ease aims to solve these challenges by providing a simplified and intuitive way to build and execute MySQL queries. Whether you are a beginner or an experienced developer, mysql-ease can significantly enhance your productivity and reduce the amount of code you need to write.

### Getting Started

To get started with mysql-ease, you need to install the package from npm using the following command:

```shell
npm install mysql-ease
```

Once the package is installed, you can include it in your Node.js application by requiring it:

```shell
const db = require('mysql-ease');
```

### Connecting to the Database

Before using mysql-ease, you need to establish a connection to your MySQL database in which unlike the `mysql` package, this can be done once in your entry file to access the database from anywhere. This can be done by configuring the connection settings and initializing the connection as shown in the example below:

```shell
const { initializeConnection } = require('mysql-ease/lib/connection');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database',
};

initializeConnection(dbConfig);
```

Make sure to replace the dbConfig object with the actual MySQL connection configuration for your database.

### Building Queries

mysql-ease provides a fluent and chainable API for building various types of MySQL queries. Let's explore some of the key features and query types supported by mysql-ease.

#### Select Queries

To construct a SELECT query, you can use the `from()` and `select()` methods. Here's an example:

```shell
const db = require("mysql-ease");

db.select("id, name, email")
  .from("users")
  .returnQueryAsString()
```

The above code will output the following SELECT query:

```shell
SELECT id, name, email FROM users
```

You can further customize your SELECT queries by adding conditions, joining tables, specifying the order, and setting limits.

#### Insert Queries

To construct an INSERT query, you can use the `insert()` and `into()` methods. `insert` takes in an object with the data you want to insert. Here's an example:

```shell
const db = require("mysql-ease");

db.insert({
  name: "John Doe",
  email: "john.doe@example.com",
})
  .into("users")
  .returnQueryAsString();
```

The above code will output the following INSERT query

```shell
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com')
```

#### Inserting multiple values

```shell
const db = require("mysql-ease");

db.insert([
{ name: "John Doe", email: "john.doe@example.com" },
{ name: "Jane Smith", email: "jane.smith@example.com" },
{ name: "Mike Johnson", email: "mike.johnson@example.com" },
])
.into("users")
.returnQueryAsString();
```

The above code will output the following INSERT query:

```shell
INSERT INTO users (name, email)
VALUES ('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Mike Johnson', 'mike.johnson@example.com')
```

#### Update Queries

To construct an UPDATE query, you can use the `update()`, `where()` and `from()` methods. The update `update()` takes in an object. Here's an example:

```shell
const db = require("mysql-ease");

db.update({ name: "John Doe", email: "john.doe@example.com" })
  .where("user_id", "=", "ID321")
  .from("users")
  .returnQueryAsString();
```

#### Delete Queries

To construct a DELETE query, you can use the from() and where() methods. Here's an example:

```shell
const db = require("mysql-ease");

db
.delete()
.from("users")
.where("user_id", "=", "ID321")
.returnQueryAsString();
```

The above code will output the following DELETE query:

```shell
DELETE FROM users WHERE user_id = ID321
```

These are just a few examples of the query types supported by mysql-ease. You can explore more advanced features and query customization options.

### Executing Queries

mysql-ease provides a promise-based API for executing queries asynchronously. You can use the `query()` method to execute a built query. Here's an example:

```shell
// Import mysql-ease
const db = require("mysql-ease");

db.select("id, name, email")
.from("users")
.query() // Calling query() returns a promise
.then((data) => {
// You can access the returned results if any by accessing "data"
let users = data;
console.log({ users });
});
.catch((error) => {
  // any errors will be caught in the catch block and returned like above
console.error('Query Error:', error);
});
```

The `query()` method returns a Promise that resolves with the query results or rejects with an error if the query execution fails.

#### Chaining Queries

Since the `query()` returns a promise, maybe you might want to do something with the data soon after getting it or run another query after getting the data. In this case you, can return another query in the `then()` method after your previous query() which will return results of the returned query. Here's an example:

```shell
const db = require("mysql-ease");

db.select("*")
  .from("character")
  .innerJoin(
    "character_tv_show",
    "character.id",
    "character_tv_show.character_id"
  )
  .limit(1)
  .query()
  .then((data) => {
    let character = data[0];
    let character_id = character.character_id;
    return db
      .select("character_name")
      .where("character_id", "=", character_id)
      .from("tv_show")
      .query();
  })
  .then((data) => {
    // do something with the data returned
  })
  .catch((err)=>{
    console.log(err)
  })
```

### Documentation

At the moment, this is the current state of the documentation, however, i will soon link a URL to a `mysql-ease` site containing all the Comprehensive API usage and examples. In the meatime will be adding more example and usage information here but if you have any question you can email me at: harmony@entrebyte.co.za

### Contributions and Support

Contributions, bug reports, and feature requests are welcome! If you encounter any issues or have any questions or suggestions, please open an issue on the GitHub repository. Your contributions help improve the package and make it more robust for the community to use.

### Roadmap

The following are some planned features and enhancements for mysql-ease:

- Support for aggregate functions: Enable users to perform calculations and statistical operations on query results.
- Advanced query building options: Expand the query builder with additional clauses and functionalities to provide more flexibility.
- Enhanced error handling and validation: Improve error reporting and provide better validation of query structures to catch potential issues.

The roadmap reflects the vision for the future development of mysql-ease and is subject to change based on user feedback and emerging needs.

### License

This project is licensed under the MIT License, which allows you to use, modify, and distribute the package for both personal and commercial projects. See the LICENSE file for more details.

### Conclusion

Thank you for choosing mysql-ease! We hope this package simplifies your MySQL database interactions and enhances your Node.js applications. If you have any further questions or need assistance, please don't hesitate to reach out at harmony@entrebyte.co.za, Happy coding!
