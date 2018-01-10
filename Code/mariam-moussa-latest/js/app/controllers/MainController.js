app.controller('MainController', function($scope, $timeout, $sce, $http) {
    alert("hi Main Controller");
    $scope.bodyHtml = 'hwhwhwhwhwhwhwhwhwhw';
    $scope.video = "https://www.youtube.com/embed/bJi9yceCmZ4";
    $scope.trustedVideo = $sce.trustAsResourceUrl($scope.video);
    // $scope.showModal = false;
    // $scope.buttonClicked = "";
    $scope.selectedCampaigns = [];

    init();

    $scope.toggleModal = function(btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };

    $scope.open = function() {
        alert('halsbala');
        $scope.toggleModal('Edit Home Video');
    };

    $scope.submitForm = function(newvideo) {
        $scope.video = newvideo;
        $scope.showModal = !$scope.showModal;
    };




    $timeout(function() {
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
        //     $('.panel-heading a[data-toggle="collapse"]').on('click', function() {
        //         if ($(this).closest('.panel-heading').hasClass('active')) {
        //             $(this).closest('.panel-heading').removeClass('active');
        //         } else {
        //             $('.panel-heading a[data-toggle="collapse"]').closest('.panel-heading').removeClass('active');
        //             $(this).closest('.panel-heading').addClass('active');
        //         }
        //     });

        //     /* Float Label Pattern Plugin for Bootstrap 3.1.0 by Travis Wilson
        //      **************************************************/

        //     (function($) {
        //         $.fn.floatLabels = function(options) {

        //             // Settings
        //             var self = this;
        //             var settings = $.extend({}, options);


        //             // Event Handlers
        //             function registerEventHandlers() {
        //                 self.on('input keyup change', 'input, textarea', function() {
        //                     actions.swapLabels(this);
        //                 });
        //             }


        //             // Actions
        //             var actions = {
        //                 initialize: function() {
        //                     self.each(function() {
        //                         var $this = $(this);
        //                         var $label = $this.children('label');
        //                         var $field = $this.find('input,textarea').first();

        //                         if ($this.children().first().is('label')) {
        //                             $this.children().first().remove();
        //                             $this.append($label);
        //                         }

        //                         var placeholderText = ($field.attr('placeholder') && $field.attr('placeholder') != $label.text()) ? $field.attr('placeholder') : $label.text();

        //                         $label.data('placeholder-text', placeholderText);
        //                         $label.data('original-text', $label.text());

        //                         if ($field.val() == '') {
        //                             $field.addClass('empty')
        //                         }
        //                     });
        //                 },
        //                 swapLabels: function(field) {
        //                     var $field = $(field);
        //                     var $label = $(field).siblings('label').first();
        //                     var isEmpty = Boolean($field.val());

        //                     if (isEmpty) {
        //                         $field.removeClass('empty');
        //                         $label.text($label.data('original-text'));
        //                     } else {
        //                         $field.addClass('empty');
        //                         $label.text($label.data('placeholder-text'));
        //                     }
        //                 }
        //             }


        //             // Initialization
        //             function init() {
        //                 registerEventHandlers();

        //                 actions.initialize();
        //                 self.each(function() {
        //                     actions.swapLabels($(this).find('input,textarea').first());
        //                 });
        //             }
        //             init();


        //             return this;
        //         };

        //         $(function() {
        //             $('.float-label-control').floatLabels();
        //         });
        //     })(jQuery);
    });

    function init() {

        var responseData2;

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/getSelectedCampaigns'
        }).then(function successCallback(response) {
            responseData2 = response.data;
            // alert("respnse data" + JSON.stringify(responseData2));
            angular.forEach(responseData2,
                function(item) {
                    // alert("pushing: " + JSON.stringify(item));
                    $scope.selectedCampaigns.push(item);
                });

        }, function errorCallback(response) {
            alert("error" + response);

        });


    }
});