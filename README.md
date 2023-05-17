# mysql-easy

mysql-easy is a lightweight and simplified MySQL query builder and data access wrapper for Node.js. It provides an intuitive API to construct and execute MySQL queries with ease.

## Features

- **Simple and Intuitive**: Build MySQL queries effortlessly using a chainable API.
- **Flexible Query Building**: Construct SELECT, INSERT, UPDATE, and DELETE queries with various clauses and conditions.
- **Query Customization**: Add JOIN clauses, WHERE conditions, ORDER BY, LIMIT, and OFFSET to refine your queries.
- **Transaction Support**: Begin, commit, and rollback transactions with ease.
- **Promise-based API**: Execute queries asynchronously using Promises.
- **Configurable Connection**: Easily set up and configure the MySQL database connection.

## Installation

Install the `mysql-easy` package from npm:

```shell
npm install mysql-easy
```

# mysql-easy

mysql-easy is a lightweight and simplified MySQL query builder and data access wrapper for Node.js. It provides an intuitive API to construct and execute MySQL queries with ease.

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

Writing complex SQL queries can be time-consuming and error-prone. mysql-easy aims to solve these challenges by providing a simplified and intuitive way to build and execute MySQL queries. Whether you are a beginner or an experienced developer, mysql-easy can significantly enhance your productivity and reduce the amount of code you need to write.

### Getting Started

To get started with mysql-easy, you need to install the package from npm using the following command:

```shell
npm install mysql-easy
```

Once the package is installed, you can include it in your Node.js application by requiring it:

```shell
const db = require('mysql-easy');
```

### Connecting to the Database

Before using mysql-ease, you need to establish a connection to your MySQL database in which unlike the `mysql` package, this can be done once in your entry file to access the database from anywhere. This can be done by configuring the connection settings and initializing the connection as shown in the example below:

```shell
const { initializeConnection } = require('mysql-easy/lib/connection');

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

mysql-easy provides a fluent and chainable API for building various types of MySQL queries. Let's explore some of the key features and query types supported by mysql-easy.

#### Select Queries

To construct a SELECT query, you can use the from() and select() methods. Here's an example:

const mysqleasy = new MysqlEasy();

mysqleasy.from('users');
mysqleasy.select('id', 'name', 'email');

const query = mysqleasy.build();
console.log(query);

The above code will output the following SELECT query:

SELECT id, name, email FROM users

You can further customize your SELECT queries by adding conditions, joining tables, specifying the order, and setting limits.

Insert Queries
To construct an INSERT query, you can use the into() and insert() methods. Here's an example:

const mysqleasy = new MysqlEasy();

mysqleasy.into('users');
mysqleasy.insert({
name: 'John Doe',
email: 'john.doe@example.com',
});

const query = mysqleasy.build();
console.log(query);

The above code will output the following INSERT query

INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com')

const mysqleasy = new MysqlEasy();

mysqleasy.into('users');
mysqleasy.insert([
{ name: 'John Doe', email: 'john.doe@example.com' },
{ name: 'Jane Smith', email: 'jane.smith@example.com' },
{ name: 'Mike Johnson', email: 'mike.johnson@example.com' },
]);

const query = mysqleasy.build();
console.log(query);

The above code will output the following INSERT query:

INSERT INTO users (name, email)
VALUES ('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Mike Johnson', 'mike.johnson@example.com')

#### Update Queries

To construct an UPDATE query, you can use the table(), set(), and where() methods. Here's an example:

```shell
const mysqleasy = new MysqlEasy();

mysqleasy.table('users');
mysqleasy.set({ status: 'active' });
mysqleasy.where('id', '=', 1);

const query = mysqleasy.build();
console.log(query);
```

The above code will output the following UPDATE query:
UPDATE users SET status = 'active' WHERE id = 1

Delete Queries
To construct a DELETE query, you can use the from() and where() methods. Here's an example:

const mysqleasy = new MysqlEasy();

mysqleasy.from('users');
mysqleasy.where('id', '=', 1);

const query = mysqleasy.build();
console.log(query);

The above code will output the following DELETE query:

DELETE FROM users WHERE id = 1

These are just a few examples of the query types supported by mysql-easy. You can explore more advanced features and query customization options in the comprehensive API Reference.

Executing Queries
mysql-easy provides a promise-based API for executing queries asynchronously. You can use the query() method to execute a built query. Here's an example:

const mysqleasy = new MysqlEasy();

// Build the SELECT query
mysqleasy.from('users');
mysqleasy.select('id', 'name', 'email');

// Execute the query
mysqleasy.query()
.then((results) => {
console.log('Query Results:', results);
})
.catch((error) => {
console.error('Query Error:', error);
});

The query() method returns a Promise that resolves with the query results or rejects with an error if the query execution fails.

Documentation
For more detailed examples and comprehensive API documentation, please refer to the Documentation.

Contributions and Support
Contributions, bug reports, and feature requests are welcome! If you encounter any issues or have any questions or suggestions, please open an issue on the GitHub repository. Your contributions help improve the package and make it more robust for the community to use.

Roadmap
The following are some planned features and enhancements for mysql-easy:

Support for aggregate functions: Enable users to perform calculations and statistical operations on query results.
Advanced query building options: Expand the query builder with additional clauses and functionalities to provide more flexibility.
Enhanced error handling and validation: Improve error reporting and provide better validation of query structures to catch potential issues.
The roadmap reflects the vision for the future development of mysql-easy and is subject to change based on user feedback and emerging needs.

License
This project is licensed under the MIT License, which allows you to use, modify, and distribute the package for both personal and commercial projects. See the LICENSE file for more details.

Thank you for choosing mysql-easy! We hope this package simplifies your MySQL database interactions and enhances your Node.js applications. If you have any further questions or need assistance, please don't hesitate to reach out. Happy coding!
