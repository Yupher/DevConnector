const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: String,
  company: String,
  website: String,
  location: String,
  status: String,
  skills: [String],
  bio: String,
  github: String,
  experience: [
    {
      title: String,
      company: String,
      location: String,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  education: [
    {
      degree: String,
      school: String,
      fieldofstudy: String,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  social: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);
