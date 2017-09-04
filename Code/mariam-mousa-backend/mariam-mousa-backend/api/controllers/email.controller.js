var nodemailer = require('nodemailer');
var config = require('../data/config.js')



module.exports.sendBookingEmail = function(req, res) {

    var mailOptions = {
        from: config.BOOKING_FROM_MMEmail,
        to: config.BOOKING_TO_MMEmail,
        subject: config.BOOKING_SUBJECT,
        text: req.body.message
    };
    sendEmail(mailOptions, this.res);
};

module.exports.sendAcceptEmail = function(req, res) {

    var mailOptions = {
        from: config.ACC_REJ_FROM_MMEmail,
        to: req.body.to,
        subject: config.ACC_SUBJECT,
        text: 'Dear ' + req.body.to + ', /r ' + config.ACC_MES
    };
    sendEmail(mailOptions, this.res);
};

module.exports.sendRejectEmail = function(req, res) {

    var mailOptions = {
        from: config.ACC_REJ_FROM_MMEmail,
        to: req.body.to,
        subject: config.REJ_SUBJECT,
        text: 'Dear ' + req.body.to + ', /r ' + config.REJ_MES
    };
    sendEmail(mailOptions, this.res);
};




var sendEmail = function(mailOptions, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.MMEmail,
            pass: config.MMEmail_PASSWORD
        }
    });


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res
                .status(500)
                .json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res
                .status(200)
                .json(info.response);
        }


    });

}