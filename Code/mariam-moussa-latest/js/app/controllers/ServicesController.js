app.controller('ServicesController', function($scope, $location, $anchorScroll, $http) {


    $scope.selectedPrograms = [];

    function init() {
        var responseData2;

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

    $scope.gotoBottom = function(a) {

        // alert(a);
        $location.hash(a);

        // call $anchorScroll()
        $anchorScroll();
    };

});