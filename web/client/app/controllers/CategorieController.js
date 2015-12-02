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

    $scope.create = function(categorie,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        CategorieService.create(categorie);
        $scope.formSubmit=false;
        $scope.categorie = {};
    };

    $scope.update = function(categorie){
        categorie.visible = !categorie.visible;

    };

    $scope.valideUpdate = function(categorie,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        categorie.visible = !categorie.visible;
        CategorieService.update(categorie);
        $scope.upformSubmit=false;

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