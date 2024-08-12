const { Pool } = require('pg');
const { parse } = require('pg-connection-string');

const connectionString = process.env.URI;
const config = parse(connectionString);

module.exports = new Pool(config);
