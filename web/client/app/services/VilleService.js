/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('VilleService',
    ['$rootScope','Restangular',
    function($rootScope,Restangular){
        var that = this;

        var _villeService = Restangular.all('villes/');
        var villes=[];

        this.getVilles = function(){
            return that.villes;
        };

        this.setVilles = function(villes){
            that.villes=villes;
        };

        this.list = function(){
            $rootScope.$broadcast('ville.list');
            return _villeService.getList();
        }

        this.create = function(ville){
            _villeService.post(ville).then(function(){
                $rootScope.$broadcast('ville.create');
            });
        };

        this.update = function(ville){
            if(ville.hasOwnProperty('quartiers')){
                delete ville.quartiers;
            }
            ville.put().then(function(){
               $rootScope.$broadcast('ville.update');
            });
        };

        this.delete = function(ville){
            ville.remove().then(function(){
                $rootScope.$broadcast('ville.delete');
            })
        };
}]);