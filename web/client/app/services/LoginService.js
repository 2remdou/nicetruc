/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('LoginService',function($rootScope,Restangular,$http){

   // var _loginService = Restangular.all('account/');

    this.login = function(user){
       return $http.post('/api/login',user);
    };

    this.getSalt = function(email){
        var locale = email.substr(0,email.indexOf('@'));
        var hote=email.substring(email.indexOf('@')+1,email.indexOf('.'));
        var domaine=email.substring(email.indexOf('.')+1);
        return Restangular.one('salt').one('l',locale).one('h',hote).one('d',domaine).get();
    };
});