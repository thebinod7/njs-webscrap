const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

const app = express();

//const apiCategory = require('./routes/category');
const port = 4343;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Body parser middleware
// parse application/x-www-form-urlencoded.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session({secret: 'helloworld12345678', resave:false, saveUninitialized:false, cookie: { maxAge: 600000 }}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
app.use('/', require('./routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(port,function () {
    console.log('Server running at port:' + port);
});