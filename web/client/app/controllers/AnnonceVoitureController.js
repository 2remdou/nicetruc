/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','VoitureService','$rootScope',
    '$state','usSpinnerService','filterFilter',
        function($scope,VoitureService,$rootScope,$state,usSpinnerService,filterFilter
        ){

        usSpinnerService.spin('nt-spinner');
        $scope.formSubmit = false;

        $scope.$emit('parameters.started.load');


        $rootScope.$on('parameters.completed.load',function(){
            $scope.marques = $rootScope.marques;
            $scope.boitiers = $rootScope.boitiers;
            $scope.carburants = $rootScope.carburants;
            $scope.categories = $rootScope.categories;
            $scope.voituresEnVedette = $rootScope.voituresEnVedette;
            usSpinnerService.stop('nt-spinner');
        });


        $scope.selectMarque = function(marque){
            if(!marque) return;
            $scope.modeles=marque.modeles;
        };

        $scope.create = function(voiture,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;
            usSpinnerService.spin('nt-spinner');
            voiture.modeleMarque=voiture.modele.modeleMarque;

            voiture.user = $rootScope.user;
            voiture.categorie = filterFilter($scope.categories,{libelleCategorie:'Voiture'})[0]; //voiture
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