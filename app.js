require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./router/router.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 8080);
