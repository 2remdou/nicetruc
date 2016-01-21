/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoituresEnVedetteController',['$scope','usSpinnerService','VoitureService','$rootScope','$state',
    function($scope,usSpinnerService,VoitureService,$rootScope,$state){

        usSpinnerService.spin('nt-spinner');

        VoitureService.list().then(function(response){
           $scope.voitures = VoitureService.defineImagePrincipale(response.data);

            usSpinnerService.stop('nt-spinner');
        });
    }]);