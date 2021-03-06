app.controller('MProgramController', ['Upload', '$window', '$http', "$rootScope", '$scope', 'marked', function(Upload, $window, $http, $rootScope, $scope, marked) {
    // alert("hi MprogramController");
    var vm = this;
    vm.newProgram = {};
    $scope.programs = [];
    $scope.selectedPrograms = [];

    function init() {
        var responseData;
        var responseData2;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getPrograms'
        }).then(function successCallback(response) {
            responseData = response.data;
            // alert("respnse data" + JSON.stringify(responseData));
            angular.forEach(responseData,
                function(item) {
                    $scope.programs.push(item);
                });

        }, function errorCallback(response) {
            alert("error" + response);

        });
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getSelectedPrograms'
        }).then(function successCallback(response) {
            responseData2 = response.data;
            // alert("respnse data" + JSON.stringify(responseData2));
            angular.forEach(responseData2,
                function(item) {
                    $scope.selectedPrograms.push(item);
                });

        }, function errorCallback(response) {
            alert("error" + response);

        });
    }

    init();
    vm.submit = function() { //function to call on form submit
        var result = document.getElementsByClassName("markdown");
        vm.newProgram.description = result[0].innerHTML;
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }

    }
    vm.upload = function(file) {
        // alert("File: =>" + JSON.stringify(file));
        Upload.upload({
            url: 'http://207.154.226.195:3000/api/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                // $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                vm.addprogram(resp.data.imgname);

            } else {
                $window.alert('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
        alert("finish upload ");
    };

    vm.addprogram = function(imgname) {
        vm.newProgram.path = imgname;
        $window.alert(JSON.stringify(vm.newProgram));

        $http({
                url: 'http://207.154.226.195:3000/api/addProgram',
                method: "POST",
                data: $.param(vm.newProgram),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {
                console.log(result);
                alert("Program added successfully");

            }).catch(function(error) {
                console.log(error);
            });
    }



    $scope.editor1 = "*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
    $scope.markdownService = marked('#TEST');

    // --
    // normal flow, function call
    $scope.convertMarkdown = function() {
        vm.convertedMarkdown = marked(vm.markdown);


    }

    /**
     * For some convenience, Angular-Markdown-Editor Directive also save each Markdown Editor inside $rootScope
     * Each of editor object are available through their $rootScope.markdownEditorObjects[editorName]
     *
     * Example: <textarea name="editor1" markdown-editor="{'iconlibrary': 'fa'}"></textarea>
     * We would then call our object through $rootScope.markdownEditorObjects.editor1
     */
    $scope.fullScreenPreview = function() {
        $rootScope.markdownEditorObjects.editor1.showPreview();
        alert("code: " + $rootScope.markdownEditorObjects.editor1.code.alert);
        $rootScope.markdownEditorObjects.editor1.setFullscreen(true);
    }

    $scope.getHTML = function() {

        var result = document.getElementsByClassName("markdown");
        alert(result[0].innerHTML);
    }

    /** Markdown event hook onFullscreen, in this example we will automatically show the result preview when going in full screen
     * the argument (e) is the actual Markdown object returned which help call any of API functions defined in Markdown Editor
     * For a list of API functions take a look on official demo site http://www.codingdrama.com/bootstrap-markdown/
     * @param object e: Markdown Editor object
     */
    $scope.onFullScreenCallback = function(e) {
        e.showPreview();
    }

    /** After exiting from full screen, let's go back to editor mode (which mean hide the preview)
     * NOTE: If you want this one to work, you will have to manually download the JS file, not sure why but they haven't released any versions in a while
     *       https://github.com/toopay/bootstrap-markdown/tree/master/js
     */
    $scope.onFullScreenExitCallback = function(e) {
        e.hidePreview();
    }




    $scope.foundPrograms = {
        programs: []
    };
    $scope.toBeSelectedPrograms = {
        programs: []
    };

    $scope.checkAllPrograms = function() {
        $scope.foundPrograms.programs = angular.copy($scope.programs);
    };
    $scope.uncheckAllPrograms = function() {
        $scope.foundPrograms.programs = [];
    };

    $scope.checkAllSelectedPrograms = function() {
        $scope.toBeSelectedPrograms.programs = angular.copy($scope.selectedPrograms);
    };
    $scope.uncheckAllSelectedPrograms = function() {
        $scope.toBeSelectedPrograms.programs = [];
    };

    $scope.save = function() {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        if (($scope.foundPrograms.programs.length + $scope.selectedPrograms.length) > 4) {
            alert("Selected Programs must be 4 or less");
        } else {
            for (var i = 0; i < $scope.foundPrograms.programs.length; i++) {
                // alert($scope.foundCampaigns.campaigns[i]);
                $http({
                        url: 'http://207.154.226.195:3000/api/addSelectedPrograms',
                        method: "POST",
                        data: $.param($scope.foundPrograms.programs[i]),
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function(result) {
                        console.log(result);

                    }).catch(function(error) {
                        console.log(error);
                    });
            }
            alert("Saved Successfully");
        }

    };
    $scope.deletePrograms = function() {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        for (var i = 0; i < $scope.foundPrograms.programs.length; i++) {
            // alert($scope.foundCampaigns.campaigns[i]);
            var name = $scope.foundPrograms.programs[i].path;
            $http({

                    url: 'http://207.154.226.195:3000/api/deleteProgram',
                    method: "PUT",
                    data: $.param($scope.foundPrograms.programs[i]),
                    dataType: 'json',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(result) {
                    alert("hawhawhaw" + name);
                    console.log(result);
                    alert(JSON.stringify($scope.foundPrograms.programs[i]));
                    $http({
                            url: 'http://207.154.226.195:3000/api/deleteImage',
                            method: "PUT",
                            params: { name: name },
                            dataType: 'json',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                        .then(function(result) {
                            console.log(result);

                        }).catch(function(error) {
                            console.log(error);
                        });

                    console.log(result);

                }).catch(function(error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
    }



    $scope.deleteSelectedProgram = function() {
        // alert(JSON.stringify($scope.toBeSelectedCampaigns.campaigns));

        for (var i = 0; i < $scope.toBeSelectedPrograms.programs.length; i++) {
            // alert($scope.toBeSelectedCampaigns.campaigns[i]);
            $http({
                    url: 'http://207.154.226.195:3000/api/deleteSelectedProgram',
                    method: "PUT",
                    data: $.param($scope.toBeSelectedPrograms.programs[i]),
                    dataType: 'json',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(result) {
                    console.log(result);

                }).catch(function(error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
    }
}]);