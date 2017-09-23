app.controller('FAQController', function($scope, $timeout) {

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