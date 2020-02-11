/**
 * This middleware is used to verify the token that is coming in a request
 * to check is the user is logged in or not. If the token is not valid
 * (validation done by the verify() method) then this middleware will not
 * let the request to pass.
 */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); //This returns the decoded token
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!"
    });
  }
};
