const verifyRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access forbidden: insufficient role' });
      }
      next();
    };
  };
  
  module.exports = verifyRole;
  