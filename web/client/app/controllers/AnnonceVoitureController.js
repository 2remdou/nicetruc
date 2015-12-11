/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','VoitureService','$rootScope',
    '$state','usSpinnerService',
    function($scope,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService
        ,VoitureService,$rootScope,$state,usSpinnerService){

        $scope.formSubmit = false;
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
            if(!modele){
                return;
            }
            $scope.modeleMarque = false;
            angular.forEach($scope.modeleMarques,function(modeleMarque){
                if(modeleMarque.marque.id===$scope.marque.id && modeleMarque.modele.id===modele.id){
                    $scope.modeleMarque=modeleMarque;
                }
            });
            if(!$scope.modeleMarque){
                displayAlert("Ce modele de voiture est invalide",'danger',$scope);
                return;
            }
        };


        $scope.create = function(voiture,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;
            usSpinnerService.spin('nt-spinner');
            voiture.modeleMarque=$scope.modeleMarque;

            voiture.user = $rootScope.user;
            voiture.categorie = 1; //voiture
            VoitureService.create(angular.copy(voiture)).then(function(response){

                var idVoiture = response.id;
                displayAlert("Votre annonce a été ajouté avec succes",'success',$scope);
                usSpinnerService.stop('nt-spinner');
                $state.go('imageAnnonceVoiture',{voitureId:idVoiture});
            },function(error){
                displayAlert("Erreur lors de la publication de l'annonce",'danger',$scope);
                usSpinnerService.stop('nt-spinner');
            });
            $scope.formSubmit = false;

        };


    }]);