var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var multer = require('multer');

var app = express();

/*var logger= function (req,res,next) {
  console.log('Logging...');
  next();
}
app.use(logger);*/


//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname,'public')));


app.get('/', function(req,res){
  var title = 'customers';
  res.render('index',{
    title:'customers'
  });
});

app.listen(3000, function(){
 // console.log('hellloooo');
})
