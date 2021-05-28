const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("GET /");
});

app.get("/images", (req, res) => {
    db.getImages().then(({ rows }) => res.json(rows));
});

app.listen(8080, () => console.log("imageboard is listening..."));
