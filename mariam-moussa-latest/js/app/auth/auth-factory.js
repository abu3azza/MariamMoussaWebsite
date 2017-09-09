angular.module('mmapp').factory('AuthFactory', AuthFactory);

function AuthFactory() {
    return {
        auth: auth
    };

    var auth = {
        isLoggedIn: false
    };
    var loggedUser;

    function setLoggedUser(loggedUserObject) {
        vm.loggedUser = loggedUserObject;
    }
}