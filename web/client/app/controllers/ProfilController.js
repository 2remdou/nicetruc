/**
 * Created by touremamadou on 13/09/2015.
 */

app.controller('ProfilController',['$scope','VilleService','QuartierService','$rootScope',
                        function($scope,VilleService,QuartierService,$rootScope){
    $scope.villes = VilleService.list().$object;
    $scope.quartiers = QuartierService.list().$object;
    console.log($rootScope.user.quartier.ville.id);
    $scope.selectVille = function(ville){
        $scope.quartiers = ville.quartiers;
    }
}]);