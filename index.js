const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Connect to DataBase
require('./db_connect');


//Import Posts route
const postsroute = require('./routes/posts');

//Import Users route
const usersroute = require('./routes/users');

//Middlewares
app.use(bodyParser.json());
app.use('/posts',postsroute);
app.use('/users',usersroute);



app.listen(3000, () => console.log('Server running'));