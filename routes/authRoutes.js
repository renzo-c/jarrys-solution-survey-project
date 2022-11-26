const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const verifyJWT = require("../middlewares/verifyJWT");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let authController = require('../controllers/authentication');


module.exports = (app) => {
  app.post("/api/register", authController.registerUser);

  app.post("/api/login", authController.loginUser);

  app.post("/api/logout", verifyJWT, authController.logoutUser);

  app.get("/api/isUserAuth", verifyJWT, authController.authenticateUser);
};
