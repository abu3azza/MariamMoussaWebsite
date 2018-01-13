app.controller('ArticleDetailsController', function($window, $http, $scope, $routeParams, $sce) {


    alert("hi ArticleDetailsController controller");

    $scope.articles = [];
    $scope.id = $routeParams.id;
    alert(JSON.stringify($scope.id));
    $scope.article;
    $scope.trustedHTML;

    function init() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/getArticleById?id=' + $scope.id


        }).then(function successCallback(response) {
            $scope.article = response.data;
            console.log("respnse ==>" + JSON.stringify($scope.article));
            $scope.trustedHTML = $sce.trustAsHtml($scope.article.description);


        }, function errorCallback(response) {
            alert("error" + response);

        });



    }

    init();
});