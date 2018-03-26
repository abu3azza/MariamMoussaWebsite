app.controller('ProgramController', function($window, $http, $rootScope, $scope, $routeParams, $sce) {

    console.log("hi program controller");
    $scope.id = $routeParams.id;
    console.log(JSON.stringify($scope.id));
    $scope.program;
    $scope.trustedHTML;
    $scope.trustedVideo;

    function init() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getProgramById?id=' + $scope.id


        }).then(function successCallback(response) {
            $scope.program = response.data;
            console.log("respnse ==>" + JSON.stringify($scope.program));
            $scope.trustedHTML = $sce.trustAsHtml($scope.program.description);
            $scope.trustedVideo = $sce.trustAsResourceUrl($scope.program.videoLink);

        }, function errorCallback(response) {
            console.log("error" + response);

        });



    }

    init();
});