/**
 * Created by touremamadou on 13/09/2015.
 */

app.controller('ProfilController',['$scope','VilleService','QuartierService','$rootScope','UserService','Restangular','$state',
                        function($scope,VilleService,QuartierService,$rootScope,UserService,Restangular,$state){
    $scope.villes = VilleService.list().$object;
    $scope.quartiers = [];

    UserService.get($rootScope.user.id).then(function(response){
        if(!response) return;
        $scope.user = Restangular.restangularizeElement(response.parentResource,response.user,response.route);

        if($scope.user.quartier){
            $scope.user.ville=$scope.user.quartier.ville;

            $scope.quartiers.push($scope.user.quartier);
        }

    },function(response){
        errorRequest(response,$scope);
    })

    $scope.selectVille = function(ville){
        $scope.quartiers = ville.quartiers;
    };

    $scope.saveInfo = function(user){
        user.put().then(function(response){
            successRequest(response,$scope);

            $state.go('nicetruc');
        },function(response){
            errorRequest(response,$scope);
        });
    };

    $scope.changePassword = function(user){
        var newPass = UserService.changePassword(user);

        newPass.id=user.id;
        newPass.passwordActuel = user.passwordActuel;
        newPass.password = user.password;
        newPass.confirmationPassword = user.confirmationPassword;

        newPass.put().then(function(response){
            successRequest(response,$scope)
            $state.go('nicetruc');

        },function(response){
            errorRequest(response,$scope);
        });
    }


}]);