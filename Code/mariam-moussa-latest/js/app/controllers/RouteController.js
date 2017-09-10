app.controller('routeController', function($scope, $location) {
    // $scope.showPage = $location.path() === '/home';

    $scope.showPageHero = function() {
        // alert($location.path());
        // alert($location.path() === '/home');
        return $location.path() === '/home';
    };

});