const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const verifyJWT = require("../middlewares/verifyJWT");
const bcrypt = require("bcrypt");

let userController = require('../controllers/user')

module.exports = (app) => {
  app.get(`/api/users`, verifyJWT, userController.getAllUsers);

  app.get(`/api/users/:id`, verifyJWT, userController.getUser);

  app.post(`/api/users/add`, verifyJWT, userController.addUser);

  app.get(`/api/users/delete/:id`, verifyJWT, userController.deleteUser );

  app.get(`/api/users/update/:id`, verifyJWT, userController.getUserForUpdate);

  app.post(`/api/users/update/:id`, verifyJWT, userController.processUserForUpdate);
};
