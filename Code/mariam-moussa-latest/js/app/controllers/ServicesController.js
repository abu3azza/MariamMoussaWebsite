app.controller('ServicesController', function($scope, $location, $anchorScroll) {

    $scope.gotoBottom = function(a) {

        // alert(a);
        $location.hash(a);

        // call $anchorScroll()
        $anchorScroll();
    };

});