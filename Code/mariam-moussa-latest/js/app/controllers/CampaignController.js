app.controller('CampaignController', ['Upload', '$window', '$http', '$scope', function(Upload, $window, $http, $scope) {
    // alert('hi campaign controller');
    var vm = this;
    vm.newCampaign = {};
    $scope.campaigns = [];
    $scope.selectedCampaigns = [];

    function init() {
        retrieveAllCampaigns();
    }

    init();

    function retrieveAllCampaigns() {
        var responseData;
        var responseData2;
        $scope.campaigns = [];
        $scope.selectedCampaigns = [];
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getCampaigns'
        }).then(function successCallback(response) {
            responseData = response.data;
            // alert("respnse data" + JSON.stringify(responseData));
            angular.forEach(responseData,
                function(item) {
                    $scope.campaigns.push(item);
                });
            $scope.$apply();

        }, function errorCallback(response) {
            alert("error" + response);

        });
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getSelectedCampaigns'
        }).then(function successCallback(response) {
            responseData2 = response.data;
            // alert("respnse data" + JSON.stringify(responseData2));
            angular.forEach(responseData2,
                function(item) {
                    $scope.selectedCampaigns.push(item);
                });

        }, function errorCallback(response) {
            alert("error" + response);

        });
    }

    vm.submit = function() { //function to call on form submit
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
                vm.addCampaign(resp.data.imgname);

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
        alert(" Done Uploading ");
    };

    vm.addCampaign = function(imgname) {
        vm.newCampaign.path = imgname;
        // $window.alert(JSON.stringify(vm.newCampaign));

        $http({
                url: 'http://207.154.226.195:3000/api/addCampaign',
                method: "POST",
                data: $.param(vm.newCampaign),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {
                console.log(result);
                alert("Campaign added successfully");
                retrieveAllCampaigns(); //To referesh campaigns list.
                alert(JSON.stringify($scope.campaigns));
            }).catch(function(error) {
                console.log(error);
            });
    }

    $scope.foundCampaigns = {
        campaigns: []
    };
    $scope.toBeSelectedCampaigns = {
        campaigns: []
    };
    $scope.checkAllCampaigns = function() {
        $scope.foundCampaigns.campaigns = angular.copy($scope.campaigns);
    };
    $scope.uncheckAllCampaigns = function() {
        $scope.foundCampaigns.campaigns = [];
    };
    $scope.checkAllSelectedCampaigns = function() {
        $scope.toBeSelectedCampaigns.campaigns = angular.copy($scope.selectedCampaigns);
    };
    $scope.uncheckAllSelectedCampaigns = function() {
        $scope.toBeSelectedCampaigns.campaigns = [];
    };


    $scope.save = function() { //Move Campaigns to selected campaigns
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        if (($scope.foundCampaigns.campaigns.length + $scope.selectedCampaigns.length) > 4) {
            alert("Selected Campaigns must be 4 or less");
        } else {
            for (var i = 0; i < $scope.foundCampaigns.campaigns.length; i++) {
                // alert($scope.foundCampaigns.campaigns[i]);
                $http({
                        url: 'http://207.154.226.195:3000/api/addSelectedCampaigns',
                        method: "POST",
                        data: $.param($scope.foundCampaigns.campaigns[i]),
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function(result) {
                        console.log(result);
                        retrieveAllCampaigns();
                    }).catch(function(error) {
                        console.log(error);
                    });
            }
            alert("Saved Successfully");
        }

    };
    $scope.deleteSelectedCampaign = function() {
        // alert(JSON.stringify($scope.toBeSelectedCampaigns.campaigns));

        for (var i = 0; i < $scope.toBeSelectedCampaigns.campaigns.length; i++) {
            // alert($scope.toBeSelectedCampaigns.campaigns[i]);
            $http({
                    url: 'http://207.154.226.195:3000/api/deleteSelectedCampaign',
                    method: "PUT",
                    data: $.param($scope.toBeSelectedCampaigns.campaigns[i]),
                    dataType: 'json',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(result) {
                    console.log(result);
                    retrieveAllCampaigns();
                }).catch(function(error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
    }
    $scope.deleteCampaign = function() {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        for (var i = 0; i < $scope.foundCampaigns.campaigns.length; i++) {
            // alert($scope.foundCampaigns.campaigns[i]);
            var name = $scope.foundCampaigns.campaigns[i].path;
            $http({

                    url: 'http://207.154.226.195:3000/api/deleteCampaign',
                    method: "PUT",
                    data: $.param($scope.foundCampaigns.campaigns[i]),
                    dataType: 'json',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(result) {
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
                    retrieveAllCampaigns();
                }).catch(function(error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
    }
}]);