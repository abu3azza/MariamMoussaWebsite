var mongoose = require('mongoose');
var Articles = mongoose.model('Articles');
var SelectedArticles = mongoose.model('SelectedArticles');



module.exports.add = function (req, res, next) {
    console.log('adding new article');

    try {
        var title = req.body.title;
        var description = req.body.description;
        var miniDescription = req.body.miniDescription;
        var writtenBy = req.body.writtenBy;
        var publishedIn = req.body.publishedIn;
        var publishDate = req.body.publishDate;
        var imagePath = req.body.imagePath;

        console.log("Starting to insert + " + JSON.stringify(req.body));

        Articles.create({
            title: title,
            description: description,
            miniDescription: miniDescription,
            writtenBy: writtenBy,
            publishedIn: publishedIn,
            publishDate: publishDate,
            imagePath: imagePath

        }, function (err, article) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('article created' + article);
                res.status(201).json(article);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.articlesGetAll = function (req, res) {


    console.log('GET the articles');
    console.log(req.query);

    Articles
        .find()
        .exec(function (err, articles) {
            console.log("Found articles", articles.length);
            res
                .json(articles);
        });

};

module.exports.addSelectedArticles = function (req, res, next) {
    console.log('adding new selected articles');


    try {
        var title = req.body.title;
        var description = req.body.description;
        var miniDescription = req.body.miniDescription;
        var writtenBy = req.body.writtenBy;
        var publishedIn = req.body.publishedIn;
        var publishDate = req.body.publishDate;
        var imagePath = req.body.imagePath;

        console.log("Starting to insert + " + JSON.stringify(req.body));

        SelectedArticles.create({
            title: title,
            description: description,
            miniDescription: miniDescription,
            writtenBy: writtenBy,
            publishedIn: publishedIn,
            publishDate: publishDate,
            imagePath: imagePath

        }, function (err, databaseResp) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('selected Article created' + databaseResp);
                res.status(201).json(databaseResp);
            }
        });
    } catch (next) {

    }
};
module.exports.articlesGetSelected = function (req, res) {


    console.log('GET the selected Articles');
    console.log(req.query);

    SelectedArticles
        .find()
        .exec(function (err, articles) {
            console.log("Found Articles", articles.length);
            res
                .json(articles);
        });

};
module.exports.deleteArticle = function (req, res) {


    console.log("deleting Article");
    Articles.remove({ _id: req.body._id }, function (err) {
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
module.exports.deleteSelectedArticle = function (req, res) {


    console.log("deleting selected Article");
    SelectedArticles.remove({ _id: req.body._id }, function (err) {
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

module.exports.articlesGetOne = function (req, res) {
    var id = req.query.id;
    console.log('GET Article by ID:', id);

    SelectedArticles
        .findById(id)
        .exec(function (err, article) {
            if (err) {
                console.log("cannot get article =>" + err)
                res.status(400).json(err);
            } else {
                res
                    .status(200)
                    .json(article);
            }
        });

};