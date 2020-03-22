const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const User = mongoose.model("users");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");

//GET current user profile
// api/profile  privat
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userProfile = await Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .catch(e => console.log(e));
    const errors = {};
    if (!userProfile) {
      errors.noprofile = "no profile found for this user";
      return res.status(400).json(errors);
    }
    try {
      res.json(userProfile);
    } catch (e) {
      console.log(e);
    }
  }
);
//GET get all profiles
// api/profile/all public
router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "can not find any profile";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(e => console.log(e));
});

//GET get profile by handle
// api/profile/handle/:handle public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "profile do not exist";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(e => console.log(e));
});
//GET get profile by id
// api/profile/user/:user_id public
router.get("/user/:user_id", async (req, res) => {
  const profile = await Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .catch(e => console.log(e));
  const errors = {};
  if (!profile) {
    errors.noprofile = "profile do not exist";
    return res.status(404).json(errors);
  }
  try {
    res.json(profile);
  } catch (e) {
    console.log(e);
  }
  /*Profile.findById(req.params.user_id)
    .populate('user', ['name', 'avatar'])
    .then(profile=>{
      if(!profile){
        errors.handle = 'profile do not exist'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(e=> console.log(e))*/
});

//POST creat new profile  or edit profile if existed
// api/profile privat

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profile_data = {};
    profile_data.user = req.user.id;
    if (req.body.handle) profile_data.handle = req.body.handle;
    if (req.body.company) profile_data.company = req.body.company;
    if (req.body.website) profile_data.website = req.body.website;
    if (req.body.location) profile_data.location = req.body.location;
    if (req.body.status) profile_data.status = req.body.status;
    if (req.body.bio) profile_data.bio = req.body.bio;
    if (req.body.github) profile_data.github = req.body.github;

    if (typeof req.body.skills !== "undefined")
      profile_data.skills = req.body.skills.split(",");

    // social
    profile_data.social = {};
    if (req.body.youtube) profile_data.social.youtube = req.body.youtube;
    if (req.body.facebook) profile_data.social.facebook = req.body.facebook;
    if (req.body.instagram) profile_data.social.instagram = req.body.instagram;
    if (req.body.twitter) profile_data.social.twitter = req.body.twitter;
    if (req.body.linkedin) profile_data.social.linkedin = req.body.linkedin;

    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //edit profile
      const edit_profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profile_data },
        { new: true }
      );
      try {
        res.json(edit_profile);
      } catch (e) {
        console.log(e);
      }
    } else {
      //create profile
      //check if handle exist
      const profile_handle = await Profile.findOne({ handle: req.body.handle });
      if (profile_handle) {
        errors.handle = "handle exist update your profile";
        return res.status(400).json(errors);
      }
      try {
        const newprofile = await new Profile(profile_data).save();
        res.json(newprofile);
      } catch (e) {
        console.log(e);
      }
    }
  }
);

module.exports = router;
