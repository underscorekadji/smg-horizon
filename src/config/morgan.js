const morgan = require('morgan');
const chalk = require('chalk');

morgan.token('id', req => req.id);

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

module.exports = app => {
  app.use(
    morgan(chalk.red(loggerFormat), {
      skip(req, res) {
        return res.statusCode < 400;
      },
      stream: process.stderr
    })
  );

  app.use(
    morgan(loggerFormat, {
      skip(req, res) {
        return res.statusCode >= 400;
      },
      stream: process.stdout
    })
  );
};
