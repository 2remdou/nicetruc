/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('CarburantController',['$scope','CarburantService','usSpinnerService',
    function($scope,CarburantService,usSpinnerService){

    usSpinnerService.spin('nt-spinner');
    CarburantService.list().then(function(response){
        $scope.carburants = response;
        usSpinnerService.stop('nt-spinner');
    });
    $scope.carburant = {};

    $scope.create = function(carburant,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        CarburantService.create(carburant);
        $scope.formSubmit=false;
        $scope.carburant = {};
    };

    $scope.update = function(carburant){
        carburant.visible = !carburant.visible;

    };

    $scope.valideUpdate = function(carburant,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        carburant.visible = !carburant.visible;
        CarburantService.update(carburant);
        $scope.upformSubmit=false;

    };

    $scope.delete = function(carburant){
        usSpinnerService.spin('nt-spinner');
      CarburantService.delete(carburant);
    };


    $scope.$on('carburant.create',function(){
        displayAlert('Carburant ajoutée avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('carburant.update',function(){
        displayAlert('Carburant modifié avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('carburant.delete',function(){
        displayAlert('Carburant supprimé avec succès','success',$scope);
       refreshList();
    });



    var refreshList = function(){
        CarburantService.list().then(function(response){
            $scope.carburants = response;
            usSpinnerService.stop('nt-spinner');
        });
    }
}]);