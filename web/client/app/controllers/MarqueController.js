/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MarqueController',['$scope','MarqueService','usSpinnerService',
    function($scope,MarqueService,usSpinnerService){

    usSpinnerService.spin('nt-spinner');
    MarqueService.list().then(function(response){
        $scope.marques = response;
        usSpinnerService.stop('nt-spinner');
    });
    $scope.marque = {};

    $scope.create = function(marque,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        MarqueService.create(marque);
        $scope.formSubmit=false;
        $scope.marque = {};
    };

    $scope.update = function(marque){
        marque.visible = !marque.visible;

    };

    $scope.valideUpdate = function(marque,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        marque.visible = !marque.visible;
        MarqueService.update(marque);
        $scope.upformSubmit=false;

    };

    $scope.delete = function(marque){
        usSpinnerService.spin('nt-spinner');
        MarqueService.delete(marque);
    };


    $scope.$on('marque.create',function(){
        displayAlert('Marque ajoutée avec succès','success',$scope);
       refreshList();
    });

    $scope.$on('marque.update',function(){
        displayAlert('Marque modifiée avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('marque.delete',function(){
        displayAlert('Marque supprimée avec succès','success',$scope);
        refreshList();
    });



    var refreshList = function(){
        MarqueService.list().then(function(response){
            $scope.marques = response;
            usSpinnerService.stop('nt-spinner');

        });
    }
}]);