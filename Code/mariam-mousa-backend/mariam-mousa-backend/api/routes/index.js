var express = require('express');
var router = express.Router();

var ctrlSite = require('../controllers/site.controllers.js');
var ctrlEmail = require('../controllers/email.controller.js');
var ctrlMailChimp = require('../controllers/mailchimp.controller.js');
var ctrlUsers = require('../controllers/user.controller.js');
var ctrlBrochure = require('../controllers/brochure.controller.js');
var ctrlUpload = require('../controllers/fileupload.controller.js');
var cors = require('cors');

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "OPTIONS");
    // res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8082");

    next();
});

router
    .route('/newreservation')
    .post(ctrlSite.newReservation);

router
    .route('/getallreservations', cors())
    .get(ctrlSite.getAllReservations), cors();

router
    .route('/getfreeslots')
    .get(ctrlSite.getFreeSlots);

router
    .route('/updatereject')
    .put(ctrlSite.updateReject);

router
    .route('/updateaccept')
    .put(ctrlSite.updateAccept);

router
    .route('/sendbookingmail')
    .post(ctrlEmail.sendBookingEmail);

router
    .route('/sendacceptmail')
    .post(ctrlEmail.sendAcceptEmail);

router
    .route('/sendrejectmail')
    .post(ctrlEmail.sendRejectEmail);

router
    .route('/mailchimp')
    .get(ctrlMailChimp.addUserToList);

// router
//     .route('/delete')
//     .put(ctrlSite.delete);

router
    .route('/register')
    .post(ctrlUsers.register);

router
    .route('/login')
    .post(ctrlUsers.login);

router
    .route('/download')
    .get(ctrlBrochure.download);

router
    .route('/upload')
    .post(ctrlUpload.upload);



module.exports = router;