var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('etag', false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression({filter: shouldCompress}))
 
function shouldCompress(req, res) {
  console.log("req.query.gzip" , req.query.gzip);
  if (!req.query.gzip) {
    return false
  }
 
  // fallback to standard filter function 
  return compression.filter(req, res)
}

app.get('/*', function (req, res, next) {
  if (req.query.cached) {
    res.setHeader("Cache-Control", "public, max-age=30");
    res.setHeader("Expires", new Date(Date.now() + 30000).toUTCString());
  }
  else{
    res.setHeader("Cache-Control", "no-cache, no-store");
  }
  if(req.query.delay){
    setTimeout(next, +req.query.delay)
  }
  else{
    next();  
  }
  
});



app.use(express.static(path.join(__dirname, 'public'),{etag: false}));



app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.locals.pretty = true;


module.exports = app;
