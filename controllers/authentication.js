const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const verifyJWT = require("../middlewares/verifyJWT");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!(email && username && password)) {
        res.json({ auth: false, msg: "Please, complete all fields" });
    } else {
        const oldUser = await Users.findOne({ username });

        if (oldUser) {
            res.json({
                auth: false,
                msg: "Username already registered, choose another one",
            });
        } else {
            bcrypt.hash(password, 10).then((hash) => {
                Users.create({
                    username,
                    email,
                    password: hash,
                })
                    .then((newUser) => {
                        const userInSession = {
                            id: newUser._id.toString(),
                            username: newUser.username,
                            email: newUser.email,
                        };

                        const accessToken = jwt.sign({ ...userInSession }, "jwtSecret", {
                            expiresIn: 60 * 60 * 24,
                        });

                        res.json({
                            auth: true,
                            token: accessToken,
                            result: userInSession,
                            msg: "User registered and authenticated!",
                        });
                    })
                    .catch((err) => {
                        if (err) {
                            res.status(400).json({ error: err });
                        }
                    });
            });
        }
    }
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) {
        res.json({ auth: false, msg: "User Doesn't Exist" });
    } else {
        const userInSession = {
            id: user._id.toString(),
            username: user.username,
            password: user.password,
        };

        const dbPassword = user.password;
        bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res.json({
                    auth: false,
                    msg: "Wrong Email and Password Combination!",
                });
            } else {
                const accessToken = jwt.sign({ ...userInSession }, "jwtSecret", {
                    expiresIn: 60 * 60 * 24,
                });

                res.json({
                    auth: true,
                    token: accessToken,
                    result: userInSession,
                    msg: "User authenticated!",
                });
            }
        });
    }
}

module.exports.authenticateUser = (req, res) => {
    res.json({ auth: true, msg: "You are authenticated!" });
}

module.exports.logoutUser = (req, res) => {
    res.json("Logged out successfully");
}
