/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoitureByUserController',
    ['$scope','usSpinnerService','VoitureService','$state','$stateParams',
    function($scope,usSpinnerService,VoitureService,$state,$stateParams){


        if(!$stateParams.idUser){
            return;
        }
        usSpinnerService.spin('nt-spinner');
        
        VoitureService.listByUser($stateParams.idUser).then(function(response){
           $scope.voitures = VoitureService.defineImagePrincipale(response.voitures);
            if($scope.voitures.length===0){
                displayAlert("Aucune Annonce pour le moment pour cet utilisateur",'info',$scope);
                usSpinnerService.stop('nt-spinner');
            }else{
                $scope.user = response.user;
                $scope.isLoaded = true;
            }

            angular.forEach(response.data,function(voiture){
                if(!voiture.imagePrincipale){
                    voiture.imagePrincipale = {downloadUrl: voiture.defaultPathImagePrincipale,imageName: "defaultVoiture.jpg"};
                }
            });
            usSpinnerService.stop('nt-spinner');
        });

        $scope.showVoiture = function(voitureId){
            $state.go('showVoiture',{voitureId:voitureId});
        };

    }]);