const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();
const router = express();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const URL = process.env.MONGO_DB_URL;

console.log(`username = ${process.env.MONGO_DB_USERNAME} :: password = ${process.env.MONGO_DB_PASSWORD} :: URL = ${process.env.MONGO_DB_URL}`);
// Get Post
router.get('/api/posts', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/api/posts', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

// Delete Post
router.delete('api/posts/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

    res.status(200).send()
})


const loadPostCollection = async () => {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${username}:${password}${URL}`, {
        useNewUrlParser: true
    });
    return client.db('userProfiles').collection('posts');
}
module.exports = router;