const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        message:
          err.name === "TokenExpiredError"
            ? "Token expired"
            : "Invalid token",
      });
    }
    
    console.log('Authenticated!');
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
