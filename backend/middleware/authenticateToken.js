const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({error: 'Authorization header is missing'});
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({error: 'Token is missing'});
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({error: 'Invalid or expired token'});
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
