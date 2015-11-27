/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('CategorieController',['$scope','CategorieService','usSpinnerService',
                function($scope,CategorieService,usSpinnerService){


     usSpinnerService.spin('nt-spinner');
    CategorieService.list().then(function(response){
        $scope.categories = response;
         usSpinnerService.stop('nt-spinner');
    });
    $scope.categorie = {};

    $scope.create = function(categorie){
        usSpinnerService.spin('nt-spinner');
        CategorieService.create(categorie);
        $scope.categorie = {};
    };

    $scope.update = function(categorie){
        categorie.visible = !categorie.visible;

    };

    $scope.valideUpdate = function(categorie){
        usSpinnerService.spin('nt-spinner');
        categorie.visible = !categorie.visible;
        CategorieService.update(categorie);

    };

    $scope.delete = function(categorie){
        usSpinnerService.spin('nt-spinner');
      CategorieService.delete(categorie);
    };


    $scope.$on('categorie.create',function(){
        displayAlert('Categorie ajoutée avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('categorie.update',function(){
        displayAlert('Categorie modifiée avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('categorie.delete',function(){
        displayAlert('Categorie supprimée avec succès','success',$scope);
       refreshList();
    });



    var refreshList = function(){
        CategorieService.list().then(function(response){
            $scope.categories = response;
            usSpinnerService.stop('nt-spinner');
        });

    }
}]);