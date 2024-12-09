const jwt = require("jsonwebtoken");
const protectRoute = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    // Attach decoded information (user data) to the request object
    req.user = decoded;

    // Check if the user has admin privileges
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  });
};
module.exports = protectRoute;
