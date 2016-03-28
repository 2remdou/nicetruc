/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('CategorieService',['$rootScope','Restangular',function($rootScope,Restangular){

    var that = this;
    var _categorieService = Restangular.all('categories/');
    var categories;

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

    this.setCategories = function(categories){
        that.categories = categories;
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
}]);