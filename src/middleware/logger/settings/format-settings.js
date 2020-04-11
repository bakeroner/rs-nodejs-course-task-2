const { format } = require('winston');
const { combine, colorize, timestamp, uncolorize, cli, json } = format;
const logFormatter = require('./log-formatter');

module.exports = {
  silly: combine(colorize(), cli(), timestamp(), logFormatter),
  info: combine(uncolorize(), json()),
  error: combine(uncolorize(), json())
};
