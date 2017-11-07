var nodemailer = require('nodemailer');
var config = require('../data/config.js');
var JSON = require('json');
var parser = require('json-parser');


module.exports.sendBookingEmail = function(req, res) {

    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.date);
    var timeSlot = parser.parse(req.body.timeslot);
    console.log(timeSlot.name);
    console.log(req.body.message);
    console.log(req.body.email);
    console.log(req.body.phone);
    var mailBody = "You have a pending reservation from " + req.body.firstname + " " + req.body.lastname +
        ".\r Reservation Date :" + req.body.date + "\r Time :" + timeSlot.name + "\r Reserver Phone :" + req.body.phone +
        "\r Reserver mail :" + req.body.email + "\r Reservation message :" + req.body.message + ".";
    var mailOptions = {
        from: config.BOOKING_FROM_MMEmail,
        to: config.BOOKING_TO_MMEmail,
        subject: config.BOOKING_SUBJECT,
        text: mailBody
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
        text: 'Dear ' + req.body.name + ', \r ' + config.ACC_MES + '. Awaiting you on ' 
        + req.body.date +
            ' ' + (req.body.timeslot || '') 
            + '\r\r Best Regards,\rMariam Moussa, CPCC, ACC\rCertified Personal & Professional Co-Active Coach'
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
            ' at ' + (req.body.timeslot || '') + '. \r \r Sincerely, \r Mariam Moussa Coaching team.'
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