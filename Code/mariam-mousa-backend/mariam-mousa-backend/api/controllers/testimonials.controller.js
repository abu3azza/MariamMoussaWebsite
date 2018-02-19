var mongoose = require('mongoose');
var Testimonials = mongoose.model('Testimonials');



module.exports.add = function(req, res, next) {
    console.log('adding new Testimonials');

    try {
        var writer = req.body.writer;
        var description = req.body.description;

        console.log("o-o-o-o-o-o-o-o-o" + writer + "o-o-o-o-o-o-o-o-o" + description);

        Testimonials.create({
            writer: writer,
            description: description

        }, function(err, test) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('testimonial created' + test);
                res.status(201).json(test);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.testimonialsGetAll = function(req, res) {


    console.log('GET the testimonials');
    console.log(req.query);

    Testimonials
        .find()
        .exec(function(err, testimonials) {
            console.log("Found testimonials", testimonials.length);
            res
                .json(testimonials);
        });

};

module.exports.deleteTestimonial = function(req, res) {


    console.log("deleting Testimonial");
    Testimonials.remove({ _id: req.body._id }, function(err) {
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