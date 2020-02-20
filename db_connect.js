const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//Connect DB
mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
},
    () => console.log('DB Connected')
);
module.exports = mongoose;
