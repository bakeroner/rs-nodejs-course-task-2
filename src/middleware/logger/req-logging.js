const logger = require('./logger-settings');

module.exports = (req, res, next) => {
  const logMsg = `requestType: ${req.method} | requestUrl: ${
    req.originalUrl
  } | query params: ${JSON.stringify(req.query)} | body: ${JSON.stringify(
    req.body
  )}`;
  logger.info(logMsg);
  next();
};
