/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResetCheckTokenController',['$scope','usSpinnerService','UserService','$stateParams',
    function($scope,usSpinnerService,UserService,$stateParams){

        usSpinnerService.spin('nt-spinner');

        UserService.resetCheckToken($stateParams.token).then(function(response){
            log(response);
            usSpinnerService.stop('nt-spinner');
        },function(response){
            log(response);
        });
        

}]);