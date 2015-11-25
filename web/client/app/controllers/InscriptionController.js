/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('InscriptionController',['$scope','InscriptionService','usSpinnerService','$cookies','$rootScope','$state','TokenHandler',
                                function($scope,InscriptionService,usSpinnerService,$cookies,$rootScope,$state,TokenHandler){


    $scope.create = function(user){
        TokenHandler.clearCredentials();
        usSpinnerService.spin('nt-spinner');
            InscriptionService.create(user).then(function(response){
                successRequest(response,$scope);
                $cookies.put('email',response.user.email);

                $rootScope.user = response.user;

                usSpinnerService.stop('nt-spinner');
                $state.go('nicetruc');
            },function(response){
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
            });
    }
}]);