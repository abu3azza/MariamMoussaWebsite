var app = angular.module('mmapp', ['ui.calendar', 'ngRoute', 'ui.bootstrap', 'angular-jwt']).config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.defaults.useXDomain = true;
        $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                access: {
                    restricted: false
                }
            }).when('/booking', {
                templateUrl: 'booking.html',
                controller: 'BookingController',
                controllerAs: 'bookingCtrl',
                access: {
                    restricted: false
                }
            }).when('/admin', {
                templateUrl: 'administration.html',
                controller: 'ViewController',
                controllerAs: 'ViewCtrl',
                access: {
                    restricted: true
                }
            }).when('/register', {
                templateUrl: 'register2.html',
                controller: 'RegisterController',
                access: {
                    restricted: false
                }

            }).when('/login', {
                templateUrl: 'login.html',
                controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).otherwise("/home");



        //        $locationProvider.html5Mode(true);
    }
]).run(run);



function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    });
}
// app.config(['$compileProvider', function($compileProvider) {
//     $compileProvider.debugInfoEnabled(false);
// }]);