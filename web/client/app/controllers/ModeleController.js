/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ModeleController',['$scope','MarqueService','ModeleService','$window',function($scope,MarqueService,ModeleService,$window){
    $scope.marques = MarqueService.list().$object;
    $scope.modeles = ModeleService.list().$object;
    $scope.modele = {};

    $scope.create = function(modele){
        ModeleService.create(modele);
        $scope.modele = {};
        $scope.marque = {};
    };

    $scope.update = function(modele){
        modele.visible = !marque.modele;

    };

    $scope.valideUpdate = function(modele){
        modele.visible = !modele.visible;
        ModeleService.update(modele);

    };

    $scope.delete = function(modele){
        ModeleService.delete(modele);
    };


    $scope.$on('modele.create',function(){
       refreshList();
    });

    $scope.$on('modele.update',function(){
       refreshList();
    });

    $scope.$on('modele.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.modeles = ModeleService.list().$object;
    }
}]);