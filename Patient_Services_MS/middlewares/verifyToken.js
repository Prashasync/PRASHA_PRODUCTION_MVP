const logger = require('../utils/logger');
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info(`[Auth] ${req.method} ${req.originalUrl} - Authenticated`);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;



// const requestLogger = (req, res, next) => {
//   const start = Date.now();

//   res.on('finish', () => {
//     const { method, originalUrl } = req;
//     const status = res.statusCode;
//     const duration = Date.now() - start;

//     logger.info(`[Request] ${method} ${originalUrl} ${status} - ${duration}ms`);
//   });

//   next();
// };

// module.exports = requestLogger;
