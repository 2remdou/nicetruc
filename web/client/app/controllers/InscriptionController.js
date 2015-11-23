/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('InscriptionController',['$scope','InscriptionService','usSpinnerService','$cookies','$rootScope',
                                function($scope,InscriptionService,usSpinnerService,$cookies,$rootScope){


    $scope.create = function(user){
        usSpinnerService.spin('nt-spinner');
            InscriptionService.create(user).then(function(response){
                successRequest(response,$scope);
                $cookies.put('email',response.user.email);

                $rootScope.user = response.user;

                usSpinnerService.stop('nt-spinner');
                $state.go('nicetruc');
            },function(response){
                errorRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
            });
    }
}]);