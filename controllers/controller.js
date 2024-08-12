const db = require("../db/pool.js");

exports.getCategories = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM categories");
  res.render("index", {categories: rows});
};
