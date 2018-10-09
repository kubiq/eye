"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var path = require("path");
var socketIO = require("socket.io");
var http = require("http");
var index_1 = require("./routes/index");
var services_1 = require("./routes/services");
var services_service_1 = require("./services/services.service");
var operators_1 = require("rxjs/operators");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var service = new services_service_1.ServicesService();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.router);
app.use('/api/services', services_1.router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
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
// This is what the socket.io syntax is like, we will work this later
io.on('connection', function (socket) {
    console.log('User connected');
    socket.emit('services', service.value);
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
service.servers$.pipe(operators_1.debounceTime(1e3)).subscribe(function (services) { return io.emit('services', services); });
server.listen(3000, function () {
    console.log('App started on port 3000');
});
