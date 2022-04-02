const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. Not Authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  }
  catch (err) {
    res.status(400).send('Invalid token.');
  }
}