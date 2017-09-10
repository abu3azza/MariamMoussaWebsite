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

            }).when('/about-mariam', {
                templateUrl: 'about-mariam.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/about-nardine', {
                templateUrl: 'about-nardine.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/about', {
                templateUrl: 'about.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Are-You-a-Pharoah', {
                templateUrl: 'art-Are-You-a-Pharoah.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Doing-Good-to-Others', {
                templateUrl: 'art-Doing-Good-to-Others.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Empowering-Women', {
                templateUrl: 'art-Empowering-Women.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-My-Way-or-The-Highway', {
                templateUrl: 'art-My-Way-or-The-Highway.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Mysterious', {
                templateUrl: 'art-Mysterious.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Sports', {
                templateUrl: 'art-Sports.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Weddings', {
                templateUrl: 'art-Weddings.html',
                //controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/art-Wild-is-Natural', {
                templateUrl: 'art-Wild-is-Natural.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/articles', {
                templateUrl: 'articles.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/eve-', {
                templateUrl: 'eve-.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/eve-life-tuning', {
                templateUrl: 'eve-life-tuning.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/faqs', {
                templateUrl: 'faqs.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/pro-coaching-for-managers', {
                templateUrl: 'pro-coaching-for-managers.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/pro-life-tuning', {
                templateUrl: 'pro-life-tuning.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/quote', {
                templateUrl: 'quote.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/search-results', {
                templateUrl: 'search-results.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/services', {
                templateUrl: 'services.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/eve-life-tuning', {
                templateUrl: 'eve-life-tuning.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/careers', {
                templateUrl: 'careers.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/testimonials', {
                templateUrl: 'testimonials.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).when('/events', {
                templateUrl: 'events.html',
                // controller: 'LoginController',
                access: {
                    restricted: false
                }

            }).otherwise("/home");

        // events

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
};
// app.config(['$compileProvider', function($compileProvider) {
//     $compileProvider.debugInfoEnabled(false);
// }]);