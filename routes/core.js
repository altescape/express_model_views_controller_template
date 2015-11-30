var express = require('express'), 
    app = express();

// Do not change anything below this lot
//
// This is for rendering the partials and pages stored in sub-directory

// Partial views
app.get('/views/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

// Page views
app.get('/views/pages/:name', function(req, res) {
  var name = req.params.name;
  res.render('pages/' + name);
});

// Page sub-views
app.get('/views/pages/:subname/:name', function(req, res) {
  var name = req.params.name;
  var subname = req.params.subname;
  res.render('pages/' + subname + '/'  + name);
});

module.exports = app;
