const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token === null) {
    res.send({ auth: false, message: "There is no token!" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Authentication failed!" });
      } else {
        res.locals = decoded
        // req.userEmail = decoded.email;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
