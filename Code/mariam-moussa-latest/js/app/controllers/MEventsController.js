app.controller('MEventsController', ['Upload', '$window', '$http', "$rootScope", '$scope', 'marked', function (Upload, $window, $http, $rootScope, $scope, marked) {
    // alert("hi MEventsController");
    var vm = this;
    vm.newEvent = {};
    vm.categories = [];
    vm.file = {};
    vm.progress = {};
    vm.editor1 = "";
    $scope.markdownService = marked('#TEST');

    $scope.allEvents = [];
    $scope.eventSelection = { checkedEvents: [] };
    // $scope.selectedEvents = [];
    init();

    function init() {
        // alert("Starting Events Controller");
        vm.categories = [
            { description: "Webinar", styleClass: "webinars" },
            { description: "Workshop", styleClass: "workshops" },
            { description: "Day Event", styleClass: "dayEvents" },
            { description: "Program", styleClass: "programs" }
        ];
        var responseData;
        loadAllEvents();
        // var responseData2;

    }

    function loadAllEvents() {
        console.log("Loading events");
        $scope.allEvents = [];
        $scope.eventSelection.checkedEvents = [];
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/getEvents'
        }).then(function successCallback(response) {
            responseData = response.data;
            // alert("respnse data" + JSON.stringify(responseData));
            angular.forEach(responseData,
                function (item) {
                    $scope.allEvents.push(item);
                });

        }, function errorCallback(response) {
            alert("error" + response);

        });
    }


    $scope.checkAllEvents = function () {
        $scope.eventSelection.checkedEvents = angular.copy($scope.allEvents);
    };
    $scope.uncheckAllEvents = function () {
        $scope.eventSelection.checkedEvents = [];
    };

    $scope.deleteSelectedEvents = function () {
        var checkedEventsIds = [];
        alert(JSON.stringify($scope.eventSelection.checkedEvents));
        for (var i = 0; i < $scope.eventSelection.checkedEvents.length; i++) {
            checkedEventsIds.push($scope.eventSelection.checkedEvents[i]._id);
        }
        alert(JSON.stringify(checkedEventsIds));

        var events = { events: checkedEventsIds };
        $http({
            url: 'http://localhost:3000/api/deleteEvents',
            method: "POST",
            data: angular.toJson(events),
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (response) {
                // console.log(response);
                var responseData = response.data;
                // alert("respnse data" + JSON.stringify(responseData));
                $scope.allEvents = [];
                angular.forEach(responseData,
                    function (item) {
                        $scope.allEvents.push(item);
                    });
                alert("Deletion Successfull");

            }).catch(function (error) {
                console.log(error);
                alert("Deletion Failed");
            });
        // }
    };
    //=================Editor Section functions ================
    $scope.convertMarkdown = function () {
        vm.convertedMarkdown = marked(vm.markdown);
    }
    $scope.onFullScreenExitCallback = function (e) {
        e.hidePreview();
    }
    //==================Editor End ================
    $scope.submit = function () { //function to call on form submit
        // alert("here");
        var result = document.getElementsByClassName("markdown");
        vm.newEvent.eventDetails = result[0].innerHTML;
        // alert("Inserted Event : " + JSON.stringify(vm.newEvent));
        if (vm.eventForm.file.$valid && vm.file) { //check if from is valid
            // alert("Uploading");
            vm.uploadAndSubmitEvent(vm.file); //call upload function
        } else {
            alert("Image not valid");
        }

    }
    vm.uploadAndSubmitEvent = function (file) {
        // alert("File: =>" + JSON.stringify(file));
        // alert("Starting upload and Submit Event")
        Upload.upload({
            url: 'http://localhost:3000/api/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                // $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                vm.addEvent(resp.data.imgname);

            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            // $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
        // alert("finish upload ");
    };

    vm.addEvent = function (imgname) {
        vm.newEvent.imagePath = imgname;
        $window.alert(JSON.stringify(vm.newEvent));

        $http({
            url: 'http://localhost:3000/api/addEvent',
            method: "POST",
            data: $.param(vm.newEvent),
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (result) {
                console.log(result);
                alert("Event added successfully");
                loadAllEvents();

            }).catch(function (error) {
                console.log(error);
            });
    }



    $scope.editor1 = "*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
    $scope.markdownService = marked('#TEST');

    // --
    // normal flow, function call
    $scope.convertMarkdown = function () {
        vm.convertedMarkdown = marked(vm.markdown);


    }

    $scope.onFullScreenExitCallback = function (e) {
        e.hidePreview();
    }

    $scope.deleteEventsOnebyOne = function () {
        var deletionError;
        for (var i = 0; i < $scope.eventSelection.checkedEvents.length; i++) {
            $http({
                url: 'http://localhost:3000/api/deleteEvent',
                method: "PUT",
                data: $.param($scope.eventSelection.checkedEvents[i]),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function (result) {

                    console.log(result);
                }).catch(function (error) {
                    console.log(error);
                    deletionError = error;
                });
        }
        alert("Deleted Successfully");
        if (!deletionError) {
            console.log("RE-loading events");
            loadAllEvents();
        }
    }



    // $scope.deleteSelectedEvent = function() {
    //     // alert(JSON.stringify($scope.toBeSelectedCampaigns.campaigns));

    //     for (var i = 0; i < $scope.toBeSelectedEvents.events.length; i++) {
    //         // alert($scope.toBeSelectedCampaigns.campaigns[i]);
    //         $http({
    //                 url: 'http://localhost:3000/api/deleteSelectedEvent',
    //                 method: "PUT",
    //                 data: $.param($scope.toBeSelectedEvents.events[i]),
    //                 dataType: 'json',
    //                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //             })
    //             .then(function(result) {
    //                 console.log(result);

    //             }).catch(function(error) {
    //                 console.log(error);
    //             });
    //     }
    //     alert("Deleted Successfully");
    // }
}]);