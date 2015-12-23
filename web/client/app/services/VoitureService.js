/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('VoitureService',['$rootScope','Restangular',function($rootScope,Restangular){

    var _voitureService = Restangular.all('voitures/');

    this.list = function(){
        return _voitureService.getList();
    };

    this.listVedette = function(){
        return _voitureService.one('vedette').get();
    };

    this.listByUser= function(userId){
        return _voitureService.one('users',userId).get();
    };

    this.get = function(id){
        return _voitureService.one(id).get();
    }

    this.create = function(voiture){
        return _voitureService.post(voiture);
    };

    this.update = function(voiture){
        return voiture.put();
    };

    this.delete = function(voiture){
        voiture.remove().then(function(){
            $rootScope.$broadcast('voiture.delete');
        })
    }
}]);