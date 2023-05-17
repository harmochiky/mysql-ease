const db = require("./lib/index");

exports.getUsers = async (req, res) => {
  let data_ = {};

  try {
    await db.beginTransaction();
    db.update({
      first_name: "Zayne",
    })
      .where("first_name", "=", "Sean")
      .from("users")
      .query();

    await db
      .select()
      .where("first_name", "=", "Zayne")
      .from("users")
      .query()
      .then((data) => {
        data_.otherData = data;
      });

    await db.commitTransaction();
    res.status(200).json(data_);
  } catch (error) {
    console.log(error);
    // Rollback the transaction if there's an error
    await db.rollbackTransaction();

    res.status(400).json({ error });
  }
};
