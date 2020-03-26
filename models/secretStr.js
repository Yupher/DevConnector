const mongoose = require("mongoose");
const schema = mongoose.Schema;

const secretSchema = new schema({
  date: {
    type: Date,
    default: Date.now,
    expires: 30
  },
  str: String
});

module.exports = secretStr = mongoose.model("secretStr", secretSchema);
