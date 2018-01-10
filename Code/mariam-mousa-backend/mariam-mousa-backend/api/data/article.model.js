var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    miniDescription: {
        type: String
    },
    writtenBy: {
        type: String
    },
    publishedIn: {
        type: String
    },
    publishDate: {
        type: String
    },
    imagePath: {
        type: String
    }
});

mongoose.model('Articles', articleSchema, 'articles');
mongoose.model('SelectedArticles', articleSchema, 'SelectedArticles');