var mongoose = require('mongoose');
var Programs = mongoose.model('Programs');
var SelectedPrograms = mongoose.model('SelectedPrograms');



module.exports.add = function(req, res, next) {
    console.log('adding new program');

    try {
        var title = req.body.title;
        var videoLink = req.body.videoLink;
        var path = req.body.path;
        var description = req.body.description;

        console.log("o-o-o-o-o-o-o-o-o" + title + "0-0-0-0-0-00--00--00-" + videoLink +
            "0-0-0-0-0-00--00--00-" + path + "o-o-o-o-o-o-o-o-o" + description);

        Programs.create({
            title: title,
            videoLink: videoLink,
            path: path,
            description: description

        }, function(err, prog) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('program created' + prog);
                res.status(201).json(prog);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.programsGetAll = function(req, res) {


    console.log('GET the programs');
    console.log(req.query);

    Programs
        .find()
        .exec(function(err, programs) {
            console.log("Found programs", programs.length);
            res
                .json(programs);
        });

};

module.exports.addSelectedPrograms = function(req, res, next) {
    console.log('adding new selected Programs');


    try {
        var title = req.body.title;
        var videoLink = req.body.videoLink;
        var path = req.body.path;
        var description = req.body.description;

        console.log("o-o-o-o-o-o-o-o-o" + title + "0-0-0-0-0-00--00--00-" + videoLink +
            "0-0-0-0-0-00--00--00-" + path + "o-o-o-o-o-o-o-o-o" + description);

        SelectedPrograms.create({
            title: title,
            videoLink: videoLink,
            path: path,
            description: description

        }, function(err, prog) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('selected Program created' + prog);
                res.status(201).json(prog);
            }
        });
    } catch (next) {

    }
};
module.exports.programsGetSelected = function(req, res) {


    console.log('GET the selected Programs');
    console.log(req.query);

    SelectedPrograms
        .find()
        .exec(function(err, programs) {
            console.log("Found programs", programs.length);
            res
                .json(programs);
        });

};
module.exports.deleteProgram = function(req, res) {


    console.log("deleting Program");
    Programs.remove({ _id: req.body._id }, function(err) {
        if (err) {
            console.log("cannot delete =>" + err)
            res.status(400).json(err);
        } else {
            res.status(201).json({
                message: 'deleted '
            });

        }
    });

};
module.exports.deleteSelectedProgram = function(req, res) {


    console.log("deleting selected Program");
    SelectedPrograms.remove({ _id: req.body._id }, function(err) {
        if (err) {
            console.log("cannot delete =>" + err)
            res.status(400).json(err);
        } else {
            res.status(201).json({
                message: 'deleted '
            });

        }
    });

};

module.exports.programsGetOne = function(req, res) {
    var id = req.query.id;
    console.log('GET ProgramId', id);

    SelectedPrograms
        .findById(id)
        .exec(function(err, prog) {
            if (err) {
                console.log("cannot get program =>" + err)
                res.status(400).json(err);
            } else {
                res
                    .status(200)
                    .json(prog);
            }
        });

};