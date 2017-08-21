//app.js code here.
// runs at http://localhost:3000/
let express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const userJS = require('./user.js');
const adminRouter = require('./public/routes/admin');
// const data = require('./items.js');

// Creates and includes a file system (fs) module
const fs = require('fs');

// Create app
let app = express();
// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set('views', ['./views','./views/admin']);
app.set('view engine', 'mustache');
app.use('/admin',adminRouter);

// app.use(express.static(__dirname + '/public'));
// app.use('/admin',adminRouter);


// app.get('/admin', function(req, res){
//
//   res.render('index');
//   console.log("admin connected");
// });
//
//
// app.get('/admin/user-list', function(req, res){
//
//   res.render('index');
//   console.log("admin connected to list");
// });





app.get('/', function(req, res, next){
  console.log("Middleware Executed");
  next();
});


app.get('/', function(req, res){
  console.log("Basic get run!");
  let user = userJS.find('landry');
  res.send(user);
});

app.get('/listen', function(req, res){
 res.send(userJS.all);
});







app.listen(3000, function(){
  console.log('Started express application!')
});
