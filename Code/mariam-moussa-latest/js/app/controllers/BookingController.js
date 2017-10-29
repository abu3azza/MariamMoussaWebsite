app.controller('BookingController', function($scope, $http, $filter, $timeout) {
    $scope.reservationObject = {};
    $scope.freeReservationSlots = [];
    $scope.selectedSlot = "halsbala";
    $scope.showModal = false;
    $scope.buttonClicked = "";

    function init() {
        // $('#datepicker').datepicker();
    }
    init();


    $scope.getEmptySlots = function() {
        //        // alert("InsideGetAllEmptySlots");
        //        var oldDate = this.reservationObject.date;
        //        this.reservationObject.date.setHours(0, 0, 0, 0);

        //        // alert(this.reservationObject.date);

        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getfreeslots?date=' + $filter('date')(this.reservationObject.date, 'MM-dd-yyyy'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function successCallback(response) {
            var responseData = response.data;
            $scope.freeReservationSlots.length = 0;

            angular.forEach(responseData,
                function(item) {
                    $scope.freeReservationSlots.push(item);
                });
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // // alert("error" + JSON.stringify(response));
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };


    $scope.showAlert = function() {
        this.reservationObject.firstName = "Mina Karim";
        //        // alert("hwhwhwhwhwhw");
    };

    $scope.processDate = function(dt) {
        return
    };


    $scope.postReservation = function() {
        //        // alert(JSON.stringify(this.reservationObject));

        this.reservationObject.timeslot = angular.toJson(this.reservationObject.timeslot);
        //        this.reservationObject.date.setHours(0, 0, 0, 0);
        this.reservationObject.date = $filter('date')(this.reservationObject.date, 'MM-dd-yyyy');
        //        // alert("da el ana 3awzo" + this.reservationObject.timeslot);
        $http({
                url: 'http://207.154.226.195:3000/api/newreservation',
                method: "POST",
                data: $.param(this.reservationObject),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function successCallback(response) {
                //                    // alert(response.data);
                var maildata = {};
                maildata.message = $scope.reservationObject.message;
                $http({
                        url: 'http://207.154.226.195:3000/api/sendbookingmail',
                        method: "POST",
                        data: $.param(maildata),
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function successCallback(response) {
                        // // alert("Email Sent " + response.data);
                        $scope.toggleModal('Reservation Success');
                        $scope.reservationObject = {};
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        // // alert("error" + response.data);
                        $scope.toggleModal('Reservation Does Not Success');
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                consol.log("error" + response.data);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };


    $scope.toggleModal = function(btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };

    $scope.today = function() {
        this.reservationObject.date = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        this.reservationObject.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        //dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2050, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    //    function disabled(data) {
    //        var date = data.date,
    //                mode = data.mode;
    //        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };



    $scope.setDate = function(year, month, day) {
        this.reservationObject.date = new Date(year, month, day);
    };


    $scope.format = 'yyyy/MM/dd';


    $scope.popup1 = {
        opened: false
    };



    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
});



app.directive('modal', function() {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ buttonClicked }} </h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function(value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});