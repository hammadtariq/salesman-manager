/// <reference path="../../typings/tsd.d.ts" />
import express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var Firebase = require("firebase");
var mongoose = require("mongoose");
var cors = require('cors');
import Q = require("q");
var app:express.Express = express();
app.use(cors());



// uncomment after placing your favicon in /client
//app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, '../../client'));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../../client')));

// ---------- server require start  -------------//

require('./config')(app, mongoose, Firebase);
require('./models')(app, mongoose);
require('./db')(app, mongoose, Q);
require('./authController')(app, Firebase, Q);
require('./routes')(app, Firebase, Q);

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
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('404.html', {
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
