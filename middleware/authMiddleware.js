const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Check if the header exists
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).send({
        message: "Auth header is missing",
        success: false
      });
    }

    // 2. Safely split the token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            message: "Token is missing from header",
            success: false
        });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach userId directly to the request object (not the body)
    req.userId = decodedToken.userId; 
    next();
  } catch (error) {
    res.status(401).send({
        message: "Invalid token",
        success: false
    });
  }
};