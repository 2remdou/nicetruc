/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('VoitureService',function($rootScope,Restangular){

    var _voitureService = Restangular.all('voitures/');

    this.list = function(){
        $rootScope.$broadcast('voiture.list');
        return _voitureService.getList();
    }

    this.create = function(voiture){
        _voitureService.post(voiture).then(function(){
            $rootScope.$broadcast('voiture.create');
        });
    };

    this.update = function(voiture){
        voiture.put().then(function(){
           $rootScope.$broadcast('voiture.update');
        });
    };

    this.delete = function(voiture){
        voiture.remove().then(function(){
            $rootScope.$broadcast('voiture.delete');
        })
    }
});