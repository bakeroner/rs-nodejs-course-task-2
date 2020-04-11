const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const expressWinston = require('express-winston');
const logger = require('./middleware/logger/logger-settings');
const CustomError = require('./helpers/custom-error');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(expressWinston.logger(logger));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    logger.error(err.message);
    res.status(err.status).send(err.message);
    return;
  }
  next(err);
});
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Server error');
});

process.on('uncaughtException', error => {
  logger.error(error.message);
  console.error(`Captured error: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.warning(`Unhandled promise rejection ${reason.message}`);
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

module.exports = app;
