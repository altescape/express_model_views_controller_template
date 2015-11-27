var express = require('express'),
    slash = require('express-slash'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    entryModel = require('./models/entry.server.model'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    config = require('./config/config'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.enable('strict routing');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// routes/views setup
var core = require('./routes/core'),
    index = require('./routes/index'),
    admin = require('./routes/admin'),
    users = require('./routes/users');

// mongoose
var db = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error('could not connect to MongoDB');
    console.log(err);
  }
});

// routes
app.use('/', core, index);
app.use('/admin', admin);
app.use('/users', users);

// sessions
app.use(session({
  secret: 'big fat oranges',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  proxy: true,
  resave: false,
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var User = require('./models/users.server.model');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
