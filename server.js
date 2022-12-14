const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();

require("./config/database")

const app = express();

app.use(logger('dev'));
app.use(express.json());

//Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
//dirname  is a reserved keyword in JS for your absolute path at the current moment from your root directory (mern-infrastructure-sei-cafe)
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
//this is how we get our react application to be served from the express server.  VERY IMPORTANT!! (make  sure 'build' is in strings):
app.use(express.static(path.join(__dirname, 'build')));

//A single "catch all" route is required to serve the index.html when any non-AJAX "API" request is received by the Express app:
app.use(express.static(path.join(__dirname, 'build')));

// Place API ROUTES here, BEFORE the "catch all" route (very important to put ahead of catch all).
app.use('/api/users', require('./routes/api/users'));

// The following "catch all" route (note the *) is necessary
// to return the index.html ('/*') on all non-AJAX requests
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server on port 3000
const PORT = process.env.PORT || 3001;

//so our server actually runs and listens for incoming requests:
app.listen(PORT, function () {
    console.log(`Express app running on port ${PORT}`)
});