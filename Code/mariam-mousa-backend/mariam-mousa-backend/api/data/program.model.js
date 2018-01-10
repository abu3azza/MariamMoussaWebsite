var mongoose = require('mongoose');

var programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoLink: {
        type: String
    },
    description: {
        type: String
    },
    path: {
        type: String
    }
});

mongoose.model('Programs', programSchema, 'programs');
mongoose.model('SelectedPrograms', programSchema, 'selectedprograms');