const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post('/signup', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
});

module.exports = router;