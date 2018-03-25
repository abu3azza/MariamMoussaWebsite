app.controller('ArticleDetailsController', function($window, $http, $scope, $routeParams, $sce) {


    console.log("hi ArticleDetailsController controller");

    $scope.articles = [];
    $scope.id = $routeParams.id;
    $scope.offset = parseInt($routeParams.offset);
    console.log("Offset" + $scope.offset);
    $scope.article;
    $scope.trustedHTML;
    $scope.hawhaw = "not hawhaw";
    $scope.object = "fady";
    $scope.count;

    function init() {
        var responseData;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getArticleById?id=' + $scope.id


        }).then(function successCallback(response) {
            $scope.article = response.data;
            console.log("respnse ==>" + JSON.stringify($scope.article));
            $scope.trustedHTML = $sce.trustAsHtml($scope.article.description);


        }, function errorCallback(response) {
            // alert("error" + response);

        });


        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getArticlesCount'


        }).then(function successCallback(response) {
            $scope.count = response.data;
            // alert("count =" + $scope.count);


        }, function errorCallback(response) {
            // alert("error" + response);

        });


    }

    init();

    $scope.getNextArticle = function() {
        // alert("dal el offset abl " + $scope.offset + 2 + " we dah el count " + $scope.count);
        if (($scope.offset + 1) < $scope.count) {
            // alert("da5al");
            $scope.offset++;
        }
        $scope.hawhaw = "hawhaw";
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getNextArticle?offset=' + $scope.offset


        }).then(function successCallback(response) {
            // alert("respnse  data==>" + JSON.stringify(response.data));
            $scope.article = response.data[0];
            // alert("respnse ==>" + JSON.stringify($scope.article));
            $scope.trustedHTML = $sce.trustAsHtml($scope.article.description);



        }, function errorCallback(response) {
            // alert("error" + response);

        });
        // alert("after Alert" + JSON.stringify($scope.article));
    }

    $scope.getPrevArticle = function() {
        // alert("befor" + $scope.offset);

        $scope.offset = $scope.offset - 1;
        $scope.object = JSON.stringify($scope.article);
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getNextArticle?offset=' + $scope.offset


        }).then(function successCallback(response) {
            // alert("respnse  data==>" + JSON.stringify(response.data));
            $scope.article = response.data[0];
            // alert("respnse ==>" + JSON.stringify($scope.article));
            $scope.trustedHTML = $sce.trustAsHtml($scope.article.description);


        }, function errorCallback(response) {
            // alert("error" + response);

        });
        // alert("after Alert" + JSON.stringify($scope.article));
    }

});