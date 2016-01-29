/**
 * Created by touremamadou on 14/01/2016.
 */
app.service('AuthService', ['localStorageFactory','$rootScope',
 function (localStorageFactory,$rootScope) {
    that=this;
    this.authenticated = function(response){
        that.setToken(response.token);
        that.setRefreshToken(response.refresh_token);
        that.setUser(JSON.parse(response.data.user));
    };

    this.setToken = function(token){
        localStorageFactory.set('token',token);
    };

    this.getToken = function(){
        return localStorageFactory.get('token');
    };

    this.setUser = function(user){
        localStorageFactory.setObject('user',user);
        // $cookies.putObject('user',user);
    };

    this.getUser= function(){
        return localStorageFactory.getObject('user');
        // return $cookies.getObject('user');
    };

     this.getRefreshToken = function(){
         return localStorageFactory.get('refresh_token');
     };

     this.setRefreshToken = function(refreshToken){
       localStorageFactory.set('refresh_token',refreshToken);
     };

    this.clear = function(){
        localStorageFactory.clear();
        delete $rootScope.user;
    }
}]);
