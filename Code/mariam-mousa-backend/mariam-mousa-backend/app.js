require('./api/data/db.js');
require('./api/data/dbconnection.js').open();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./api/routes');

// Define the port to run on
app.set('port', 3000);

// Add middleware to console log every request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//error  handling  middleware


// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Add some routing
app.use('/api', routes);


// app.use(function(err, req, res, next) {

//     console.log("--------------ba2olak eh da el error el fel habdelar ha " + err);
// })

// process.on('uncaughtException', function(ex) {
//     // do something with exception
//     console.log("ba2olak eh----" + ex.stack);
//     process.exit(1);
// });

//xyz();
// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});

//not used currently
app.get('/getimgbydir/:img_name', function(req, res) {
    //calling the function from index.js class using routes object..
    res.sendFile('/Users/nadernaguib/MariamMoussaWebsite/Code/mariam-mousa-backend/mariam-mousa-backend/uploads/' + req.params.img_name, function(error) {
        if (error)
            console.log(error.message);
        else
            console.log('File transferd successfully.');
    })

});