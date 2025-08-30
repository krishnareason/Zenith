// src/api/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Get token from header
  const token = req.header('Authorization');

  // 2. Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    // The token is in the format "Bearer <token>", so we split it and take the second part
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Add the user payload from the token to the request object
    req.user = decoded.user;
    next(); // Move on to the next piece of middleware or the route's controller
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};