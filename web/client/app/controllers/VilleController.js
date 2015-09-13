/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VilleController',['$scope','VilleService',function($scope,VilleService){
    $scope.villes = VilleService.list().$object;
    $scope.ville = {};

    $scope.create = function(ville){
        VilleService.create(ville);
        $scope.ville = {};
    };

    $scope.update = function(ville){
        ville.visible = !ville.visible;

    };

    $scope.valideUpdate = function(ville){
        ville.visible = !ville.visible;
        VilleService.update(ville);

    };

    $scope.delete = function(ville){
      VilleService.delete(ville);
    };


    $scope.$on('ville.create',function(){
       refreshList();
    });

    $scope.$on('ville.update',function(){
       refreshList();
    });

    $scope.$on('ville.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.villes = VilleService.list().$object;
    }
}]);