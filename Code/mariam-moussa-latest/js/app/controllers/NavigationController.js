angular.module('mmapp').controller('NavigationController', NavigationController);

// app.controller('NavigationController', ['$scope', '$location', function($scope, $location) {
function NavigationController($http, $window, $location, AuthFactory, jwtHelper, $anchorScroll) {
    var vm = this;
    var loggedInUser;
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;
    vm.isLoggedIn = function () {
        // // alert(AuthFactory.isLoggedIn);
        return AuthFactory.isLoggedIn;
    };


    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }
    vm.goToAdmin = function () {
        $location.path('/admin');
    }

    vm.getClass = function (path) {

        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    };

};

// }]);