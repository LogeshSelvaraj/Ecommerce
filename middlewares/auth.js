const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  const token = req.headers.token;
  try {
    const firebaseUser = await admin.auth().verifyIdToken(token);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.authAdminCheck = async (req, res, next) => {
  const { email } = req.user;
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      throw new Error(err);
    } else {
      if (foundUser.role === "admin") next();
      else res.status(403).send("Admin Resource Access denied");
    }
  });
};
