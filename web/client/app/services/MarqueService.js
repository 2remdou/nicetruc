/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('MarqueService',['$rootScope','Restangular',function($rootScope,Restangular){

    var _marqueService = Restangular.all('marques/');

    this.list = function(){
        return _marqueService.getList();
    };

    this.create = function(marque){
        _marqueService.post(marque).then(function(){
            $rootScope.$broadcast('marque.create');
        });
    };

    this.update = function(marque){
        marque.put().then(function(){
           $rootScope.$broadcast('marque.update');
        });
    };

    this.delete = function(marque){
        marque.remove().then(function(){
            $rootScope.$broadcast('marque.delete');
        })
    }
}]);