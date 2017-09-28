var nodemailer = require('nodemailer');
var config = require('../data/config.js')



module.exports.sendBookingEmail = function(req, res) {

    var mailOptions = {
        from: config.BOOKING_FROM_MMEmail,
        to: config.BOOKING_TO_MMEmail,
        subject: config.BOOKING_SUBJECT,
        text: req.body.message
    };


    var funcResponse = sendEmail(mailOptions);
    if (funcResponse.error) {
        res
            .status(500)
            .json(funcResponse.error);

    } else {
        res
            .status(200)
            .json(funcResponse.info);
    }
};

module.exports.sendAcceptEmail = function(req, res) {

    var mailOptions = {
        from: config.ACC_REJ_FROM_MMEmail,
        to: req.body.email,
        subject: config.ACC_SUBJECT,
        text: 'Dear ' + req.body.name + ', \r ' + config.ACC_MES + '. Awaiting you on ' + req.body.date +
            ' at ' + req.body.timeslot + '. \r \r Sincerely \r Mariam Moussa Coaching team'
    };
    var funcResponse = sendEmail(mailOptions);
    if (funcResponse.error) {
        res
            .status(500)
            .json(funcResponse.error);

    } else {
        res
            .status(200)
            .json(funcResponse.info);
    }
};

module.exports.sendRejectEmail = function(req, res) {

    var mailOptions = {
        from: config.ACC_REJ_FROM_MMEmail,
        to: req.body.email,
        subject: config.REJ_SUBJECT,
        text: 'Dear ' + req.body.name + ', \r ' + config.REJ_MES + ' on ' + req.body.date +
            ' at ' + req.body.timeslot + '. \r \r Sincerely \r Mariam Moussa Coaching team.'
    };


    var funcResponse = sendEmail(mailOptions);
    if (funcResponse.error) {
        res
            .status(500)
            .json(funcResponse.error);

    } else {
        res
            .status(200)
            .json(funcResponse.info);
    }

};




var sendEmail = function(mailOptions) {
    var funcResponse = {};
    // var transporter = nodemailer.createTransport({
    //     host: 'localhost',
    //     port: 25,
    //     secure: true,
    //     auth: {
    //         user: 'mina',
    //         pass: 'mina@123'
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {

            user: config.MMEmail,
            pass: config.MMEmail_PASSWORD
        }
    });




    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("errorrrr===========" + error);
            // res
            //     .status(500)
            //     .json(error);

            funcResponse.state = 'fail';
            funcResponse.error = error;


        } else {
            console.log('Email sent: ' + info.response);
            // res
            //     .status(200)
            //     .json(info.response);
            funcResponse.state = 'success';
            funcResponse.info = info.response;
        }


    });
    return funcResponse;
}