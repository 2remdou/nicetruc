/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('ModeleService',function($rootScope,Restangular,$q){

    var _modeleService = Restangular.all('modeles/');

    this.list = function(){
        $rootScope.$broadcast('modele.list');
        return _modeleService.getList();
    }

    this.create = function(modele){
        var deferred = $q.defer();
        _modeleService.post(modele).then(function(data){
            $rootScope.$broadcast('modele.create');
             deferred.resolve(data);
        });
        return deferred.promise;
    };

    this.update = function(modele){
        var deferred = $q.defer();
        modele.put().then(function(data){
            deferred.resolve(data);
           $rootScope.$broadcast('modele.update');
        });
        return deferred.promise;
    };

    this.delete = function(modele){
        modele.remove().then(function(){
            $rootScope.$broadcast('modele.delete');
        })
    }
});