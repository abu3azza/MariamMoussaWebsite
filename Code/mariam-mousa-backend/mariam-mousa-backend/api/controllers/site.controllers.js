var dbconn = require('../data/dbconnection.js');
var mongo = require('mongodb');
var JSON = require('json');
var parser = require('json-parser');


module.exports.getAllReservations = function(req, res) {

    var db = dbconn.get();
    var collection = db.collection('reservations');

    console.log("db", db);
    console.log('GET the reservations');
    console.log(req.query);

    collection.find().toArray(function(err, returnData) {
        console.log("returnData" + returnData);
        res
            .status(200)
            .json(returnData);
    });
};

module.exports.getFreeSlots = function(req, res) {

    var db = dbconn.get();
    var collection = db.collection('reservations');
    // var slots = ["slot 1", "slot 2", "slot 3", "slot 4"];
    var slots = [];
    //Sunday
    slots[0] = [{ 'id': '1', 'name': "9:00 AM - 10:00 AM", 'startHour': '9' },
        { 'id': '2', 'name': "1:00 PM - 2:00 PM", 'startHour': '13' },
        { 'id': '3', 'name': "2:00 PM - 3:00 PM", 'startHour': '14' },
        { 'id': '4', 'name': "5:00 PM - 6:00 PM", 'startHour': '17' }
    ];
    //Monday
    slots[1] = [{ 'id': '1', 'name': "9:00 AM - 10:00 AM", 'startHour': '9' },
        { 'id': '2', 'name': "1:00 PM - 2:00 PM", 'startHour': '13' },
        { 'id': '3', 'name': "2:00 PM - 3:00 PM", 'startHour': '14' },
        { 'id': '4', 'name': "5:00 PM - 6:00 PM", 'startHour': '17' },
        { 'id': '5', 'name': "6:00 PM - 7:00 PM", 'startHour': '18' }
    ];
    //Tuesday
    slots[2] = [{ 'id': '1', 'name': "9:00 AM - 10:00 AM", 'startHour': '9' },
        { 'id': '2', 'name': "1:00 PM - 2:00 PM", 'startHour': '13' },
        { 'id': '3', 'name': "2:00 PM - 3:00 PM", 'startHour': '14' },
        { 'id': '4', 'name': "5:00 PM - 6:00 PM", 'startHour': '17' },
        { 'id': '5', 'name': "9:00 PM - 10:00 PM", 'startHour': '21' }
    ];
    //Wednesday
    slots[3] = [{ 'id': '1', 'name': "9:00 AM - 10:00 AM", 'startHour': '9' },
        { 'id': '2', 'name': "1:00 PM - 2:00 PM", 'startHour': '13' },
        { 'id': '3', 'name': "2:00 PM - 3:00 PM", 'startHour': '14' },
        { 'id': '4', 'name': "5:00 PM - 6:00 PM", 'startHour': '17' }
    ];
    //Thrusday
    slots[4] = [{ 'id': '1', 'name': "9:00 AM - 10:00 AM", 'startHour': '9' },
        { 'id': '2', 'name': "1:00 PM - 2:00 PM", 'startHour': '13' },
        { 'id': '3', 'name': "2:00 PM - 3:00 PM", 'startHour': '14' },
        { 'id': '4', 'name': "5:00 PM - 6:00 PM", 'startHour': '17' }
    ];
    //
    console.log("db", db);
    console.log('GET the slots');
    console.log(req.query);
    var date;
    if (req.query && req.query.date) {
        date = req.query.date;
    }
    // 0 = Sunday :
    console.log("Date==>" + date);
    var dateObj = new Date(date);
    var dayOfWeek = dateObj.getDay();
    var selectedDaySlots = slots[dayOfWeek];
    var query = { 'date': date };
    collection.find(query).toArray(function(err, returnData) {
        console.log("returnData" + returnData.toString());
        if (selectedDaySlots) {
            for (var i = 0; i < selectedDaySlots.length; i++) {
                //Do something
                returnData.forEach(function(reservationRecord) {
                    console.log("slot id = " + selectedDaySlots[i].id + "timeslot id =" + reservationRecord.timeslot.id);

                    if (selectedDaySlots[i].id == reservationRecord.timeslot.id) {
                        console.log("inside if" + i);
                        selectedDaySlots.splice(i, 1);
                    }
                });
            }
        }

        res
            .status(200)
            .json(selectedDaySlots);
    });
};



module.exports.updateReject = function(req, res) {

    var db = dbconn.get();
    var collection = db.collection('reservations');
    console.log("db", db);
    console.log('Update the reservations with rejection');
    console.log(req.query);
    var selectorId;
    if (req.query && req.query.id) {
        selectorId = req.query.id;
    }
    var o_id = new mongo.ObjectID(selectorId);
    var myquery = { '_id': o_id };
    var newvalues = { $set: { case: "Rejected" } };
    collection.updateOne(myquery, newvalues, function(err, resultData) {
        if (err) throw err;
        console.log("1 record updated");
        res
            .status(200)
            .json(resultData);
    });

};

module.exports.updateAccept = function(req, res) {

    var db = dbconn.get();
    var collection = db.collection('reservations');
    console.log("db", db);
    console.log('Update the reservations with Acception');
    console.log(req.query);
    var selectorId;
    if (req.query && req.query.id) {
        selectorId = req.query.id;
    }
    var o_id = new mongo.ObjectID(selectorId);
    var myquery = { '_id': o_id };
    var newvalues = { $set: { case: "Accepted" } };
    collection.updateOne(myquery, newvalues, function(err, resultData) {
        if (err) throw err;
        console.log("1 record updated");
        res
            .status(200)
            .json(resultData);
    });

};

module.exports.newReservation = function(req, res) {
    console.log("POST new Reservation");
    var db = dbconn.get();
    var collection = db.collection('reservations');
    var newReservation;
    console.log(req.body);
    if (req.body && req.body.firstname && req.body.lastname &&
        req.body.email && req.body.date && req.body.phone &&
        req.body.country && req.body.timeslot
    ) {
        newReservation = req.body;
        var x = parser.parse(newReservation.timeslot);
        newReservation.timeslot = x;
        newReservation.case = "Pending";
        // newReservation.date = newReservation.date;
        collection.insertOne(newReservation, function(err, response) {
            console.log("reservation added", response);
            console.log("reservation added", response.ops);
            res
                .status(201)
                .json(response.ops);
        });

    } else {
        console.log("Data missing from body");
        res
            .status(400)
            .json({ message: "Required data missing from body. Request Body: " + req.body });
    }

};