app.controller('DisplayEventController', function($window, $http, $rootScope, $scope, $routeParams, $sce) {

    // alert("hi DisplayEventController controller");
    $scope.id = $routeParams.id;
    // alert(JSON.stringify($scope.id));
    $scope.event;
    $scope.trustedHTML;
    $scope.trustedVideo;

    function init() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getEventById?id=' + $scope.id


        }).then(function successCallback(response) {
            $scope.event = response.data;
            console.log("respnse ==>" + JSON.stringify($scope.event));
            $scope.trustedHTML = $sce.trustAsHtml($scope.event.eventDetails);
            $scope.trustedVideo = $sce.trustAsResourceUrl($scope.event.videoLink);

        }, function errorCallback(response) {
            alert("error" + response);

        });



    }

    init();
});