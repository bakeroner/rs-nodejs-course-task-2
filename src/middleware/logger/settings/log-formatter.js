const { format } = require('winston');
const { printf } = format;

module.exports = printf(msg => {
  const eventLogging = `${msg.timestamp}: ${msg.level} msg: ${msg.message}`;
  const reqLog =
    msg.meta && msg.meta.req
      ? `query: ${JSON.stringify(msg.meta.req.query)}, body: ${
          msg.meta.req.body
        }, responseStatus: ${msg.meta.res.statusCode}`
      : '';
  return eventLogging + reqLog;
});
