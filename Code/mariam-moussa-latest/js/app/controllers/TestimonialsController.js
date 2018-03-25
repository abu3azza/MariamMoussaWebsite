app.controller('TestimonialsController', function($scope, $http, $sce) {

    // alert("hi Testmonials Controller");

    $scope.video = "https://www.youtube.com/embed/bJi9yceCmZ4";
    $scope.trustedVideo = $sce.trustAsResourceUrl($scope.video);
    $scope.testimonials = [];

    function init() {


        var responseVideo;


        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/getAllVideos'
        }).then(function successCallback(response) {
            responseVideo = response.data;
            alert("respnse data" + JSON.stringify(responseVideo));
            $scope.trustedVideo = $sce.trustAsResourceUrl(responseVideo[0].TestimonialsVideoLink);
            // alert('new Trusted Video = ' + $scope.trustedVideo);
        }, function errorCallback(response) {
            alert("error" + response);

        });


        var responseData;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/getAllTestimonials'
        }).then(function successCallback(response) {
            responseData = response.data;
            // alert("respnse data" + JSON.stringify(responseData));
            angular.forEach(responseData,
                function(item) {
                    $scope.testimonials.push(item);
                });


            // alert('testemonials' + $scope.testimonials);
        }, function errorCallback(response) {
            alert("error" + response);

        });
    }

    init();

});