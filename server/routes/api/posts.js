const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const router = express();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

// Get Post
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});
// router.get('/api/posts', async (req, res) => {
//     res.send('hello');
// });

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(200).send();
})

// Delete Post


const loadPostCollection = async () => {
    const client = await MongoClient.connect(`mongodb+srv://${username}:${password}@cluster0.ida8h.mongodb.net/userProfiles?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    });

    return client.db('userProfiles').collection('posts');
}
module.exports = router;