app.controller('MainController', function($scope) {
    $scope.bodyHtml = 'hwhwhwhwhwhwhwhwhwhw';

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
});