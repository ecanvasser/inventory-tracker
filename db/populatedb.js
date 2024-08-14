require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  quantity INTEGER,
  price FLOAT,
  category_id INTEGER REFERENCES categories(id)
);

-- Insert categories
INSERT INTO categories (category) 
VALUES
  ('Intake'),
  ('Exhaust'),
  ('Wheels')
ON CONFLICT (category) DO NOTHING;

-- Insert products
INSERT INTO products (name, quantity, price, category_id)
VALUES
  -- Intake products
  ('Cold Air Intake System', 50, 199.99, (SELECT id FROM categories WHERE category = 'Intake')),
  ('Performance Air Filter', 100, 59.99, (SELECT id FROM categories WHERE category = 'Intake')),
  ('Throttle Body Spacer', 30, 89.99, (SELECT id FROM categories WHERE category = 'Intake')),

  -- Exhaust products
  ('Cat-Back Exhaust System', 25, 599.99, (SELECT id FROM categories WHERE category = 'Exhaust')),
  ('Muffler', 75, 129.99, (SELECT id FROM categories WHERE category = 'Exhaust')),
  ('Exhaust Tip', 150, 39.99, (SELECT id FROM categories WHERE category = 'Exhaust')),

  -- Wheels products
  ('Alloy Wheel Set', 20, 799.99, (SELECT id FROM categories WHERE category = 'Wheels')),
  ('Steel Wheel', 60, 69.99, (SELECT id FROM categories WHERE category = 'Wheels')),
  ('Wheel Spacers', 80, 49.99, (SELECT id FROM categories WHERE category = 'Wheels'));
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.URI,
  });
  try {
    console.log("Connection string:", process.env.URI);
    await client.connect();
    console.log("Connected to database");
    const result = await client.query(SQL);
    console.log("Query executed. Tables created and data inserted.");
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await client.end();
    console.log("Client disconnected");
  }
  console.log("done");
}

main().catch(console.error);
