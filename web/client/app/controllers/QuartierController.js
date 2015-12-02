/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('QuartierController',['$scope','VilleService','QuartierService','usSpinnerService',
    function($scope,VilleService,QuartierService,usSpinnerService){

    usSpinnerService.spin('nt-spinner');
    $scope.quartiers = QuartierService.list().$object;
    VilleService.list().then(function(response){
        $scope.villes = response;
        usSpinnerService.stop('nt-spinner');
    });
    $scope.quartier = {};

    $scope.create = function(quartier,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        QuartierService.create(quartier);
        $scope.formSubmit=false;
        $scope.quartier = {};
        $scope.ville = {};
    };

    $scope.update = function(quartier){
        quartier.visible = !ville.quartier;

    };

    $scope.valideUpdate = function(quartier,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        quartier.visible = !quartier.visible;
        QuartierService.update(quartier);
        $scope.upformSubmit=false;

    };

    $scope.delete = function(quartier){
        usSpinnerService.spin('nt-spinner');
        QuartierService.delete(quartier);
    };


    $scope.$on('quartier.create',function(){
        displayAlert('Quartier ajouté avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('quartier.update',function(){
        displayAlert('Quartier modifié avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('quartier.delete',function(){
        displayAlert('Quartier supprimé avec succès','success',$scope);
        refreshList();
    });



    var refreshList = function(){
        QuartierService.list().then(function(response){
            $scope.quartiers = response;
            usSpinnerService.stop('nt-spinner');
        });


    }
}]);