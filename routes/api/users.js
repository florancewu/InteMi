const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//loads user model in to check if email exists already
const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//http://localhost:5000/api/users/test

// @route GET api/users/register
// @desc Register User
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
