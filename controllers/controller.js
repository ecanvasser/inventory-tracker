const db = require("../db/pool.js");

exports.getCategories = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM categories");
  res.render("index", { categories: rows });
};

exports.getRelatedProducts = async (req, res) => {
  const category = req.params.category;
  const { rows } = await db.query(
    `SELECT * FROM products 
     JOIN categories ON products.category_id = categories.id 
     WHERE categories.category ILIKE $1`,
    [category]
  );
  res.render("categoryView", { products: rows });
};
