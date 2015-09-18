/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('ModeleService',function($rootScope,Restangular){

    var _modeleService = Restangular.all('modeles/');

    this.list = function(){
        $rootScope.$broadcast('modele.liste');
        return _modeleService.getList();
    };

    this.create = function(modele){
        _modeleService.post(modele).then(function(){
           $rootScope.$broadcast('modele.create');
        });
    };

    this.update = function(modele){
        modele.put().then(function(){
            $rootScope.$broadcast('modele.update');
        });
    };

    this.delete = function(modele){
        modele.remove().then(function(){
            $rootScope.$broadcast('modele.delete');
        });
    }
});