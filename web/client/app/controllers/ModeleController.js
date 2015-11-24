/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ModeleController',['$scope','MarqueService','ModeleService','usSpinnerService',
    function($scope,MarqueService,ModeleService,usSpinnerService){
    $scope.modeles = ModeleService.list().$object;
    $scope.modele = {};

    $scope.create = function(modele){
        usSpinnerService.spin('nt-spinner');
        ModeleService.create(modele);
        $scope.modele = {};
        $scope.marque = {};
    };

    $scope.update = function(modele){
        modele.visible = !marque.modele;

    };

    $scope.valideUpdate = function(modele){
        usSpinnerService.spin('nt-spinner');
        modele.visible = !modele.visible;
        ModeleService.update(modele);

    };

    $scope.delete = function(modele){
        usSpinnerService.spin('nt-spinner');
        ModeleService.delete(modele);
    };


    $scope.$on('modele.create',function(){
        displayAlert('Modele ajouté avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('modele.update',function(){
        displayAlert('Modele modifié avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('modele.delete',function(){
        displayAlert('Modele supprimé avec succès','success',$scope);
        refreshList();
    });



    var refreshList = function(){
        ModeleService.list().then(function(response){
            $scope.modeles = response;
            usSpinnerService.stop('nt-spinner');
        });
    }
}]);