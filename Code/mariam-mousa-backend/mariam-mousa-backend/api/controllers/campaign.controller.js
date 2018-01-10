var mongoose = require('mongoose');
var Campaign = mongoose.model('Campaign');
var SelectedCampaigns = mongoose.model('SelectedCampaigns');



module.exports.add = function(req, res, next) {
    console.log('adding new Campaign');

    try {
        var title = req.body.title;
        var link = req.body.link;
        var path = req.body.path;

        console.log("o-o-o-o-o-o-o-o-o" + title + "0-0-0-0-0-00--00--00-" + link + "0-0-0-0-0-00--00--00-" + path);

        Campaign.create({
            title: title,
            link: link,
            path: path

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

module.exports.campaignsGetAll = function(req, res) {


    console.log('GET the hotels');
    console.log(req.query);

    Campaign
        .find()
        .exec(function(err, campaigns) {
            console.log("Found hotels", campaigns.length);
            res
                .json(campaigns);
        });

};

module.exports.addSelectedCampaigns = function(req, res, next) {
    console.log('adding new selected campaigns');


    try {
        var title = req.body.title;
        var link = req.body.link;
        var path = req.body.path;

        console.log("o-o-o-o-o-o-o-o-o" + title + "0-0-0-0-0-00--00--00-" + link + "0-0-0-0-0-00--00--00-" + path);

        SelectedCampaigns.create({
            title: title,
            link: link,
            path: path

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
module.exports.campaignsGetSelected = function(req, res) {


    console.log('GET the hotels');
    console.log(req.query);

    SelectedCampaigns
        .find()
        .exec(function(err, campaigns) {
            console.log("Found hotels", campaigns.length);
            res
                .json(campaigns);
        });

};
module.exports.deleteCampaign = function(req, res) {


    console.log("deleting campaign");
    Campaign.remove({ _id: req.body._id }, function(err) {
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
module.exports.deleteSelectedCampaign = function(req, res) {


    console.log("deleting selected campaign");
    SelectedCampaigns.remove({ _id: req.body._id }, function(err) {
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