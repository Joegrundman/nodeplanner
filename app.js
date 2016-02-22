var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig')
var cors = require('cors')
var compress = require('compression')
var app = express();

var router = require('./router')(app)


// view engine setup
// ===> Swig setup
app.engine('html', swig.renderFile)
app.set('view engine', 'html')

// if (app.get('env') === 'production') {
//   app.set('views', path.join(__dirname, 'build-views'))
// } else  {
//   app.set('views', path.join(__dirname, 'views'))
// }

app.set('views', path.join(__dirname, 'views'))


// in production always use template caching
// here we can use swig template caching instead of express's


if (app.get('env') === 'production') {
  // using express cacheing- swig cache throws error, easiest fix is use express instead..only need to use one or the other
  //swig cache
  swig.setDefaults({ cache:false })
  //express cache
  app.set('view cache', false)
} else  {
  // swig cache  
  swig.setDefaults({ cache: false })
  //express cache
  app.set('view cache', false)
}



app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/*
 * Express middlewares
 */

//app.use(compress())
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
;

  app.use(express.static(path.join(__dirname, 'public')))


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
