const db = require("../db/pool.js");

exports.getCategories = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM categories");
  res.render("index", { categories: rows });
};

exports.getRelatedProducts = async (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);
  const { rows } = await db.query(
    `SELECT * FROM products JOIN categories ON products.category_id = categories.id WHERE category_id = ${categoryId}`
  );
  console.log(rows);
  res.render("categoryView", { products: rows });
};
