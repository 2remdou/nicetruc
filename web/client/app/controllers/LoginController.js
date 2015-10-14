/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','LoginService',function($scope,LoginService){

    $scope.login = function(user){
        LoginService.login(user).then(function(response){
            console.log(response);
        });
    }
}]);