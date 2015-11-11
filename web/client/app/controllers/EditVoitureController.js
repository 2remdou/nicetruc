/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('EditVoitureController',['$scope','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','VoitureService','$rootScope',
    '$state','usSpinnerService','$stateParams','FileUploader','ngDialog',
    function($scope,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService
        ,VoitureService,$rootScope,$state,usSpinnerService,$stateParams,FileUploader,ngDialog){

        if(!$rootScope.hasAuthorized()){
            $state.go('nicetruc.login');
            return;
        }

        uploader=$scope.uploader = new FileUploader({
            url : Routing.generate('nicetruc_image',{id:$stateParams.voitureId})
        });

        usSpinnerService.spin('nt-spinner');

        $scope.modeles = [];
        VoitureService.get($stateParams.voitureId).then(function(responseVoiture){
            MarqueService.list().then(function(response){
                $scope.marques=response;
                ModeleMarqueService.list().then(function(response){
                    $scope.modeleMarques = response;

                    CarburantService.list().then(function(response){
                        $scope.carburants=response;

                        BoitierService.list().then(function(response){
                            $scope.boitiers=response;

                            $scope.voiture = responseVoiture;

                            $scope.voiture.marque = $scope.voiture.modeleMarque.marque;
                            $scope.modeles=$scope.voiture.modeleMarque.marque.modeles;
                            $scope.voiture.modele = $scope.voiture.modeleMarque.modele;

                            usSpinnerService.stop('nt-spinner');
                        });
                    });
                });
            });
        });




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
                message = [{texte:"Ce modele de voiture est invalide",'typeAlert':'danger'}];
                scope.$emit('showMessage',message);
                return;
            }
        };


        $scope.create = function(voiture){
            usSpinnerService.spin('nt-spinner');
            voiture.modeleMarque=$scope.modeleMarque;
            voiture.user = $rootScope.user.id;
            voiture.categorie = 1; //voiture

            VoitureService.create(voiture).then(function(response){

                var idVoiture = response.id;
                voiture={};
                response.data = [{texte:"Votre annonce a été ajouté avec succes",'typeAlert':'success'}];
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
                $state.go('nicetruc.imageAnnonceVoiture',{voitureId:idVoiture});
            });

        };

        $scope.removeImage = function(imageId){

        };


    }]);