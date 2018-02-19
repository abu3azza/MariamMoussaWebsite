app.controller('MVideosController', ['$http', '$scope', function($http, $scope) {
    alert("hi MVideosController");
    $scope.newVideo = {};
    $scope.newVideo._id = '5a5f63be2ad23a4dfd52d182';

    $scope.updateHomePageVideo = function() {
        $http({
                url: 'http://localhost:3000/api/updateHomePageVideo',
                method: "POST",
                data: $.param($scope.newVideo),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {
                console.log(result);
                alert("video added successfully");

            }).catch(function(error) {
                console.log(error);
            });
    }

    $scope.updateTestimonialsVideo = function() {
        $http({
                url: 'http://localhost:3000/api/updateTestimonialsVideo',
                method: "POST",
                data: $.param($scope.newVideo),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {
                console.log(result);
                alert("video added successfully");

            }).catch(function(error) {
                console.log(error);
            });
    }

}]);