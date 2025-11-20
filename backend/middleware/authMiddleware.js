
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
// Middleware to verify JWT token and check for admin role
const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }


    // Verify JWT token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userRole = decoded.role;
        console.log("userRole", userRole);

        req.user = decoded;
        console.log("req.user", req.user);

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Only admin can access this route" });
        }


        next();

    } catch (err) {
        console.log("err", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
