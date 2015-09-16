/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('CategorieController',['$scope','CategorieService',function($scope,CategorieService){
    $scope.categories = CategorieService.list().$object;
    $scope.categorie = {};

    $scope.create = function(categorie){
        CategorieService.create(categorie);
        $scope.categorie = {};
    };

    $scope.update = function(categorie){
        categorie.visible = !categorie.visible;

    };

    $scope.valideUpdate = function(categorie){
        categorie.visible = !categorie.visible;
        CategorieService.update(categorie);

    };

    $scope.delete = function(categorie){
      CategorieService.delete(categorie);
    };


    $scope.$on('categorie.create',function(){
       refreshList();
    });

    $scope.$on('categorie.update',function(){
       refreshList();
    });

    $scope.$on('categorie.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.categories = CategorieService.list().$object;
    }
}]);