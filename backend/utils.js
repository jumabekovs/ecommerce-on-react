const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || "somethingsecret",
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: "Invalid token" });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "No Token" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: "Not an Admin" });
};

module.exports = {
  generateToken,
  isAuth,
  isAdmin,
};
