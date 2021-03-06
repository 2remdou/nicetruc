/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VilleController',['$scope','VilleService','usSpinnerService',function($scope,VilleService,usSpinnerService){


    usSpinnerService.spin('nt-spinner');
    VilleService.list().then(function(response){
        $scope.villes = response;
        usSpinnerService.stop('nt-spinner');
    });
    $scope.ville = {};

    $scope.create = function(ville,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        VilleService.create(ville);
        $scope.formSubmit=false;
        $scope.ville = {};
    };

    $scope.update = function(ville){
        ville.visible = !ville.visible;

    };

    $scope.valideUpdate = function(ville,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        ville.visible = !ville.visible;
        VilleService.update(ville);
        $scope.upformSubmit=false;

    };

    $scope.delete = function(ville){
        usSpinnerService.spin('nt-spinner');
      VilleService.delete(ville);
    };


    $scope.$on('ville.create',function(){
        displayAlert('Ville ajoutée avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('ville.update',function(){
        displayAlert('Ville modifiée avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('ville.delete',function(){
        displayAlert('Ville supprimée avec succès','success',$scope);
        refreshList();
    });



    var refreshList = function(){
        VilleService.list().then(function(response){
            $scope.villes = response;
            usSpinnerService.stop('nt-spinner');
        });
    }
}]);