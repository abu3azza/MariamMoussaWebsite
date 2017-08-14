var nodemailer = require('nodemailer');



module.exports.sendEmail = function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nadernaguibmoh@gmail.com',
            pass: 'nader0181251267'
        }
    });

    var mailOptions = {
        from: 'nadernaguibmoh@gmail.com',
        to: 'mina.kahil@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was not very easy!'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }

        res
            .status(200)
            .json(info.response);
    });
};