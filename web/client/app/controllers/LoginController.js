/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies','Digest','$window','$state','$rootScope','TokenHandler','usSpinnerService',
    function($scope,LoginService,$cookies,Digest,$window,$state,$rootScope,TokenHandler,usSpinnerService){

    $scope.login = function(user){
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
                    successRequest(response,$scope);

                    $rootScope.user = response.user;

                    $cookies.putObject('user',$rootScope.user);

                    usSpinnerService.stop('nt-spinner');
                    $state.go('nicetruc');

                },function(response){ //error checkLogin
                    usSpinnerService.stop('nt-spinner');
                    if(response.status==403){
                        response.data = [{texte:'Adresse email ou mot de passe incorrect','typeAlert':'danger'}];
                    }
                    else if(response.status==500){
                        response.data = [{texte:'Ooops,Erreur etonnante lors de la connexion','typeAlert':'danger'}];
                    }
                    errorRequest(response,$scope);
                });

            }, function (error) { //error cipher
                console.log(error);
            });
        },function(response){ //error getSalt
                usSpinnerService.stop('nt-spinner');
                if(response.status==500){
                    response.data = [{texte:'Ooops,Erreur etonnante lors de la connexion','typeAlert':'danger'}];
                }
                errorRequest(response,$scope);
            });
    }
}]);