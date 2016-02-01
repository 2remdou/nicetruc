/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('ModeleService',['$rootScope','Restangular','$q','InfoParametersService',
    function($rootScope,Restangular,$q,InfoParametersService){

    var that = this;
    var _modeleService = Restangular.all('modeles/');
    var modeles=[];
    var nextPage=1;

    this.list = function(){
        $rootScope.$broadcast('modele.list');
        return _modeleService.getList();
    };

    this.listWithPagination = function(){
        return _modeleService.one('page',nextPage).get();
    };

    this.getModeles = function(){
        if(InfoParametersService.isLoad())
            return that.modeles;
        else{
            InfoParametersService.loadParameters();
        }
    };

    this.setModeles = function(modeles){
        that.modeles=modeles;
    };

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
    };

    this.getNextPage = function(){
        return  nextPage;
    };

    this.setNextPage = function($nextPage){
        nextPage=parseInt($nextPage);
    };
}]);