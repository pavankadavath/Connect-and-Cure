
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    // Extract the token after "Bearer "
    const token = authHeader.split(" ")[1];
    
    // Verify the token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user information to req.user (common practice)
    req.user = verifyToken; // or `req.user = verifyToken.userId;` depending on how you encoded the token

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;