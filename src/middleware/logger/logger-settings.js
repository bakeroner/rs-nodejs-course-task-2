const { createLogger, transports } = require('winston');
const expressWinston = require('express-winston');
const { silly, error, info } = require('./settings/format-settings');

const logger = createLogger({
  level: 'silly',
  format: silly,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: info
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: error
    })
  ],
  meta: true,
  requestWhitelist: [...expressWinston.requestWhitelist, 'body']
});

module.exports = logger;
