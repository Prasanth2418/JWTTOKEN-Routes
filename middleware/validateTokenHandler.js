const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("User is not authorized");
  }
 token = authHeader;
try {
    const decoded = await jwt.verify(token, process.env.JWTPASSWORD);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send("User not authorized");
  }
};

module.exports = validateToken;
