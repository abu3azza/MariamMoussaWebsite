app.controller('MainController', function($scope, $timeout) {
    $scope.bodyHtml = 'hwhwhwhwhwhwhwhwhwhw';

    $scope.one = true; // setting the first div visible when the page loads
    $scope.two = false; // hidden
    $scope.three = false; // hidden

    // Now have three functions that change the ng-show based on the click
    $scope.showOne = function() {
        $scope.one = true;
        $scope.two = false;
        $scope.three = false;
    }

    $scope.showTwo = function() {
        $scope.one = false;
        $scope.two = true; // now show this one
        $scope.three = false;
    }

    function init() {

        $("#news-carousel").owlCarousel({
            // Most important owl features
            items: 2,
            itemsCustom: false,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [980, 2],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            startDragging: true,
            autoPlay: 4000
        });


        $("#work-carousel").owlCarousel({
            // Most important owl features
            items: 4,
            itemsCustom: false,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 3],
            itemsTablet: [768, 3],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            startDragging: true,
            autoPlay: 6000
        });
    }
    init();

    $timeout(function() {
        $('.panel-heading a[data-toggle="collapse"]').on('click', function() {
            if ($(this).closest('.panel-heading').hasClass('active')) {
                $(this).closest('.panel-heading').removeClass('active');
            } else {
                $('.panel-heading a[data-toggle="collapse"]').closest('.panel-heading').removeClass('active');
                $(this).closest('.panel-heading').addClass('active');
            }
        });
    });


});