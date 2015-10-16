/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies','Digest','$window',function($scope,LoginService,$cookies,Digest,$window){

    $scope.login = function(user){
        email = $scope.user.email;
        password = $scope.user.password;

/*
        LoginService.login(user).then(function(response){
           console.log(response);
        });
*/

        LoginService.getSalt(email).then(function(response){
            var salt = response.salt;

            Digest.cipher(password, salt).then(function (secret) {
                // Display salt and secret for this example
                $scope.salt = salt;
                $scope.secret = secret;

                // Store auth informations in cookies for page refresh
                $cookies.put('email', email);
                $cookies.put('secret', $scope.secret);

                LoginService.checkLogin().then(function(response){
                    console.log(response);
                });

            }, function (err) {
                console.log(err);
            });
        });
    }
}]);