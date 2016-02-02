/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('SearchVoitureController',['$scope','VoitureService','usSpinnerService',
    function($scope,VoitureService,usSpinnerService){

        $scope.searchVoiture = function(search){
            usSpinnerService.spin('nt-spinner');
            VoitureService.advancedSearch(angular.copy(search)).then(function(response){
                $scope.resultatRecherche = VoitureService.defineImagePrincipale(response.data.voitures);
                usSpinnerService.stop('nt-spinner');

            },function(error){
              log(error);
          });
        };

/*
        Restangular.all('search/advanced').post(angular.copy(search)).then(function(response){
            $scope.voitures=VoitureService.defineImagePrincipale(response.data.voitures);
            usSpinnerService.stop('nt-spinner');

        },function(error){
            if(error.status === 404){
                displayAlert('Aucune voiture ne correspond à votre recherche','info',$scope);
            }
            $scope.voitures=[];
            usSpinnerService.stop('nt-spinner');
        });
*/

}]);