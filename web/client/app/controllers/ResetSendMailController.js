/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResettingController',['$scope','usSpinnerService','UserService',
    function($scope,usSpinnerService,UserService){

    $scope.resetting = function(email,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');

        UserService.resetMail(email).then(function(response) {
            log(response);
            usSpinnerService.stop('nt-spinner');
        },function(response){
            angular.forEach(response.data.data, function(message){
                displayAlert(message.texte,message.typeAlert,$scope);
            });
        });
        
        $scope.formSubmit = false;
    };

    
    
}]);