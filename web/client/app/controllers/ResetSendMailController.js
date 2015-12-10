/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ResetSendMailController',['$scope','usSpinnerService','UserService',
    function($scope,usSpinnerService,UserService){

    $scope.sendMail = function(email,formIsValid){
        $scope.formSubmit = true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');

        UserService.resetMail(email).then(function(response) {
            displayAlert('Nous avons les instructions de réinitialisation dans votre boite mail','info',$scope);
            usSpinnerService.stop('nt-spinner');
        },function(response){
            angular.forEach(response.data.data, function(message){
                displayAlert(message.texte,message.typeAlert,$scope);
            });
            usSpinnerService.stop('nt-spinner');
        });
        
        $scope.formSubmit = false;
    };

    
    
}]);