/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('ViewController', function($scope, $compile, $http, $route, uiCalendarConfig) {
    $scope.eventObject = {};
    $scope.freeReservationSlots = ["1", "2"];
    $scope.selectedSlot = "halsbala";
    $scope.showModal = false;
    $scope.buttonClicked = "";
    $scope.eventSources = [];
    $scope.events = [];

    function init() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getallreservations'
        }).then(function successCallback(response) {
            responseData = response.data;
            $scope.events.length = 0;
            angular.forEach(responseData,
                function(item) {
                    item.title = item.firstname;
                    var date = new Date(item.date);
                    date.setHours(item.timeslot.startHour);
                    date.toISOString();
                    item.start = date;
                    // alert(item.title+"----"+item.timeslot.startHour);
                    $scope.events.push(item);
                    // alert(item.title +"----"+item.start);
                });
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            alert("error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }


    function refreshCalendar() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getallreservations'
        }).then(function successCallback(response) {
            responseData = response.data;
            $scope.events.length = 0;
            angular.forEach($scope.events, function() {
                try {

                    $scope.events.splice(0, 1);

                } catch (err) {
                    alert(err);
                }
            });
            angular.forEach(responseData,
                function(item) {
                    item.title = item.firstname;
                    var date = new Date(item.date);
                    date.setHours(item.timeslot.startHour);
                    date.toISOString();
                    item.start = date;
                    // alert(item.title+"----"+item.timeslot.startHour);
                    $scope.events.push(item);
                    // alert(item.title +"----"+item.start);
                });
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            alert("error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    init();

    $scope.toggleModal = function(btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event', // an option!
        currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */

    /* event source that calls a function on every view switch */
    $scope.eventsF = function(start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
        callback(events);
    };

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
            { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
            { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
            { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function(event, jsEvent, view) {
        //$scope.alertMessage = (event.title + ' was clicked ');
        $scope.toggleModal("Reservation: " + event.title);
        $scope.eventObject.id = event._id;
        $scope.eventObject.name = event.title;
        $scope.eventObject.lastname = event.lastname;
        $scope.eventObject.coachingType = event.coachingType;
        $scope.eventObject.country = event.country;
        $scope.eventObject.phone = event.phone;
        $scope.eventObject.timeslot = event.timeslot;
        $scope.eventObject.email = event.email;
        $scope.eventObject.date = event.date;
        $scope.eventObject.case = event.case;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources, source) {
        var canAdd = 0;
        angular.forEach(sources, function(value, key) {
            if (sources[key] === source) {
                sources.splice(key, 1);
                canAdd = 1;
            }
        });
        if (canAdd === 0) {
            sources.push(source);
        }
    };
    /* add custom event*/
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame']
        });
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index, 1);
    };
    /* Change View */
    $scope.changeView = function(view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
        if (uiCalendarConfig.calendars[calendar]) {
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };
    /* Render Tooltip */
    $scope.eventRender = function(event, element, view) {
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 700,
            editable: true,
            header: {
                left: '',
                center: 'title',
                right: 'prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            //            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

    $scope.changeLang = function() {
        if ($scope.changeTo === 'Hungarian') {
            $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
            $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
            $scope.changeTo = 'English';
        } else {
            $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            $scope.changeTo = 'Hungarian';
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


    $scope.accept = function(event) {
        $http({
                url: 'http://207.154.226.195:3000/api/updateaccept?id=' + this.eventObject.id,
                method: "PUT"
                    //data: $.param(this.reservationObject),
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function successCallback(response) {
                //                    alert(response.data);
                $scope.toggleModal("Reservation: " + event.title);
                var maildata = {};

                maildata.to = this.eventObject.email;

                $http({
                        url: 'http://207.154.226.195:3000/api/sendacceptmail',
                        method: "POST",
                        data: $.param(this.maildata),
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function successCallback(response) {
                        alert("Email Sent successfully");
                        $route.reload();
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        alert("error" + response.data);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                alert("error" + response.data);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };

    $scope.reject = function(event) {
        $http({
                url: 'http://207.154.226.195:3000/api/updatereject?id=' + this.eventObject.id,
                method: "PUT"
                    //data: $.param(this.reservationObject),
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function successCallback(response) {
                $scope.toggleModal("Reservation: " + event.title);
                var maildata = {};
                maildata.to = this.eventObject.email;

                $http({
                        url: 'http://207.154.226.195:3000/api/sendrejectmail',
                        method: "POST",
                        data: $.param(this.maildata),
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function successCallback(response) {
                        alert("Email sent successfully");
                        $route.reload();

                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        alert("error" + response.data);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                alert("error" + response.data);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };
});