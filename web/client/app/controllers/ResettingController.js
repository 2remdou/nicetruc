/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResettingController',['$scope','usSpinnerService',
    function($scope,usSpinnerService){

    $scope.resetting = function(email,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        
        $scope.formSubmit = false;
    };

    
    
}]);