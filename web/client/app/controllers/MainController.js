/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','VoitureService','usSpinnerService','$state','Restangular',
    function($scope,VoitureService,usSpinnerService,$state,Restangular)
    {
        usSpinnerService.spin('nt-spinner');

        Restangular.all('parameters').customGET().then(function(response){
            var data = response.data;
            $scope.marques = data.marques;
            //$scope.modeles = data.modeles;
            $scope.boitiers = data.boitiers;
            $scope.carburants = data.carburants;
        });
        $scope.advancedSearchText = 'Recherche avancée';


        VoitureService.listVedette().then(function(response){
            angular.forEach(response.data,function(voiture){
                if(!voiture.imagePrincipale){
                    voiture.imagePrincipale = {downloadUrl: voiture.defaultPathImagePrincipale,imageName: "defaultVoiture.jpg"};
                }
            });
            $scope.voitures=response.data;
            usSpinnerService.stop('nt-spinner');
        },function(){
            usSpinnerService.stop('nt-spinner');
        });

        $scope.showVoiture = function(voitureId){
            $state.go('showVoiture',{voitureId:voitureId});
        };

        $scope.advanced = function(){
            $scope.advancedSearch = ! $scope.advancedSearch;
            if($scope.advancedSearch) {
                $scope.advancedSearchText = 'Reduire';
            }
            else {
                $scope.advancedSearchText = 'Recherche avancée';
            }
        };

        $scope.selectMarque = function(marque){
            if(!marque) return;
            $scope.modeles=marque.modeles;
        };
    }]);