const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization'); // Retrieve the Authorization header

    if (!authHeader) {
      return res.status(401).json({ error: 'No Authorization header provided' });
    }

    const token = authHeader.replace('Bearer ', ''); // Remove 'Bearer ' if the header exists

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = decoded; // Store decoded info in req.user
      
      // Check if roles are provided and if user's role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = { authMiddleware };
