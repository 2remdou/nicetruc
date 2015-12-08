/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResetCheckTokenController',['$scope','usSpinnerService','UserService',
    function($scope,usSpinnerService,UserService){

        usSpinnerService.spin('nt-spinner');

        

        usSpinnerService.stop('nt-spinner');
        
    
    
}]);