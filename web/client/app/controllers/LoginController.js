/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies','Digest','$window','$state','$rootScope',
                'TokenHandler','usSpinnerService',
    function($scope,LoginService,$cookies,Digest,$window,$state,$rootScope,TokenHandler,usSpinnerService){

    $scope.login = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        TokenHandler.clearCredentials();
        var email = $scope.user.email;
        var password = $scope.user.password;

        LoginService.getSalt(email)
            .then(function(response){
            var salt = response.salt;

            Digest.cipher(password, salt).then(function (secret) {
                // Display salt and secret for this example
                $scope.salt = salt;
                $scope.secret = secret;

                // Store auth informations in cookies for page refresh
                $cookies.put('email', email);
                $cookies.put('secret', $scope.secret);

                LoginService.checkLogin().then(function(response){
                    $rootScope.user = response.user;
                    successRequest(response,$scope);
                    $cookies.putObject('user',$rootScope.user);

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