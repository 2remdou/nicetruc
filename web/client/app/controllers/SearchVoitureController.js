/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('SearchVoitureController',['$scope','SearchService','usSpinnerService','VoitureService',
    function($scope,SearchService,usSpinnerService,VoitureService){
        $scope.$emit('parameters.started.load');
        $scope.resultatRecherche=[];
        $scope.resultatRecherche = SearchService.getListResult();
        $scope.searchVoiture = function(search){
            usSpinnerService.spin('nt-spinner');
            SearchService.advancedSearch(angular.copy(search)).then(function(response){
                $scope.resultatRecherche = VoitureService.defineImagePrincipale(response.data.voitures);
                SearchService.setListResult($scope.resultatRecherche);
                usSpinnerService.stop('nt-spinner');

            },function(error){
                $scope.displayResult = false;
                SearchService.setListResult([])
          });
        };

        $scope.$watch('resultatRecherche', function() {
            if($scope.resultatRecherche)
            {
                $scope.resultatRecherche.length == 0 ? $scope.displayResult = false:$scope.displayResult=true;
            }
        })
}]);