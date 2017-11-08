var nodemailer = require('nodemailer');
var config = require('../data/config.js');
var JSON = require('json');
var parser = require('json-parser');


module.exports.sendBookingEmail = function (req, res) {

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

module.exports.sendAcceptEmail = function (req, res) {

    var mailOptions = {
        from: config.ACC_REJ_FROM_MMEmail,
        to: req.body.email,
        subject: config.ACC_SUBJECT,
        text: 'Dear ' + req.body.name + ', \r' + 'Congratulations on taking your first step towards investing in yourself!' +
        ' \rYour sample session has been confirmed on ' + req.body.date + ' ' + (req.body.timeslot || '')
        + '. \r\rThe sample session is carried by phone. I will be waiting for your call at the exact time of the session.' +
        'The number you should call is 01222318990.' +
        '\r\rLooking forwards to coaching you! \r\r'
        + 'Best Regards,' +
        '\rMariam Moussa, CPCC, ACC \r'
        + ' Certified Personal & Professional Co-Active Coach'
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

module.exports.sendRejectEmail = function (req, res) {

    var mailOptions = {
        from: config.ACC_REJ_FROM_MMEmail,
        to: req.body.email,
        subject: config.REJ_SUBJECT,
        text: 'Dear ' + req.body.name + ', \r\r' + 'Congratulations on taking your first step towards investing in yourself!'
        + '\r\r'
        + 'As eager I am to start coaching, as sorry I am that the time slot you have chosen, unfortunately, won\'t be possible. \r\r'
        + 'You could register for a new slot on the website or we could reach a consensus directly here.\r\r'
        + 'Thank you for understanding and looking forwards to our session together!\r\r'
        + 'Best Regards, \rMariam Moussa, CPCC, ACC \r'
        + 'Certified Personal & Professional Coach'
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




var sendEmail = function (mailOptions) {
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




    transporter.sendMail(mailOptions, function (error, info) {
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