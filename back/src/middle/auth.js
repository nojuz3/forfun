const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || JSW;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message:
          err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
      });
    }
    req.user = user;
    next();
  });
};
module.exports = { authMiddleware };
