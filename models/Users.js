const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 100
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String ,
        required: true,
        minlength: 4,
        maxlength:1000,
        select: false
    },


});

module.exports = mongoose.model('Users',UserSchema);