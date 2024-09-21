const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const {authenticateToken} = require('../biodata/middleware/auth');
const jwt =  require('jsonwebtoken');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const SECRET_KEY="thisissecret"

app.post('/getJWT',  (req, res)=> {
  const username = req.body.username;
  const user = { name: username };

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '24h' });
  res.json({ token });
}); //Mendapatkan JWT

app.use('/index',authenticateToken, indexRouter);
app.use('/users',authenticateToken, usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
