const express = require("express");
const app = express();

const sweets = [
    { id: 1, name: "cupcake", emoji: "🧁" },
    { id: 2, name: "custard", emoji: "🍮" },
    { id: 3, name: "mooncake", emoji: "🥮" },
];

app.get("/sweets", (req, res) => {
    console.log("GET /sweets");
    res.json(sweets); // we're only sending data the server will exclusively be using res.json to send responses
});

app.use(express.static("public"));

app.listen(8080, () => console.log("imageboard is listening..."));
