var express = require('express'),
    app = express.Router(),
    admin = require('../controllers/admin.server.controller'),
    entries = require('../controllers/entries.server.controller');

app.route('/')
  .get(admin.index);

// render entries page
app.route('/entries')
  .get(admin.isRequired, admin.entries);

module.exports = app;
