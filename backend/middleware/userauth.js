const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Token format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user data in req
    req.user = decoded;   // ⭐ IMPORTANT
    next();

  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
