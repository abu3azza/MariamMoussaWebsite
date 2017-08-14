var express = require('express');
var router = express.Router();

var ctrlSite = require('../controllers/site.controllers.js');
var ctrlEmail = require('../controllers/email.controller.js');

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
    .route('/sendemail')
    .post(ctrlEmail.sendEmail);

// router
//     .route('/delete')
//     .put(ctrlSite.delete);

module.exports = router;