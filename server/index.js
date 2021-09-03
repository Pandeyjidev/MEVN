const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors());

const posts = require('./routes/api/posts.js');
// app.get('/', (req, res) => {
//     res.send('hello');
// });

app.use('/', posts);

const port = process.env.MONGO_DB_PORT || 5000;


app.listen(port, () => console.log(`Backend Server running on : ${port}` ))