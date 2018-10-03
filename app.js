"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var index_1 = require("./routes/index");
var services_1 = require("./routes/services");
exports.app = express();
// view engine setup
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'hbs');
exports.app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use('/', index_1.router);
exports.app.use('/api/services', services_1.router);
// catch 404 and forward to error handler
exports.app.use(function (req, res, next) {
    next(http_errors_1.createError(404));
});
// error handler
exports.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.app.listen(3000);
