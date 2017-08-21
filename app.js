//app.js code here.
// runs at http://localhost:3000/
let express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
// const data = require('./items.js'); 

// Creates and includes a file system (fs) module
const fs = require('fs');

// Create app
let app = express();
// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));






app.listen(3000, function(){
  console.log('Started express application!')
});
