const express = require("express");
const query = require("./lib/queryBuilder");
const { initializeConnection } = require("./lib/connection");
const { getUsers } = require("./handler");

const app = express();

initializeConnection({
  host: "localhost",
  user: "scholaflow",
  password: "root",
  database: "scholaflow",
});

app.get("/", getUsers);

app.get("/query", (req, res) => {
  //
  //

  let people = [];
  let characters = [];

  // (method) QueryBuilder.select(...fields: any[]): QueryBuilder
  // Fields to select. Default all ("*")
  // @param fields

  query
    .select("character.name", "character_tv_show.tv_show_name")
    .from("character")
    .join("character.id", "==", "character_tv_show.character_id")
    .where("num_shows", ">", 10)
    .orderBy("num_shows", "DESC")
    .limit(15)
    .execute((results, fields) => {
      people = results;
      return query
        .select("character.name", "character_tv_show.tv_show_name")
        .from("character")
        .limit(15)
        .execute();
    })
    .then((results, fields) => {
      characters = results;
      return res.status(200).json({ people, characters });
    });
  // .catch((err) => {
  //   console.log(err);
  //   res.status(400).json({ error });
  // });

  //
  //
});

app.listen(5000, () => {
  console.log(`server is listening at port ${5000}`);
});
