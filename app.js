var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var summariesRouter = require('./routes/summaries');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var mongoURL = "";
var mongoHost = process.env['MONGODB_HOST_MLAB'],
  mongoPort = process.env['MONGODB_PORT_MLAB'],
  mongoDatabase = process.env['MONGODB_DATABASE_MLAB'],
  mongoPassword = process.env['MONGODB_PASSWORD_MLAB'],
  mongoUser = process.env['MONGODB_USER_MLAB'];

if (mongoHost && mongoPort && mongoDatabase) {
  mongoURLLabel = mongoURL = 'mongodb://';
  if (mongoUser && mongoPassword) {
    mongoURL += mongoUser + ':' + mongoPassword + '@';
  }
  // Provide UI label that excludes user id and pw
  mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
  mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

}
console.log(mongoURL);
mongoose.connect(mongoURL);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/summaries', summariesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
