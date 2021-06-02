const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres:@localhost:5432/imageboard"
);

module.exports.getImages = () => {
    return db.query(`
    SELECT id, url, title FROM images
    ORDER BY id DESC
    LIMIT 2
    ;`);
};

module.exports.loadMoreImages = (lowestid) => {
    const q = `SELECT * , (SELECT id FROM images ORDER BY id ASC 
        LIMIT 1) AS "lowestId" FROM images 
        WHERE id < $1 
        ORDER BY id DESC 
        LIMIT 2;`;
    const params = [lowestid];
    return db.query(q, params);
};

module.exports.setImage = (url, username, title, description) => {
    const q = `
    INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)     
    RETURNING *   
    ;`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.getImageInfo = (id) => {
    const q = `
    SELECT * FROM images WHERE id = $1
    ;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getComments = (id) => {
    const q = `
    SELECT comment_text, username FROM comments WHERE image_id = $1
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.insertComment = (comment, username, image_id) => {
    const q = `
    INSERT INTO comments (comment_text, username, image_id) 
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const params = [comment, username, image_id];
    return db.query(q, params);
};
