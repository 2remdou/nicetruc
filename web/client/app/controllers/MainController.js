/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','VoitureService','usSpinnerService',
    '$state','Restangular','VoitureService','MarqueService','BoitierService',
    'CarburantService',
    function($scope,VoitureService,usSpinnerService,$state,Restangular,
        VoitureService,MarqueService,BoitierService,CarburantService)
    {
        usSpinnerService.spin('nt-spinner');

        $scope.$emit('parameters.started.load');
        
        var loadParameters = function(){
            $scope.marques = MarqueService.getMarques();
            $scope.boitiers = BoitierService.getBoitiers();
            $scope.carburants = CarburantService.getCarburants();
            $scope.voituresEnVedette = VoitureService.getVoituresEnVedette();
            usSpinnerService.stop('nt-spinner');

        };
        
        $scope.$on('parameters.completed.load',function(){
            loadParameters();
        });

        $scope.$on('parameters.already.load',function(){
            loadParameters();
        });


        $scope.advancedSearchText = 'Recherche avancée';

        
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
                if(search){
                    key = search.key;
                }
                else{
                    key='';
                }

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