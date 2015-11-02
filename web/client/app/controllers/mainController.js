/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','TokenHandler','$state','VoitureService','usSpinnerService',
                    function($scope,TokenHandler,$state,VoitureService,usSpinnerService)
{
    usSpinnerService.spin('nt-spinner');

    $scope.voitures = VoitureService.listVedette().$object;

    $scope.logout=function(){
        TokenHandler.clearCredentials();
        $state.go('nicetruc');
    };
}]);