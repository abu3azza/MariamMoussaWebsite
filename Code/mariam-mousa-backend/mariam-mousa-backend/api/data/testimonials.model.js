var mongoose = require('mongoose');

var testimonialsSchema = new mongoose.Schema({
    writer: {
        type: String
    },
    description: {
        type: String
    }
});

mongoose.model('Testimonials', testimonialsSchema, 'testimonials');