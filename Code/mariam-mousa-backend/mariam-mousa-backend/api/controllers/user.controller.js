var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');



module.exports.register = function(req, res, next) {
    console.log('registering');

    try {
        var username = req.body.username;
        var name = req.body.name || null;
        var password = req.body.password;

        console.log("o-o-o-o-o-o-o-o-o" + username + "0-0-0-0-0-00--00--00-" + password);

        User.create({
            username: username,
            name: name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        }, function(err, user) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('user created' + user);
                res.status(201).json(user);
            }
        });
    } catch (next) {

    }
};

module.exports.login = function(req, res, next) {
    try {


        console.log('logging in user');
        var username = req.body.username || null;
        var password = req.body.password || null;

        console.log("hawhawhawhawhawhaw" + username + "fasla" + password);
        User.findOne({
            username: username
        }).exec(function(err, user) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        console.log('user found' + user);
                        var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
                        res.status(200).json({ success: true, token: token });
                    } else {
                        console.log('user Unauthorized');
                        res.status(401).json('Unauthorized');
                    }
                } else {
                    console.log('User ' + username + ' not found!');
                    res.status(401).json('Unauthorized');
                }
            }
        })
    } catch (error) {
        console.log("ana la2et error msh 3aref a3ml be eh ^_^" + error);
    }
};
module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
        jwt.verify(token, 's3cr3t', function(error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};