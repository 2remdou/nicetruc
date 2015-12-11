/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResettingController',['$scope','usSpinnerService','UserService','$stateParams','$state',
    function($scope,usSpinnerService,UserService,$stateParams,$state){

    $scope.resetting = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');

        UserService.resetting($stateParams.token,$scope.user.password).then(function(response) {
            angular.forEach(response.data, function(message){
                displayAlert(message.texte,message.typeAlert,$scope);
            });
            usSpinnerService.stop('nt-spinner');
            $state.go('login');
        },function(response){
            log(response);
            usSpinnerService.stop('nt-spinner');
        });
        
        $scope.formSubmit = false;
    };

    
    
}]);