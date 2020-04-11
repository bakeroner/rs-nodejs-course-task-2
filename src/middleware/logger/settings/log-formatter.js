const { format } = require('winston');
const { printf } = format;

module.exports = printf(msg => {
  return `${msg.timestamp}: ${msg.level} msg: ${msg.message}`;
});
