/**
 * Created by touremamadou on 14/01/2016.
 */
app.service('AuthService', ['$window','$cookies','$rootScope', function ($window,$cookies,$rootScope) {

    this.setToken = function(token){
        $window.localStorage['token']=token;
    };

    this.getToken = function(){
        return $window.localStorage['token'];
    };

    this.setUser = function(user){
        $cookies.putObject('user',user);
    };

    this.getUser= function(){
        return $cookies.getObject('user');
    };

    this.logout = function(){
        $cookies.remove('token');
        $cookies.remove('user');
        delete $rootScope.user;
    }
}]);
