const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Token Invalido' });
      } else {
        req.userId = decodedToken.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No se proporciono Token' });
  }
};

module.exports = requireAuth;