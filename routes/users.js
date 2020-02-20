const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const { createToken, checkToken } = require('../auth');

//Register a user
router.post('/register', async (req, res) => {


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name
    });
    try {
        const registeredUser = await user.save();
        res.json(registeredUser);
    }
    catch (err) {
        res.json({ message: err });
    }
});


//gets all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({
            message: err
        });
    }

});

//find a specific user
router.get('/:username', async (req, res) => {
    try {
        var user = await User.find({ username: req.params.username });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }

});



router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        const pass = await bcrypt.compare(req.body.password, user.password);
        if (!pass)
            return res.json({ message: "Invalid Password" });
        const token = createToken(req.body.email);
        return res.json({ message: "logged in", token: token });
    }
    catch (err) {
        return res.json({ message: "Invalid Email" });
    }
});
module.exports = router;
