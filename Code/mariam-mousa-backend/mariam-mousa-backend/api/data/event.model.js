var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    facebookLink: {
        type: String
    },
    googleFormsLink: {
        type: String
    },
    categoryStyleClass: {
        type: String
    },
    date: {
        type: String
    },
    eventDetails: {
        type: String
    },
    imagePath: {
        type: String
    }
});

mongoose.model('Events', articleSchema, 'events');
