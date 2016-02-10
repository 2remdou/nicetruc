/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('InscriptionController',['$scope','InscriptionService','usSpinnerService',
                                    '$state','UserService','AuthService',
                                function($scope,InscriptionService,usSpinnerService,$state,
                                    UserService,AuthService){


    $scope.create = function(user,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        AuthService.clear();
            InscriptionService.create(user).then(function(response){
                AuthService.authenticated(response);
                UserService.refresh();
                displayAlert('Creation de compte reussie','info',$scope);
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
                 $state.go('nicetruc');
            },function(response){
                AuthService.clear();
                displayAlert('Erreur lors de la creation du compte','danger',$scope);
                usSpinnerService.stop('nt-spinner');
            });
        $scope.formSubmit = false;
    }
}]);