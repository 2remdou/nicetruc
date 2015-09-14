/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('UserService',function($rootScope,Restangular){

    var _userService = Restangular.all('users/');

    this.list = function(){
        $rootScope.$broadcast('user.list');
        return _userService.getList();
    }

    this.create = function(user){
        _userService.post(user).then(function(){
            $rootScope.$broadcast('user.create');
        });
    };

    this.update = function(user){
        user.put().then(function(){
           $rootScope.$broadcast('user.update');
        });
    };

    this.delete = function(user){
        user.remove().then(function(){
            $rootScope.$broadcast('user.delete');
        })
    }
});