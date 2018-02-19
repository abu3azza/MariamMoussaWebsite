var mongoose = require('mongoose');
var Videos = mongoose.model('Videos');



module.exports.updateHomePage = function(req, res, next) {
    console.log('updater home page  Video');

    try {
        var id = req.body._id;
        var HomeVideoLink = req.body.HomePageVideo;

        console.log("o-o-o-o-o-o-o-o-o" + HomeVideoLink + "o-o-o-o-o-o-o-o-o-o" + id);

        Videos.update({ _id: id }, { HomeVideoLink: HomeVideoLink }, function(err, video) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('Home page Video Updated ' + video);
                res.status(201).json(video);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.updateTestimonailsVideo = function(req, res, next) {
    console.log('updater home page  Video');

    try {
        var id = req.body._id;
        var TestimonialsVideoLink = req.body.TestimonialsVideoLink;

        console.log("o-o-o-o-o-o-o-o-o" + TestimonialsVideoLink + "o-o-o-o-o-o-o-o-o-o" + id);

        Videos.update({ _id: id }, { TestimonialsVideoLink: TestimonialsVideoLink }, function(err, video) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('Home page Video Updated ' + video);
                res.status(201).json(video);
            }
        });
    } catch (err) {
        console.log(err);
    }
};
module.exports.addVideos = function(req, res, next) {
    console.log('adding new Video ');


    try {
        var HomeVideoLink = req.body.HomePageVideo;
        var TestimonialsVideoLink = req.body.TestimonialsVideoLink;

        console.log('HomeVideoLink =' + HomeVideoLink + '  TestimonialsVideoLink' + TestimonialsVideoLink);

        Videos.create({
            HomeVideoLink: HomeVideoLink,
            TestimonialsVideoLink: TestimonialsVideoLink

        }, function(err, video) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('videos created' + video);
                res.status(201).json(video);
            }
        });
    } catch (next) {

    }
};

module.exports.videosGetAll = function(req, res) {


    console.log('GET the Videos');
    console.log(req.query);

    Videos
        .find()
        .exec(function(err, Videos) {
            console.log("Found programs", Videos.length);
            res
                .json(Videos);
        });

};


module.exports.deleteVideo = function(req, res) {


    console.log("deleting Video");
    Videos.remove({ _id: req.body._id }, function(err) {
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