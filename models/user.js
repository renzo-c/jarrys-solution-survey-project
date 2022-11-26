let mongoose = require("mongoose");

// create a model class
let Users = mongoose.Schema(
  {
    id: String,
    name: String,
    username: String,
    email: String,
    password: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", Users);
