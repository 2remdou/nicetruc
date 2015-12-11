/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','VoitureService','usSpinnerService','$state',
    function($scope,VoitureService,usSpinnerService,$state)
    {
        usSpinnerService.spin('nt-spinner');


        VoitureService.listVedette().then(function(response){
            angular.forEach(response.data,function(voiture){
                if(!voiture.imagePrincipale){
                    voiture.imagePrincipale = {webPath: "client/app/images/defaultVoiture.png",imageName: "defaultVoiture.jpg"};
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
    }]);