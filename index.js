const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config(); 

//Import Posts route
const postsroute = require('./routes/posts');

//Connect DB
mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
},
    () => console.log('DB Connected')
);

//Middlewares
app.use(bodyParser.json());
app.use('/posts',postsroute);

app.listen(3000, () => console.log('Server running'));