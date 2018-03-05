app.controller('MEventsController', ['Upload', '$window', '$http', "$rootScope", '$scope', 'marked', function (Upload, $window, $http, $rootScope, $scope, marked) {
    alert("hi MEventsController");
    var vm = this;
    vm.newEvent = {};
    vm.categories = [];
    vm.file = {};
    vm.progress = {};
    vm.editor1 = "";
    $scope.markdownService = marked('#TEST');

    $scope.events = [];
    // $scope.selectedEvents = [];

    function init() {
        alert("Starting Events Controller");
        vm.categories = [
            { description: "Webinar", styleClass: "webinars" },
            { description: "Workshop", styleClass: "workshops" },
            { description: "Day Event", styleClass: "dayEvents" },
            { description: "Program", styleClass: "programs" }
        ];
        var responseData;
        var responseData2;

    }

    init();
    //=================Editor Section functions ================
    $scope.convertMarkdown = function () {
        vm.convertedMarkdown = marked(vm.markdown);
    }
    $scope.onFullScreenExitCallback = function (e) {
        e.hidePreview();
    }
    //==================Editor End ================
    vm.submit = function () { //function to call on form submit
        var result = document.getElementsByClassName("markdown");
        vm.newEvent.eventDetails = result[0].innerHTML;
        alert("Inserted Event : " + JSON.stringify(vm.newEvent));
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

    // /**
    //  * For some convenience, Angular-Markdown-Editor Directive also save each Markdown Editor inside $rootScope
    //  * Each of editor object are available through their $rootScope.markdownEditorObjects[editorName]
    //  *
    //  * Example: <textarea name="editor1" markdown-editor="{'iconlibrary': 'fa'}"></textarea>
    //  * We would then call our object through $rootScope.markdownEditorObjects.editor1
    //  */
    // $scope.fullScreenPreview = function() {
    //     $rootScope.markdownEditorObjects.editor1.showPreview();
    //     alert("code: " + $rootScope.markdownEditorObjects.editor1.code.alert);
    //     $rootScope.markdownEditorObjects.editor1.setFullscreen(true);
    // }

    // $scope.getHTML = function() {

    //     var result = document.getElementsByClassName("markdown");
    //     alert(result[0].innerHTML);
    // }

    // /** Markdown event hook onFullscreen, in this example we will automatically show the result preview when going in full screen
    //  * the argument (e) is the actual Markdown object returned which help call any of API functions defined in Markdown Editor
    //  * For a list of API functions take a look on official demo site http://www.codingdrama.com/bootstrap-markdown/
    //  * @param object e: Markdown Editor object
    //  */
    // $scope.onFullScreenCallback = function(e) {
    //     e.showPreview();
    // }

    // /** After exiting from full screen, let's go back to editor mode (which mean hide the preview)
    //  * NOTE: If you want this one to work, you will have to manually download the JS file, not sure why but they haven't released any versions in a while
    //  *       https://github.com/toopay/bootstrap-markdown/tree/master/js
    //  */
    $scope.onFullScreenExitCallback = function (e) {
        e.hidePreview();
    }




    $scope.foundEvents = {
        events: []
    };
    // $scope.toBeSelectedEvents = {
    //     events: []
    // };

    $scope.checkAllEvents = function () {
        $scope.foundEvents.events = angular.copy($scope.events);
    };
    $scope.uncheckAllEvents = function () {
        $scope.foundEvents.events = [];
    };

    // $scope.checkAllSelectedEvents = function() {
    //     $scope.toBeSelectedEvents.events = angular.copy($scope.selectedEvents);
    // };
    // $scope.uncheckAllSelectedEvents = function() {
    //     $scope.toBeSelectedEvents.events = [];
    // };

    // $scope.save = function() {
    //     // alert(JSON.stringify($scope.foundCampaigns.campaigns));

    //     if (($scope.foundEvents.events.length + $scope.selectedEvents.length) > 4) {
    //         alert("Selected Events must be 4 or less");
    //     } else {
    //         for (var i = 0; i < $scope.foundEvents.events.length; i++) {
    //             // alert($scope.foundCampaigns.campaigns[i]);
    //             $http({
    //                     url: 'http://localhost:3000/api/addSelectedEvents',
    //                     method: "POST",
    //                     data: $.param($scope.foundEvents.events[i]),
    //                     dataType: 'json',
    //                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //                 })
    //                 .then(function(result) {
    //                     console.log(result);

    //                 }).catch(function(error) {
    //                     console.log(error);
    //                 });
    //         }
    //         alert("Saved Successfully");
    //     }

    // };
    $scope.deleteEvents = function () {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        for (var i = 0; i < $scope.foundEvents.events.length; i++) {
            // alert($scope.foundCampaigns.campaigns[i]);
            $http({
                url: 'http://localhost:3000/api/deleteEvent',
                method: "PUT",
                data: $.param($scope.foundEvents.events[i]),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function (result) {
                    console.log(result);

                }).catch(function (error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
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