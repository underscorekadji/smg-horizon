const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pe = require('parse-error');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const chalk = require('chalk');

const v1 = require('./api/routes');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Morgan
morgan.token('id', req => req.id);

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

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

// Passport
app.use(passport.initialize());

app.use('/api/v1', v1);

// Health Route
app.get('/health', (req, res) => {
  res.status(200).send();
});

app.get('*', (req, res) => res.status(404).send());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

process.on('unhandledRejection', error => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Error', pe(error));
});
