/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies','Digest','$window','$state','$rootScope',
                'TokenHandler','usSpinnerService','UserService',
    function($scope,LoginService,$cookies,Digest,$window,$state,$rootScope,
        TokenHandler,usSpinnerService,UserService){

    $scope.login = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        TokenHandler.clearCredentials();
        var email = $scope.user.email;
        var password = $scope.user.password;

        UserService.getSalt(email)
            .then(function(response){
            var salt = response.salt;

            Digest.cipher(password, salt).then(function (secret) {
                // Display salt and secret for this example
                $scope.salt = salt;
                $scope.secret = secret;

                // Store auth informations in cookies for page refresh
                $cookies.put('email', email);
                $cookies.put('secret', $scope.secret);

                UserService.checkLogin().then(function(response){
                    UserService.refresh(response.user);
                    successRequest(response,$scope);
                    usSpinnerService.stop('nt-spinner');
                    $state.go('nicetruc');

                },function(response){ //error checkLogin
                        TokenHandler.clearCredentials();
                    usSpinnerService.stop('nt-spinner');
                    displayAlert('Adresse email ou mot de passe incorrect','danger',$scope);
                });

            }, function (error) { //error cipher

                console.log(error);
            });
        },function(response){ //error getSalt
                TokenHandler.clearCredentials();
                usSpinnerService.stop('nt-spinner');
                displayAlert('Adresse email ou mot de passe incorrect','danger',$scope);
            });

        $scope.formSubmit = false;
    };

    $scope.goToInscription = function(){
        $state.go('inscription');
    };

    $scope.goToPasswordForgotten = function(){
        $state.go('resetSendMail');
    };


}]);