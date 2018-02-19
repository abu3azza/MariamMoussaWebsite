app.controller('MTestimonialsController', ['$http', '$scope', function($http, $scope) {


    alert('HI MANAGE TEST CONTROLLER ');


    $scope.newTestimonial = {};
    $scope.testimonials = [];


    function init() {
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

        }, function errorCallback(response) {
            alert("error" + response);

        });

    }

    init();
    $scope.submit = function() {

        $http({
                url: 'http://localhost:3000/api/addTestimonial',
                method: "POST",
                data: $.param($scope.newTestimonial),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {
                console.log(result);
                alert("Testimonial added successfully");

            }).catch(function(error) {
                console.log(error);
            });

    };

    $scope.foundTestimonials = {
        testimonials: []
    };


    $scope.checkAllTestimonials = function() {
        $scope.foundTestimonials.testimonials = angular.copy($scope.testimonials);
    };
    $scope.uncheckAllTestimonials = function() {
        $scope.foundTestimonials.testimonials = [];
    };
    $scope.deleteTestimonials = function() {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        for (var i = 0; i < $scope.foundTestimonials.testimonials.length; i++) {
            // alert($scope.foundCampaigns.campaigns[i]);
            $http({
                    url: 'http://localhost:3000/api/deleteTestimonial',
                    method: "PUT",
                    data: $.param($scope.foundTestimonials.testimonials[i]),
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