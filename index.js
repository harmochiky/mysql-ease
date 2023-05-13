const express = require("express");
const Query = require("./package/queryBuilder");
const app = express();

const query = new Query();

app.get("/query", (req, res) => {
  let people = [];
  query
    .select("character.name", "character_tv_show.tv_show_name")
    .from("character")
    .join("character.id", "==", "character_tv_show.character_id")
    .where("num_shows", ">", 10)
    .orderBy("num_shows", "DESC")
    .limit(15)
    .execute((error, results, fields) => {
      if (error) {
        // catch any errors whilst quering the database
        console.error(error);
        return res.status(400).json({ error });
      }
      people = results; // return result as JSON
      return res.status(200).json({ status: 200, results });
    });
});

app.listen(5000, () => {
  console.log(`server is listening at port ${5000}`);
});
