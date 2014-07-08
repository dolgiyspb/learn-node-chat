var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var config = require('./config');
var schema = require('./lib/createSchema');
var mongoose = require("./lib/mongoose");
var app = express();
var errors = require('./lib/errors');

var passport= require("./lib/auth-configuration");
var flash = require("connect-flash");
var setUser = require("./middlewares/setUser");
var sessionStore = require("./lib/sessionStore");

app.set("port", config.get("port"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret : config.get("session:secret"),
    store :  sessionStore
}));
app.use(flash());

app.use(passport.passport.initialize());
app.use(passport.passport.session());
app.use(setUser);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);







/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new errors.HttpError(404);
    next(err);
});

/// error handlers

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if(res.req.headers["x-requested-with"] === 'XMLHttpRequest'){
        res.json( { error : err.message } );
    }else {
        res.render('error', {
            message: err.message,
            error: (app.get('env') === 'development' ? err : {})
        });
    }
});



module.exports = app;
