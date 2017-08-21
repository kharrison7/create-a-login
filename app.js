//app.js code here.
// runs at http://localhost:3000/
// This requires all the modules and files.
let express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const userJS = require('./user.js');
const adminRouter = require('./public/routes/admin');
const loginRouter = require('./public/routes/login');
// const data = require('./items.js');

// Creates and includes a file system (fs) module
const fs = require('fs');

// Create app
let app = express();
// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sets the view engine and router.
app.engine('mustache', mustacheExpress());
app.set('views', ['./views','./views/admin']);
app.set('view engine', 'mustache');
app.use('/admin', adminRouter);
app.use('/login', loginRouter);

// app.use(express.static(__dirname + '/public'));
// app.use('/admin',adminRouter);

// This runs a test middleware function that requests the date in dev tools.
app.get('/', function(req, res, next){
  let date = new Date();
  res.header('Request-Date', date);
  console.log("Middleware Executed");
  next();
});

// This finds the user landry in the user.js file.
app.get('/', function(req, res){
  console.log("Basic get run!");
  let user = userJS.find('landry');
  res.send(user);
});

// This sends all the user data from the listen url.
app.get('/listen', function(req, res){
 res.send(userJS.all);
});

// This ties the file to the proper localhost.
app.listen(3000, function(){
  console.log('Started express application!')
});
