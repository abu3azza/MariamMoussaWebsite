angular.module('mmapp').controller('LoginController', LoginController);

function LoginController($http, $window, $location, AuthFactory, jwtHelper) {
    var lc = this;
    //lc.loggedInUser = "hawhawhaw";

    var loggedInUser;
    // var token = $window.sessionStorage.token;
    // var decodedToken = jwtHelper.decodeToken(token);
    // lc.loggedInUser = decodedToken.username;

    lc.isLoggedIn = function() {
        return AuthFactory.isLoggedIn;
    };

    lc.getLoggedUserName = function() {
        if ($window.sessionStorage.token) {

            var decodedToken = jwtHelper.decodeToken($window.sessionStorage.token);
            return decodedToken.username;
        } else {
            return "not logged in ";
        }
    }

    lc.login = function() {
        if (lc.username && lc.password) {
            var user = {
                username: lc.username,
                password: lc.password
            };
            $http({
                    url: 'http://localhost:3000/api/login',
                    method: "POST",
                    data: $.param(user),
                    dataType: 'json',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(response) {
                    //  alert(JSON.stringify(response));
                    if (response.data.success) {
                        $window.sessionStorage.token = response.data.token;
                        AuthFactory.isLoggedIn = true;
                        var token = $window.sessionStorage.token;
                        var decodedToken = jwtHelper.decodeToken(token);
                        lc.loggedInUser = decodedToken.username;
                        //    alert(lc.loggedInUser);
                        // AuthFactory.loggedInUser = loggedInUser;
                        // lc.loggedInUser = user;
                        //    alert("Token Acuquired :" + JSON.stringify(decodedToken));
                        $location.path('/admin');

                    }
                }).catch(function(error) {
                    //    alert(error);
                    console.log(error);
                })

        }
    };


}