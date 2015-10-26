/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('UserService',['$rootScope','Restangular',function($rootScope,Restangular){

    var _userService = Restangular.all('users');
    var scope = $rootScope.$new();

    this.list = function(){
        $rootScope.$broadcast('user.list');
        return _userService.getList();
    };

    this.get = function(id){
        return Restangular.one('users',id).get();
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
}]);