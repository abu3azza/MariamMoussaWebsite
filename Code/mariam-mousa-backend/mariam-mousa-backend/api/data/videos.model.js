var mongoose = require('mongoose');

var videosSchema = new mongoose.Schema({
    HomeVideoLink: {
        type: String
    },
    TestimonialsVideoLink: {
        type: String
    }
});

mongoose.model('Videos', videosSchema, 'videos');