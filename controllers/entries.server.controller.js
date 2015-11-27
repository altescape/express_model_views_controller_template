var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
    Entry = mongoose.model('Entry');


exports.create = function(req, res) {
  var entry = new Entry(req.body);
  entry.sessionId = req.sessionID;
  entry
    .save(function(err) {
      if (err) return res.status(500).send(err);
      res.json(entry);
    });
};

exports.update = function(req, res) {
  var entry = req.entry;
  entry = _.extend(entry, req.body);
  entry
    .save(function(err) {
      if (err) return res.status(400).send(err);
      res.json(entry);
    });
};

exports.read = function(req, res) {
  res.json(req.entry);
};

exports.delete = function(req, res) {
  var entry = req.entry;
  entry
    .remove(function(err) {
      if (err) { return res.status(400).send(err); }
      res.json(entry);
    });
};

exports.list = function(req, res) {
  Entry
    .find()
    .sort('-createdAt')
    .exec(function(err, entries) {
      if (err) return res.status(400).send(err);
      res.json(entries);
    });
};

exports.admin = function(req, res) {
  res.render('admin/entries');
};

exports.entryById = function(req, res, next, id) {
  Entry
    .findById(id)
    .exec(function(err, entry) {
      if (err) return next(err);
      if (!entry) return next(new Error('Failed to load entry ' + id));
      req.entry = entry;
      next();
    });
};
