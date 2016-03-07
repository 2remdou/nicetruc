    /**
 * Created by touremamadou on 13/09/2015.
 */

app.controller('ProfilController',
    ['$scope','VilleService','QuartierService','$rootScope','UserService',
        'Restangular','$state','usSpinnerService','AuthService',
        function($scope,VilleService,QuartierService,$rootScope,UserService,
            Restangular,$state,usSpinnerService,AuthService){
            
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

            $scope.saveInfo = function(user,formIsValid){
                $scope.formSubmit = true;
                if(!formIsValid) return;
                usSpinnerService.spin('nt-spinner');
                user.put().then(function(response){
                    AuthService.authenticated(response);
                    displayAlert(response.data.textAlert,response.data.typeAlert,$scope);
                    usSpinnerService.stop('nt-spinner');
                    $state.go('nicetruc');
                },function(response){
                    usSpinnerService.stop('nt-spinner');
                    successRequest(response,$scope);
                });
                $scope.formSubmit = false;
            };

            $scope.changePassword = function(user,formIsValid){
                $scope.passFormSubmit = true;
                if(!formIsValid) return;
                usSpinnerService.spin('nt-spinner');
                var newPass = UserService.changePassword(user);

                newPass.id=user.id;
                newPass.passwordActuel = user.passwordActuel;
                newPass.password = user.password;
                newPass.confirmationPassword = user.confirmationPassword;

                newPass.put().then(function(response){
                    AuthService.clear();
                    successRequest(response,$scope)
                    usSpinnerService.stop('nt-spinner');
                    $state.go('nicetruc');

                },function(response){
                    var message = response.data.data[0];
                    displayAlert(message.texte,message.typeAlert,$scope);
                    usSpinnerService.stop('nt-spinner');
                });
                $scope.passFormSubmit = false;
            }


}]);