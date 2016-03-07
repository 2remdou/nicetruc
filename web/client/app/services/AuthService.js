/**
 * Created by touremamadou on 14/01/2016.
 */
app.service('AuthService', ['localStorageFactory','$rootScope',
 function (localStorageFactory,$rootScope) {
    var that=this;

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
    };

     this.authenticated = function(response){
         if(isDefined(response.token)) that.setToken(response.token);
         if(isDefined(response.refresh_token)) that.setRefreshToken(response.refresh_token);
         if(isDefined(response.data.user)) that.setUser(response.data.user);
     };

 }]);
