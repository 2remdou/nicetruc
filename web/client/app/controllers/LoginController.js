/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies','Digest','$window','$state','$rootScope',
                'TokenHandler','usSpinnerService','UserService','AuthService',
    function($scope,LoginService,$cookies,Digest,$window,$state,$rootScope,
        TokenHandler,usSpinnerService,UserService,AuthService){

    $scope.login = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        AuthService.clear();
        UserService.login($scope.user).then(
        function(response){
            log(response);
            AuthService.setToken(response.token);
            AuthService.setUser(JSON.parse(response.data.user));
            UserService.refresh();
            displayAlert('Salut '+$rootScope.user.nomUser+', super content de vous revoir','success',$scope);
            usSpinnerService.stop('nt-spinner');
            $state.go('nicetruc');
        },function(error){
            TokenHandler.clearCredentials();
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