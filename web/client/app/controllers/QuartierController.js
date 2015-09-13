/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('QuartierController',['$scope','VilleService','QuartierService',function($scope,VilleService,QuartierService){
    $scope.villes = VilleService.list().$object;
    $scope.quartiers = QuartierService.list().$object;
    $scope.quartier = {};

    $scope.create = function(quartier){
        QuartierService.create(quartier);
        $scope.quartier = {};
        $scope.ville = {};
    };

    $scope.update = function(quartier){
        quartier.visible = !ville.quartier;

    };

    $scope.valideUpdate = function(quartier){
        quartier.visible = !quartier.visible;
        QuartierService.update(quartier);

    };

    $scope.delete = function(quartier){
        QuartierService.delete(quartier);
    };


    $scope.$on('quartier.create',function(){
       refreshList();
    });

    $scope.$on('quartier.update',function(){
       refreshList();
    });

    $scope.$on('quartier.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.quartiers = QuartierService.list().$object;
    }
}]);