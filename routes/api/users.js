const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../../models/User");
const secretOrKey = require("../../config/keys").secretOrKey;
const passport = require('passport')
// validate inputs 
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
// api/iser/register
//register new user acces public

router.post("/register", (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)
  // check validation input
  if(!isValid){
    return res.status(400).json(errors)
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "email already exists"
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //size
          r: "pg", // rating
          d: "retro" //default
        });
        const newuser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });
        bcrypt.genSalt(5, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) throw err;
            newuser.password = hash;
            newuser
              .save()
              .then(user => res.json(user))
              .catch(e => console.log("err regist new user " + e));
          });
        });
      }
    })
    .catch(e => console.log(`cant findOne email err:${e}`));
});

// api/user/login
//login  user acces public
router.post("/login", (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors)
  }

  const { email, password } = {
    email: req.body.email,
    password: req.body.password
  };
  //console.log(`email: ${email} password: ${password}`)
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email= "email does not exist please sign up"
        return res
          .status(400)
          .json(errors);
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // user matched
            const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatar
            }; // create payload
            //sign token
            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  succes: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password= "password incorrect"
            return res.status(400).json(errors);
          }
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

//current user route
// api/users/current acces private
router.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=>{
  res.json(req.user)
})
module.exports = router;
