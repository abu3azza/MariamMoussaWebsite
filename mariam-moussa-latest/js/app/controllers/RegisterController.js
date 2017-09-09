app.controller('RegisterController', function($scope, $http, $filter, $timeout) {
    $scope.user = {};
    $scope.message = "";
    $scope.error = "";



    $scope.postRegister = function() {
        if (!$scope.user.username || !$scope.user.password) {
            alert('check 1');
            $scope.error = 'Please add a username and a password.';
        } else {
            if ($scope.user.password !== $scope.user.passwordRepeat) {
                alert('check 2');
                $scope.error = 'Please make sure the passwords match.';
            } else {

                $http({
                        url: 'http://localhost:3000/api/register',
                        method: "POST",
                        data: $.param($scope.user),
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function(result) {
                        console.log(result);
                        $scope.message = 'Successful registration, please login.';
                        $scope.error = '';
                    }).catch(function(error) {
                        console.log(error);
                    });
            }
        }

    };

});