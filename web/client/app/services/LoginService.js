/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('LoginService',function($rootScope,Restangular,$http){

    var _loginService = Restangular.all('login');

    this.login = function(user){
       return $http.post('/api/login',user);
    }
});