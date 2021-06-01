const express = require("express");
const multer = require("multer");
const app = express();
const db = require("./db");
const s3 = require("./s3");
const path = require("path");
const uidSafe = require("uid-safe");

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("GET /");
});

app.get("/images", (req, res) => {
    db.getImages()
        .then(({ rows }) => res.json(rows))
        .catch((e) => console.log("error in /images", e));
});

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename(req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    if (req.file) {
        console.log(req.file);
        let urlImage = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
        db.setImage(
            urlImage,
            req.body.username,
            req.body.title,
            req.body.description
        )
            .then((result) => console.log("result in setImages", result))
            .catch((e) => console.log("error in setImages", e));
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("/imagedata/:id", (req, res) => {
    // console.log(req.params);
    db.getImageInfo(req.params.id).then((result) => {
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    });
});

app.listen(8080, () => console.log("imageboard is listening..."));
