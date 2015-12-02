/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('BoitierController',['$scope','BoitierService','usSpinnerService',
    function($scope,BoitierService,usSpinnerService){
        usSpinnerService.spin('nt-spinner');
    BoitierService.list().then(function(response){
        $scope.boitiers = response;
        usSpinnerService.stop('nt-spinner');
    });
    $scope.boitier = {};

    $scope.create = function(boitier,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        BoitierService.create(angular.copy(boitier));
        $scope.formSubmit=false;
        $scope.boitier = {};
    };

    $scope.update = function(boitier){
        boitier.visible = !boitier.visible;

    };

    $scope.valideUpdate = function(boitier,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        boitier.visible = !boitier.visible;
        BoitierService.update(boitier);
        $scope.upformSubmit=false;

    };

    $scope.delete = function(boitier){
        usSpinnerService.spin('nt-spinner');
      BoitierService.delete(boitier);
    };


    $scope.$on('boitier.create',function(){
        displayAlert('Boitier ajouté avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('boitier.update',function(){
        displayAlert('Boitier modifié avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('boitier.delete',function(){
        displayAlert('Boitier supprimé avec succès','success',$scope);
       refreshList();
    });



    var refreshList = function(){
        BoitierService.list().then(function(response){
            $scope.boitiers = response;
            usSpinnerService.stop('nt-spinner');
        });
    }
}]);