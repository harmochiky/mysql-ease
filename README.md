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

##

Certainly! Here's an expanded version of the README.md file with more detailed content:

markdown
Copy code

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
