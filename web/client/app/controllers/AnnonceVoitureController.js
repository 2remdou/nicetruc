/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','FileUploader','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','ImageService','VoitureService','$rootScope',
    function($scope,FileUploader,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService,
             ImageService,VoitureService,$rootScope){

        $scope.marques = MarqueService.list().$object;
        $scope.modeleMarques = ModeleMarqueService.list().$object;
        $scope.carburants = CarburantService.list().$object;
        $scope.boitiers = BoitierService.list().$object;


        $scope.selectMarque = function(marque){
            $scope.marque=marque;
            $scope.modeles=[];

            angular.forEach($scope.modeleMarques,function(modeleMarque){
                if(modeleMarque.marque.id===marque.id){
                    $scope.modeles.push(modeleMarque.modele);
                }
            })
        };

        $scope.selectModele = function(modele){
            $scope.modeleMarque = false;
            angular.forEach($scope.modeleMarques,function(modeleMarque){
                if(modeleMarque.marque.id===$scope.marque.id && modeleMarque.modele.id===modele.id){
                    $scope.modeleMarque=modeleMarque;
                }
            });
            if(!$scope.modeleMarque){
                $rootScope.$on('nicetruc.error',function(){
                    return 'Ce modele de voiture est invalide';
                });
                return;
            }
        };


        $scope.create = function(voiture){
            voiture.modeleMarque=$scope.modeleMarque;
            VoitureService.create(voiture);
            voiture={};

        }

    }]);