app.controller('ArticleController', ['$window', '$http', '$scope', function($window, $http, $scope) {


    // alert("hi atricle controller");

    $scope.articles = [];

    function init() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/getArticles'
        }).then(function successCallback(response) {
            responseData = response.data;
            angular.forEach(responseData,

                function(item) {
                    // alert("hwhw" + JSON.stringify(item));
                    $scope.articles.push(item);
                });

        }, function errorCallback(response) {
            console.log("Unexpected error "+ response);
        });
    }
    init();
}]);