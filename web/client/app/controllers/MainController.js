/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','VoitureService','usSpinnerService','$state','Restangular','VoitureService','MarqueService',
    function($scope,VoitureService,usSpinnerService,$state,Restangular,VoitureService,MarqueService)
    {
        usSpinnerService.spin('nt-spinner');

        Restangular.all('parameters').customGET().then(function(response){
            var data = response.data;

            MarqueService.list().then(function(response){
                $scope.marques = response;
            });
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

        $scope.searchVoiture = function(search){
            usSpinnerService.spin('nt-spinner');
            if(!$scope.advancedSearch){
                key = search.key;
                Restangular.all('search').customGET(key).then(function(response){
                    $scope.voitures=VoitureService.defineImagePrincipale(response.data.voitures);
                    usSpinnerService.stop('nt-spinner');
                },function(error){
                    if(error.status === 404){
                        displayAlert('Aucune voiture ne correspond à votre recherche','info',$scope);
                    }
                    $scope.voitures=[];
                    usSpinnerService.stop('nt-spinner');
                })
            }
            else{
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
            }
        }
    }]);