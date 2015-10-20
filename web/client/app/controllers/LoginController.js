/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies','Digest','$window','$state','$rootScope',
    function($scope,LoginService,$cookies,Digest,$window,$state,$rootScope){

    $scope.login = function(user){
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

                    $state.go('nicetruc');

                },function(response){
                    errorRequest(response,$scope);
                });

            }, function (err) {
                console.log(err);
            });
        });
    }
}]);