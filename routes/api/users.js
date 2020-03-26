const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../../models/User");
const secretStr = require("../../models/secretStr");
const secretOrKey = require("../../config/keys").secretOrKey;
const passport = require("passport");
// validate inputs
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//sendgrid email verification
const sendgrid = require("../../config/sendgrid");
const randomstring = require("randomstring");
//reset password
const resetPssaword = require("../../config/passwordreset");
// api/iser/register
//register new user acces public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // check validation input
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "email already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //size
          r: "pg", // rating
          d: "retro" //default
        });
        let sec = new secretStr({ str: randomstring.generate() });
        sec.save();
        const newuser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
          verificationCode: sec.id
        });
        bcrypt.genSalt(5, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) throw err;
            newuser.password = hash;
            newuser
              .save()
              .then(user => {
                res.json(user);
                sendgrid(user.email, sec.str, user.id);
              })
              .catch(e => console.log("err regist new user " + e));
          });
        });
      }
    })
    .catch(e => console.log(`cant findOne email err:${e}`));
});

//api/user/verification/:secStr/:Id
router.get("/verification/:secStr/:user_id", async (req, res) => {
  const randString = await secretStr.findOne({ str: req.params.secStr });
  const user = await User.findById(req.params.user_id);

  try {
    if (!randString) {
      const newStr = await new secretStr({ str: randomstring.generate() });
      newStr.save();
      const { email, userId } = {
        email: user.email,
        userId: req.params.user_id
      };
      sendgrid(email, newStr.str, userId);
      return res.json({
        msg: "token expired check your email we sent new one"
      });
    } else {
      let { randStr, reqStr } = {
        randStr: randString.str,
        reqStr: req.params.secStr
      };
      if (randStr.localeCompare(reqStr) === 0) {
        (user.isVerified = true), user.save();
        res.send("email verified");
      }
    }
  } catch (error) {
    res.json(error);
  }
});

/*router.post('/verification/:id' ,(req,res)=>{
   User.findById(req.params.id)
    .then(user=>{
      const  {getCode,secretStr } ={getCode:req.body.getcode, secretStr: user.verificationCode} 
      if(secretStr.localeCompare(getCode) === 0){
        user.isVerified = true
        user.save()
        res.send('email verified')
      }
    })
    .catch(e=> res.json(e))

})*/

//POST reset password
// api/user/reset
router.post("/reset", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return res.json({ email: "can not find user with this email" });
    } else {
      let { email, userId } = { email: user.email, userId: user.id };
      let secStr = new secretStr({ str: randomstring.generate() });
      secStr.save();
      //console.log( userId + ' '+ email + ' '+ secStr.str)
      resetPssaword(email, secStr.str, userId);
      res.json({ msg: `an email is sent to ${user.email}` });
    }
  } catch (error) {
    res.json(error);
  }
});
//PUT update password
//api/user/reset/:secStr/:id
router.put("/reset/:secStr/:id", async (req, res) => {
  try {
    let randString = await secretStr.findOne({ str: req.params.secStr });
    let user = await User.findById(req.params.id);
    let { newPassword, confirm } = {
      newPassword: req.body.password,
      confirm: req.body.password2
    };

    if (!randString) {
      let newStr = await new secretStr({ str: randomstring.generate() });
      newStr.save();
      resetPssaword(user.email, newStr.str, user.id);
      res.json({
        messge: "token expired check out your email we sent new one"
      });
    } else if (newPassword.localeCompare(confirm) !== 0) {
      return res.json({ message: "confirm password and password dont match" });
    } else {
      bcrypt.genSalt(5, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newPassword, salt, async (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          const updtprofile = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { password: newPassword } },
            { new: true }
          );
          try {
            console.log(updtprofile);
            res.json({ message: "please login with new password" });
          } catch (error) {
            res.json(error);
          }
        });
      });
    }
  } catch (error) {
    res.json(error);
  }
});

// api/user/login
//login  user acces public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = {
    email: req.body.email,
    password: req.body.password
  };
  //console.log(`email: ${email} password: ${password}`)
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "email does not exist please sign up";
        return res.status(400).json(errors);
      }
      if (user.isVerified === false) {
        errors.isVerified = "please verify your email to login ";
        return res.json(errors);
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
            errors.password = "password incorrect";
            return res.status(400).json(errors);
          }
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

//current user route
// api/users/current acces private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = router;
