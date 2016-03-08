/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','$state','$rootScope',
                'usSpinnerService','UserService','AuthService',
    function($scope,$state,$rootScope,
        usSpinnerService,UserService,AuthService){

    $scope.login = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        AuthService.clear();
        UserService.login($scope.user).then(
            function(response){
                AuthService.authenticated(response);
                displayAlert('Salut '+$rootScope.user.nomUser+', super content de vous revoir','success',$scope);
                usSpinnerService.stop('nt-spinner');
                $state.go('nicetruc');
            },function(error){
                AuthService.clear();
                usSpinnerService.stop('nt-spinner');
                displayAlert('Adresse email ou mot de passe incorrect','danger',$scope);
                log(error);
        });
        var email = $scope.user.email;
        var password = $scope.user.password;

        $scope.formSubmit = false;
    };

    $scope.goToInscription = function(){
        $state.go('inscription');
    };

    $scope.goToPasswordForgotten = function(){
        $state.go('resetSendMail');
    };


}]);