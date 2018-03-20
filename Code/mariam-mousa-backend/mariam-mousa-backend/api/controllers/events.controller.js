var mongoose = require('mongoose');
var Events = mongoose.model('Events');



module.exports.add = function (req, res, next) {
    console.log('adding new event');

    try {
        var title = req.body.title;
        var description = req.body.description;
        var facebookLink = req.body.facebookLink;
        var googleFormsLink = req.body.googleFormsLink;
        var categoryStyleClass = req.body.categoryStyleClass;
        var imagePath = req.body.imagePath;
        var date = req.body.date;

        console.log("Starting to insert + " + JSON.stringify(req.body));

        Events.create({
            title: title,
            description: description,
            facebookLink: facebookLink,
            googleFormsLink: googleFormsLink,
            categoryStyleClass: categoryStyleClass,
            imagePath: imagePath,
            date: date

        }, function (err, event) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('event created' + event);
                res.status(201).json(event);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.eventsGetAll = function (req, res) {


    console.log('GET the events');
    console.log(req.query);
    if (req.query.maxEvents && parseInt(req.query.maxEvents)) {
        console.log("Got Max Events to fetch :" + req.query.maxEvents)
        Events
            .find().limit(parseInt(req.query.maxEvents))
            .exec(function (err, events) {
                console.log("Found events", events.length);
                res
                    .json(events);
            });
    } else {

        Events
            .find()
            .exec(function (err, events) {
                console.log("Found events", events.length);
                res
                    .json(events);
            });
    }

};

module.exports.deleteEvent = function (req, res) {


    console.log("deleting Event");
    Events.remove({ _id: req.body._id }, function (err) {
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


module.exports.eventsGetOne = function (req, res) {
    var id = req.query.id;
    console.log('GET Event by ID:', id);

    Events
        .findOne({ _id: id })
        .exec(function (err, event) {
            if (err) {
                console.log("cannot get event =>" + err)
                res.status(400).json(err);
            } else {
                console.log("event found " + JSON.stringify(event));
                res
                    .status(200)
                    .json(event);
            }
        });

};
