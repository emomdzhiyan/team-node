const express = require('express');
const { config } = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const { allowedOrigin } = require('./config');

config();

require('./db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const invitationsRouter = require('./routes/invitations');

const app = express();

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedOrigin.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', '*, POST, PATCH, GET, PUT, DELETE, OPTIONS, HEAD, TRACE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, '
    + 'X-Access-Token, X-Refresh-Token, X-XSRF-TOKEN');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/invitations', invitationsRouter);

module.exports = app;
