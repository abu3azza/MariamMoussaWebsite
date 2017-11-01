app.controller('NewsLetterController', function($scope, $http) {
    /**
     * This method for mailchimp subscribtion get a user email and call node service that add this email 
     * to configuerd mailchimp list
     */

    $scope.subscriber;
    $scope.showSubMsg = false;
    $scope.subscribeNewsLetter = function() {

        //minakarim22@gmail.com
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/mailchimp?mail=' + $scope.subscriber
        }).then(function successCallback(response) {
            //alert("subscribed successfully !" + response);
            $scope.showSubMsg = true;
            $scope.subscriber = "";
        }, function errorCallback(response) {
            alert("error" + response);

        });

    };

});