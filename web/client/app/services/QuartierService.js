/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('QuartierService',['$rootScope','Restangular',function($rootScope,Restangular){

    var _quartierService = Restangular.all('quartiers/');

    this.list = function(){
        $rootScope.$broadcast('quartier.liste');
        return _quartierService.getList();
    };

    this.create = function(quartier){
        _quartierService.post(quartier).then(function(){
           $rootScope.$broadcast('quartier.create');
        });
    };

    this.update = function(quartier){
        quartier.put().then(function(){
            $rootScope.$broadcast('quartier.update');
        });
    };

    this.delete = function(quartier){
        quartier.remove().then(function(){
            $rootScope.$broadcast('quartier.delete');
        });
    }
}]);