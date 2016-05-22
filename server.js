
/**
 * Module dependencies.
 */

var express = require('express')
  , BlackLion = require('./routes/BlackLion')
  , http = require('http')
  , path = require('path')
  , studentDb = require('mysql')
  , mailer = require('nodemailer')
  , bodyParser = require('body-parser');


require('dotenv').config();

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//routes
app.get('/', BlackLion.home);
app.get('/KungFu', BlackLion.KungFu);
app.get('/TaiChi', BlackLion.TaiChi);

app.post('/enquire', BlackLion.enquire);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
