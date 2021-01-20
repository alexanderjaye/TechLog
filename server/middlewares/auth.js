const authMiddleware = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    return res.status(401);
  }
}

module.exports = authMiddleware;