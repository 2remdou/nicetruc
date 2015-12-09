/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('EnableEmailController',['$scope','usSpinnerService','UserService','$stateParams','$state',
    function($scope,usSpinnerService,UserService,$stateParams,$state){

    	$scope.message = "Merci de patienter, vous serez redirigé après l'activation de votre adresse email...";
        usSpinnerService.spin('nt-spinner');

        UserService.enableEmail($stateParams.token).then(function(response){
            log(response);
            usSpinnerService.stop('nt-spinner');
            $state.go('nicetruc.main');
        },function(response){
            log(response);
            angular.forEach(response.data.error.exception, function(error){
            	$scope.message =error.message;
            });
        });
        

}]);