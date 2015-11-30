var express = require('express'),
    passport = require('passport'),
    User = require('../models/users.server.model'),
    app = express.Router();

exports.index = function(req, res) {
  res.render('pages/users/index', { user : req.user });
};

exports.register = function(req, res) {
  res.render('pages/users/register', {});
};

exports.createUser = function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('pages/users/register', {
        info: 'Sorry. That username already exists. Try again.'
      });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/users');
    });
  });
};

exports.login = function(req, res) {
  if (req.user) {
    res.redirect('/users');
  } else {
    res.render('pages/users/login', { user : req.user });
  }
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/users');
};
