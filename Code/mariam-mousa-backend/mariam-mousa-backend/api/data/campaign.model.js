var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true


    },
    link: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

mongoose.model('Campaign', campaignSchema, 'campaign');
mongoose.model('SelectedCampaigns', campaignSchema, 'selectedcampaigns');