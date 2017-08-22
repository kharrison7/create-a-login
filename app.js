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
const data = require('./items.js');
const session = require('express-session');
// Creates and includes a file system (fs) module
const fs = require('fs');
// Create authorization session
let authorizedSession = "";
// Create app
let app = express();
// Set app to use bodyParser() middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
// Sets the view engine and router.
app.engine('mustache', mustacheExpress());
app.set('views', ['./views','./views/admin']);
app.set('view engine', 'mustache');
app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use(express.static(__dirname + '/public'));

// This makes the signup page work.
const signupRouter = require ("./public/routes/signup");
app.use("/signup", signupRouter); //This assigns the file to the route.

// This takes the user to the sign up page.
app.post("/signuppageredirect", function (req, res) {
  authSession = "";
  req.login = undefined;
  res.redirect('/signup');
});

// This currently takes the user to the userlist.
app.post("/signup", function (req, res) {
  res.render('userlist');
});

//Login Page
app.post("/login", function (req, res) {
  console.log("Data Posted");
  // This finds the un and pw from the submitted form.
  let username = req.body.username;
  let password = req.body.password;
  // This finds the username in user.js
  let user = userJS.find(username);
  // If username isn't found redirect.
  if (userJS.find(username) === undefined){
    res.redirect('/login');
  }
  else {
    // If the password is correct.
    if (user.password === password){
      console.log(user.password);
      authorizedSession = username;
      req.login = username;
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
  }
});

// This controls the localhost page.
app.get("/", function (req, res) {
  // This is the initial redirect.
  if (authorizedSession === ""){
    // console.log("initial redirect");
    res.redirect('/login');
    return;
  }
  else {
  // console.log("Else Here");
  }
  console.log(' ' + authorizedSession);
  // This brings up the index.mustache HTML and gives mustache a value for username.
  res.render('index', {username: authorizedSession});
});

// This allows for a logout.
app.post("/logout", function (req, res) {
  // This resets values and redirects.
  authSession = "";
  req.login = undefined;
  res.redirect('/login');
});


// These functions are based on the tutorial video series.
// This runs a test middleware function that requests the date in dev tools.
app.get('/', function(req, res, next){
  let date = new Date();
  res.header('Request-Date', date);
  console.log("Middleware Executed");
  next();
});

// This finds the user landry in the user.js file.
app.get('/landry', function(req, res){
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
