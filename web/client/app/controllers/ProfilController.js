/**
 * Created by touremamadou on 13/09/2015.
 */

app.controller('ProfilController',['$scope','VilleService','QuartierService','$rootScope','UserService','Restangular',
                        function($scope,VilleService,QuartierService,$rootScope,UserService,Restangular){
    $scope.villes = VilleService.list().$object;
    $scope.quartiers = QuartierService.list().$object;

    UserService.get($rootScope.user.id).then(function(response){
        console.log(response);
        $scope.user = Restangular.restangularizeElement(response.parentResource,response.user,response.route);
    },function(response){
        errorRequest(response,$scope);
    })

    $scope.selectVille = function(ville){
        $scope.quartiers = ville.quartiers;
    };

    $scope.saveInfo = function(user){
        user.put().then(function(response){
            console.log(response);
        },function(){


        });
    };


}]);