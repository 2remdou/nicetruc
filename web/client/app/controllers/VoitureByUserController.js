/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoitureByUserController',['$scope','usSpinnerService','VoitureService','$rootScope','$state',
    function($scope,usSpinnerService,VoitureService,$rootScope,$state){

        usSpinnerService.spin('nt-spinner');

        VoitureService.listByUser($rootScope.user.id).then(function(response){
           $scope.voitures = response.data;

            if($scope.voitures.length===0){
                var response={};
                response.data = [{texte:"Aucune Annonce pour le moment",'typeAlert':'info'}];
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
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