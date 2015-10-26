/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('CategorieService',function($rootScope,Restangular){

    var _categorieService = Restangular.all('categories/');

    this.list = function(){
        $rootScope.$broadcast('categorie.list');
        return _categorieService.getList();
    };

    this.getByLibelle = function(libelleCategorie){
      return _categorieService.one(libelleCategorie).get();
    };

    this.create = function(categorie){
        _categorieService.post(categorie).then(function(){
            $rootScope.$broadcast('categorie.create');
        });
    };

    this.update = function(categorie){
        categorie.put().then(function(){
           $rootScope.$broadcast('categorie.update');
        });
    };

    this.delete = function(categorie){
        categorie.remove().then(function(){
            $rootScope.$broadcast('categorie.delete');
        })
    }
});