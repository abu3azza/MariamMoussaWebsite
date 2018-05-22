var config = require('../data/config.js');
var MongoClient = require('mongodb').MongoClient;
//var dburl = 'mongodb://localhost:27017/mariammousa2';
var dburl = "mongodb://" + config.DB_USERNAME + ":" + config.DB_PASSWORD + "@127.0.0.1:27019/mariammousa2?authSource=admin";
var _connection = null;

var open = function() {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open");
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};