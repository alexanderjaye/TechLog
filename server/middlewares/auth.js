const authMiddleware = async (req, res, next) => {
  try {
    console.log('in middleware');
    next();
  } catch (err) {
    return res.status(401);
  }
}

module.exports = authMiddleware;