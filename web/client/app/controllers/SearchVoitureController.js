/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('SearchVoitureController',['$scope','SearchService','usSpinnerService','VoitureService','$filter',
    function($scope,SearchService,usSpinnerService,VoitureService,$filter){

        $scope.$emit('parameters.started.load');
        $scope.resultatRecherche= SearchService.getListResult();

        $scope.$on('search.completed', function(){
            $scope.resultatRecherche = SearchService.getListResult();
        });
        
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
        });

        $scope.sortByPrix = function(){
            if($scope.prixCroissant){
                $scope.resultatRecherche=$filter('orderBy')($scope.resultatRecherche,'prix');
            }
            else{
                $scope.resultatRecherche=$filter('orderBy')($scope.resultatRecherche,'-prix');
            }
            SearchService.setListResult($scope.resultatRecherche);
            $scope.prixCroissant = !$scope.prixCroissant;
        };

        $scope.sortByKmParcouru = function(){
            if($scope.kmCroissant){
                $scope.resultatRecherche=$filter('orderBy')($scope.resultatRecherche,'kmParcouru');
            }
            else{
                $scope.resultatRecherche=$filter('orderBy')($scope.resultatRecherche,'-kmParcouru');
            }
            SearchService.setListResult($scope.resultatRecherche);

            $scope.kmCroissant = !$scope.kmCroissant;
        }
}]);