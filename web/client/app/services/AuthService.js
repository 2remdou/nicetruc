/**
 * Created by touremamadou on 14/01/2016.
 */
app.service('AuthService', ['localStorageFactory','$rootScope',
 function (localStorageFactory,$rootScope) {

    this.setToken = function(token){
        localStorageFactory.set('token',token);
    };

    this.getToken = function(){
        return localStorageFactory.get('token')
    };

    this.setUser = function(user){
        localStorageFactory.setObject('user',user);
        // $cookies.putObject('user',user);
    };

    this.getUser= function(){
        return localStorageFactory.getObject('user');
        // return $cookies.getObject('user');
    };

    this.clear = function(){
        // $window.localStorage
        // $cookies.remove('token');
        // $cookies.remove('user');
        localStorageFactory.clear();
        delete $rootScope.user;
    }
}]);
