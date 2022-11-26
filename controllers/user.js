const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const verifyJWT = require("../middlewares/verifyJWT");
const bcrypt = require("bcrypt");

module.exports.getAllUsers = async (req, res) => {
  const userId = res.locals.id;
  try {
    const users = await Users.findById(userId).select("-password");

    return res.json([users]);
  } catch (error) {
    return res.send(error);
  }
};

module.exports.getUser = async (req, res) => {
  let id = req.params.id;
  try {
    const user = await Users.findById(id).select("-password");

    return res.json(user);
  } catch (error) {
    return res.send(error);
  }
};

module.exports.addUser = async (req, res) => {
  let newUser = Users({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    //add bcrypt to password
  });
  Users.create(newUser, (err, user) => {
    if (err) {
      res.end(err);
    } else {
      res.json({ success: true, msg: "New user added!." });
    }
  });
};

module.exports.deleteUser = async (req, res, next) => {
  let id = req.params.id;
  Users.remove({ _id: id }, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.json({ success: true, msg: "User deleted." });
    }
  });
};

module.exports.getUserForUpdate = async (req, res, next) => {
  let id = req.params.id;
  Users.findById(id, (err, userToEdit) => {
    if (err) {
      res.end(err);
    } else {
      res.json({ success: true, msg: "", user: userToEdit });
    }
  });
};

module.exports.processUserForUpdate = async (req, res, next) => {
  let id = req.params.id;
  const { _id, name, username, email, password } = req.body;
  let hashedPassword = "";
  const user = await Users.findById(_id);

  if (!user) {
    res.json({ auth: false, msg: "User Doesn't Exist" });
  } else {
    const dbPassword = user.password;
    const saltRounds = 10;

    hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });

    let updateUser = {
      _id: user._id,
      name,
      username,
      email,
      password: dbPassword
    };

    if (!(password === dbPassword)) {
      updateUser.password = hashedPassword;
    }

    Users.findOneAndUpdate(
      { _id: id },
      { $set: updateUser },
      { runValidators: true, new: true },
      (err) => {
        if (err) {
          res.end(err);
        } else {
          res.json({
            success: true,
            msg: "User updated.",
            user: updateUser,
          });
        }
      }
    );
  }
};
