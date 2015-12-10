/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('EnableEmailController',['$scope','usSpinnerService','UserService','$stateParams','$state','$cookies',
    function($scope,usSpinnerService,UserService,$stateParams,$state,$cookies){

    	$scope.message = "Merci de patienter, vous serez redirigé après l'activation de votre adresse email...";
        usSpinnerService.spin('nt-spinner');

        UserService.enableEmail($stateParams.token).then(function(user){
            usSpinnerService.stop('nt-spinner');
            displayAlert('Votre compte a été avec succès','success',$scope);
            if($cookies.get('secret')){
                UserService.refresh(user);
                $state.go('nicetruc');
            }
            else{
                $state.go('login');
            }
        },function(response){
            angular.forEach(response.data.data, function(error){
            	$scope.message =error.texte;
            });
            usSpinnerService.stop('nt-spinner');
        });
        

}]);