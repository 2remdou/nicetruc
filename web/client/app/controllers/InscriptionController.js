/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('InscriptionController',['$scope','InscriptionService','usSpinnerService','$cookies',
                                    '$rootScope','$state','TokenHandler','Digest',
                                function($scope,InscriptionService,usSpinnerService,$cookies,$rootScope,$state,TokenHandler,Digest){


    $scope.create = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        TokenHandler.clearCredentials();
        usSpinnerService.spin('nt-spinner');
            InscriptionService.create(user).then(function(response){
                $rootScope.user = response.user;
                Digest.cipher(user.password,$rootScope.user.salt).then(function(secret){
                    $cookies.put('email',response.user.email);
                    $cookies.put('secret', secret);
                    $cookies.putObject('user',$rootScope.user);

                    successRequest(response,$scope);

                    usSpinnerService.stop('nt-spinner');
                    $state.go('nicetruc');
                });
            },function(response){
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
            });
        $scope.formSubmit = false;
    }
}]);