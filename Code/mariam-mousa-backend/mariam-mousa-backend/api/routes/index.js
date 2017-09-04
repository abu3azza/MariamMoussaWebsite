var express = require('express');
var router = express.Router();

var ctrlSite = require('../controllers/site.controllers.js');
var ctrlEmail = require('../controllers/email.controller.js');
var ctrlMailChimp = require('../controllers/mailchimp.controller.js');
var ctrlUsers = require('../controllers/user.controller.js');


router
    .route('/newreservation')
    .post(ctrlSite.newReservation);

router
    .route('/getallreservations')
    .get(ctrlSite.getAllReservations);

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

module.exports = router;