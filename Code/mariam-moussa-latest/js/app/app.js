'use strict';
var app = angular.module('mmapp', ['ui.calendar', 'ngRoute', 'ui.bootstrap', "checklist-model",
        'angular-jwt', 'ngFileUpload', 'hc.marked', 'hljs', 'angular-markdown-editor'
    ])
    .config(['$routeProvider', '$httpProvider', 'markedProvider', 'hljsServiceProvider',
        function($routeProvider, $httpProvider, $window, markedProvider, hljsServiceProvider) {


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
                }).when('/editor', {
                    templateUrl: 'editor.html',
                    controller: 'EditorController',
                    controllerAs: 'ec',
                    access: {
                        restricted: false
                    }
                }).when('/booking', {
                    templateUrl: '/booking.html',
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
                }).when('/upload', {
                    templateUrl: 'file-upload.html',
                    controller: 'FileUploadController',
                    controllerAs: 'FileUploadCtrl',
                    access: {
                        restricted: false
                    }
                }).when('/editor', {
                    templateUrl: 'editor.html',
                    controller: 'EditorController',
                    controllerAs: 'EditorCtrl',
                    access: {
                        restricted: false
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

                }).when('/addCampaign', {
                    templateUrl: 'newCampaign.html',
                    controller: 'CampaignController',
                    access: {
                        restricted: false
                    }

                }).when('/managePrograms', {
                    templateUrl: 'managePrograms.html',
                    controller: 'MProgramController',
                    access: {
                        restricted: false
                    }

                }).when('/about-mariam', {
                    templateUrl: 'about-mariam.html',
                    controller: 'AboutMariamController',
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

                }).when('/article-details/:id', {
                    templateUrl: 'article-details.html',
                    controller: 'ArticleDetailsController',
                    access: {
                        restricted: false
                    }

                }).when('/art-Wild-is-Natural', {
                    templateUrl: 'art-Wild-is-Natural.html',
                    // controller: 'LoginController',
                    access: {
                        restricted: false
                    }

                }).when('/manageArticles', {
                    templateUrl: 'manageArticiles.html',
                    controller: 'MArticlesController',
                    access: {
                        restricted: false
                    }

                }).when('/articles', {
                    templateUrl: 'articles.html',
                    controller: 'ArticleController',
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
                    controller: 'FAQController',
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
                    controller: 'ProgramController',
                    access: {
                        restricted: false
                    }

                }).when('/pro-life-tuning/:id', {
                    templateUrl: 'pro-life-tuning.html',
                    controller: 'ProgramController',
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
                    controller: 'ServicesController',
                    access: {
                        restricted: false
                    }

                    // }).when('/services#personal', {
                    //     templateUrl: 'services.html',
                    //     // controller: 'LoginController',
                    //     access: {
                    //         restricted: false
                    //     }

                })
                .when('/eve-life-tuning', {
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
                    controller: 'EventController',
                    access: {
                        restricted: false
                    }

                }).otherwise({


                    template: "<div></div>",
                    controller: function($window, $location, $rootScope) {

                        $window.location.href = 'index.html#!home';

                    }

                });


            // events

            //        $locationProvider.html5Mode(true);
        }
    ], function(markedProvider, hljsServiceProvider) {
        // marked config
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            sanitize: true,
            highlight: function(code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });

        // highlight config
        hljsServiceProvider.setOptions({
            // replace tab with 4 spaces
            tabReplace: '    '
        });
    }).run(run);




function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        $window.scrollTo(0, 0);
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    });
};
// app.config(['$compileProvider', function($compileProvider) {
//     $compileProvider.debugInfoEnabled(false);
// }]);