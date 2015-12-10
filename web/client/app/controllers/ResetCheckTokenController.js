/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResetCheckTokenController',['$scope','usSpinnerService','UserService','$stateParams','$state',
    function($scope,usSpinnerService,UserService,$stateParams,$state){

    	$scope.message = 'Merci de patienter, vous serez redirigé sur la page réinitialisation dans un instant ...';
        usSpinnerService.spin('nt-spinner');

        UserService.resetCheckToken($stateParams.token).then(function(response){
            usSpinnerService.stop('nt-spinner');
            $state.go('nicetruc.resetting',{token:$stateParams.token});
        },function(response){
            angular.forEach(response.data.data, function(error){
            	displayAlert(error.texte,error.typeAlert,$scope);
            	$scope.message =error.texte;
            });
            usSpinnerService.stop('nt-spinner');
        });
        

}]);