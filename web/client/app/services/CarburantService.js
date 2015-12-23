/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('CarburantService',['$rootScope','Restangular',function($rootScope,Restangular){

    var _carburantService = Restangular.all('carburants/');

    this.list = function(){
        $rootScope.$broadcast('carburant.list');
        return _carburantService.getList();
    }

    this.create = function(carburant){
        _carburantService.post(carburant).then(function(){
            $rootScope.$broadcast('carburant.create');
        });
    };

    this.update = function(carburant){
        carburant.put().then(function(){
           $rootScope.$broadcast('carburant.update');
        });
    };

    this.delete = function(carburant){
        carburant.remove().then(function(){
            $rootScope.$broadcast('carburant.delete');
        })
    }
}]);