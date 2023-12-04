var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
let test2Router = require('./routes/test2');
const getTableRouter = require('./routes/getTable');
const postTestRouter = require('./routes/postTest');
// const postTest2Router = require('./routes/postTest2');
const insertIntoRouter = require('./routes/insertInto');
const updateTableRouter = require('./routes/updateTable');
const updateMinusRouter = require('./routes/updateMinus');
const updatePriceRouter = require('./routes/updateprice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//All the routes are here in this chunk of code
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/test2', test2Router);
app.use('/getTable', getTableRouter);
app.use('/postTest', postTestRouter);
// app.use('/postTest2', postTest2Router);
app.use('/insertInto', insertIntoRouter);
app.use('/updateTable', updateTableRouter);
app.use('/updateMinus', updateMinusRouter);

app.use('/updateprice', updatePriceRouter);



//----------------------------------------------

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

module.exports = app;
