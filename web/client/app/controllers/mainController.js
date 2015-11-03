/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','VoitureService','usSpinnerService',
                    function($scope,VoitureService,usSpinnerService)
{
    usSpinnerService.spin('nt-spinner');

    VoitureService.listVedette().then(function(response){
        $scope.voitures=response;
        usSpinnerService.stop('nt-spinner');
    });
}]);