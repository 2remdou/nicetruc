/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('UserService',['$rootScope','Restangular','$cookies',
    function($rootScope,Restangular,$cookies){

    that = this;
    var _userService = Restangular.all('users');
    var scope = $rootScope.$new();

    this.isAuthenticated = function(){
        return typeof $rootScope.user != "undefined";
    };

    this.getRole = function(){
       if(that.isAuthenticated()) return $rootScope.user.roles[0];
        return  'ANONYMOUS';
    };

    this.hasRole = function(roleName){
        return that.getRole() === roleName ;
    };

    this.isAdmin = function(){
        return that.getRole() === 'ROLE_ADMIN';
    };

    this.list = function(){
        $rootScope.$broadcast('user.list');
        return _userService.getList();
    };

    this.get = function(id){
        return Restangular.one('users',id).get();
    };

    this.create = function(user){
        _userService.post(user).then(function(){
            $rootScope.$broadcast('user.create');
        });
    };

    this.update = function(user){
        user.put().then(function(response){
           successRequest(response,scope);
        },function(response){
            errorRequest(response,scope);
        });
    };

    this.delete = function(user){
        user.remove().then(function(){
            $rootScope.$broadcast('user.delete');
        })
    };

    this.changePassword = function(){
        return _userService.one('change');
    };

    this.resetMail = function(email){
        return _userService.one('resetting').post('send-mail',{email:email});
    };

    this.resetCheckToken = function(token){
        return _userService.one('resetting').post('check-token',{token:token});
    };

    this.resetting = function(token,password){
        return _userService.one('resetting').post('reset',{token:token,password:password});
    }
}]);