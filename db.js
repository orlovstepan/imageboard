const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres:@localhost:5432/imageboard"
);

module.exports.getImages = () => {
    return db.query(`
    SELECT url, title FROM images
    ;`);
};

module.exports.setImage = (url, username, title, description) => {
    const q = `
    INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)        
    ;`;
    const params = [url, username, title, description];
    return db.query(q, params);
};
