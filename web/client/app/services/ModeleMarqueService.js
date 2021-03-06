/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('ModeleMarqueService',['$rootScope','Restangular',
    function($rootScope,Restangular){

    var _modelemarqueService = Restangular.all('modelemarques/');
    var nextPage=1;

    this.list = function(){
        $rootScope.$broadcast('modeleMarque.liste');
        return _modelemarqueService.getList();
    };

    this.listWithPagination = function(){
        return _modelemarqueService.one('page',nextPage).get();
    };

    this.create = function(modelemarque){
        _modelemarqueService.post(modelemarque).then(function(){
           $rootScope.$broadcast('modeleMarque.create');
        });
    };

    this.update = function(modelemarque){
        modelemarque.put().then(function(){
            $rootScope.$broadcast('modeleMarque.update');
        });
    };

    this.delete = function(modelemarque){
        modelemarque.remove().then(function(){
            $rootScope.$broadcast('modeleMarque.delete');
        });
    };

    this.getId= function(marque,modele){
       return _modelemarqueService.one('marques',marque).one('modeles',modele).get();
    };

    this.getNextPage = function(){
        return  nextPage;
    };

    this.setNextPage = function($nextPage){
        nextPage=parseInt($nextPage);
    };
}]);