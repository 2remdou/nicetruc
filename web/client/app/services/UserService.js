/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('UserService',['$rootScope','Restangular','$cookies','AuthService',
    function($rootScope,Restangular,$cookies,AuthService){

    var that = this;
    var _userService = Restangular.all('users');
    var scope = $rootScope.$new();

    this.login = function(user){
        return _userService.one('').post('login_check',{_username:user.email,_password:user.password});
    };

    this.refreshToken = function(){
        return _userService.one('').post('refresh_token',{refresh_token:AuthService.getRefreshToken()});
    };

    this.isAuthenticated = function(){
        if($rootScope.user) return true;
        return false;
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

    this.refresh = function(){
        $rootScope.user=AuthService.getUser();
    };

    this.getSalt = function(email){
        return _userService.one('').post('salt',{email:email});
    };

    this.checkLogin = function(){
        return _userService.one('checkLogin').get();
    }


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
    };

    this.enableEmail = function(token){
        return _userService.one('registration').post('confirm',{token:token});
    };
}]);