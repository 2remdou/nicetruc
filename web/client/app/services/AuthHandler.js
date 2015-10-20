/**
 * Created by touremamadou on 11/10/2015.
 */
app.factory('AuthHandler', ['$cookies', '$window', function ($cookies, $window) {

    var authHandler = {};
    // If not authenticated, go to login
/*
    if (typeof $cookies.get('email') == "undefined" || typeof $cookies.get('secret') == "undefined") {
        $window.location = '#/login';
    }
*/

    authHandler.email = function() {
        return $cookies.get('email');
    };

    authHandler.secret = function() {
        return $cookies.get('secret');
    };

    authHandler.getUser = function(){
        return $cookies.getObject('user');
        //return { email: $cookies.get('email'),nomUser: $cookies.get('nomUser'),prenomUser:$cookies.get('prenomUser') };
    }

    return authHandler;

}]);
