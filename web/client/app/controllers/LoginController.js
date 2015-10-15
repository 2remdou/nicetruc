/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService','$cookies',function($scope,LoginService,$cookies){

    $scope.login = function(user){
        email = $scope.user.email;
        password = $scope.user.password;

        LoginService.login(user).then(function(response){
           console.log(response);
        });
    }
}]);