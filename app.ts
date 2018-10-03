import { createError } from 'http-errors';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as socketIO from 'socket.io';
import * as http from "http";
import { router as indexRouter } from './routes/index';
import { router as servicesRouter } from './routes/services';
import { ServicesService } from "./services/services.service";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const service = new ServicesService();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/services', servicesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});

service.servers$.subscribe((services) => io.emit('services', services));

server.listen(3000, () => {
  console.log('App started on port 3000');
});
