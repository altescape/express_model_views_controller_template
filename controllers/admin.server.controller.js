var express = require('express'),
    app = express.Router();

exports.index = function(req, res) {
  res.render('pages/admin/index');
};

exports.entries = function(req, res) {
  res.render('pages/admin/entries');
};

// Middleware
exports.isRequired = function(req, res, next) {
  if (!req.user || req.user.role[0] !== 'administrator') {
    return res.status(401).send('User is not authorized');
  }
  next();
};
