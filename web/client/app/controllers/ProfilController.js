/**
 * Created by touremamadou on 13/09/2015.
 */

app.controller('ProfilController',['$scope','VilleService','QuartierService',function($scope,VilleService,QuartierService){
    $scope.villes = VilleService.list().$object;
    $scope.quartiers = QuartierService.list().$object;

    $scope.selectVille = function(ville){
        $scope.quartiers = ville.quartiers;
    }
}]);