/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('BestOfController',['$scope','VoitureService',
    function($scope,VoitureService)
    {
        VoitureService.get(2).then(function(response){
            $scope.voiture = response;
            log($scope.voiture);
        });
    }]);