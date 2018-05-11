var mongoose = require('mongoose');
var config = require('../data/config.js');
var schema = mongoose.schema;
var auth = mongoose.auth;
// var dburl = 'mongodb://admin:password@localhost:27019/mariammousa2';
var dburl = 'mongodb://@mariam-moussa.com:27019/mariammousa2?authSource=admin';
var retry = null;
const options = {
    auth:{user:'mmoussa', password:'mmoussa@12123'},
    user:'mmoussa',
    pass:'mmoussa@12123',
    useMongoClient: true,
    poolSize: 3, // Maintain up to 10 socket connections
    loggerLevel: 'info'
  };
mongoose.connect(dburl,options);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});



// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('App termination (SIGINT)', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('App termination (SIGTERM)', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS

require('./users.model');
require('./campaign.model');
require('./program.model');
require('./article.model');
require('./videos.model');
require('./testimonials.model');
require('./event.model');