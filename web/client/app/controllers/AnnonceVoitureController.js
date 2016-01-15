/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','VoitureService','$rootScope',
    '$state','usSpinnerService','MarqueService',
    'BoitierService','CarburantService',
    function($scope,VoitureService,$rootScope,$state,usSpinnerService,
        MarqueService,BoitierService,CarburantService){

        $scope.formSubmit = false;

        $scope.$emit('parameters.started.load');

        var loadParameters = function(){
            log(MarqueService.getMarques());
            $scope.marques = MarqueService.getMarques();
            $scope.boitiers = BoitierService.getBoitiers();
            $scope.carburants = CarburantService.getCarburants();
            $scope.voituresEnVedette = VoitureService.getVoituresEnVedette();
            usSpinnerService.stop('nt-spinner');

        }
        
        $scope.$on('parameters.completed.load',function(){
            loadParameters();
        });

        $scope.$on('parameters.already.load',function(){
            loadParameters();
            log('parameters.already.load');
        });


        $scope.selectMarque = function(marque){
            if(!marque) return;
            $scope.modeles=marque.modeles;
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