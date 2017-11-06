angular.module('mmapp').directive('navbarDirective', navbarDirective);

function navbarDirective() {
    var vm = this;
    return {

        restrict: 'E',
        templateUrl: 'js/app/directives/navbar.html'
    };
}