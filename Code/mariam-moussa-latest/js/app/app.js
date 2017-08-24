var app = angular.module('mmapp', ['ui.calendar', 'ngRoute', 'ui.bootstrap']).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            }).when('/booking', {
                templateUrl: 'booking.html',
                controller: 'BookingController',
                controllerAs: 'bookingCtrl'
            }).when('/admin', {
                templateUrl: 'administration.html',
                controller: 'ViewController',
                controllerAs: 'ViewCtrl'
            }).otherwise("/home");


        //        $locationProvider.html5Mode(true);
    }
]);


app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);