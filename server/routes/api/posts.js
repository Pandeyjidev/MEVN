const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const router = express();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const URL = process.env.MONGO_DB_URL;

console.log(`Server is running on ${process.env.MONGO_DB_PORT} :: username = ${process.env.MONGO_DB_USERNAME} :: password = ${process.env.MONGO_DB_PASSWORD} :: URL = ${process.env.MONGO_DB_URL}`);
// Get Post
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

// Delete Post


const loadPostCollection = async () => {
    const client = await MongoClient.connect(`mongodb+srv://${username}:${password}${URL}`, {
        useNewUrlParser: true
    });
    return client.db('userProfiles').collection('posts');
}
module.exports = router;