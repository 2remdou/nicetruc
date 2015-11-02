/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','VoitureService','$rootScope',
    '$state','usSpinnerService',
    function($scope,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService
        ,VoitureService,$rootScope,$state,usSpinnerService){

        if(!$rootScope.hasAuthorized()){
            $state.go('nicetruc.login');
            return;
        }

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


    }]);