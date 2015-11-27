var express = require('express'),
    passport = require('passport'),
    users = require('../controllers/users.server.controller'),
    app = express.Router();

app.route('/')
  .get(users.index);

app.route('/register')
  .get(users.register)
  .post(users.createUser);

app.route('/login')
  .get(users.login)
  .post(passport.authenticate('local'), users.login);

app.route('/logout')
  .get(users.logout);

module.exports = app;
