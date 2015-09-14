/**
 * Created by touremamadou on 13/09/2015.
 */

app.controller('ProfileController',['$scope','VilleService','QuartierService',function($scope,VilleService,QuartierService){
    $scope.villes = VilleService.list().$object;
    $scope.quartiers = QuartierService.list().$object;

    $scope.changeVille = function(ville){
        $scope.quartiers = ville.quartiers;
    }
}]);