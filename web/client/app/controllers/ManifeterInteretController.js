/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ManifesterInteretController',['$scope','usSpinnerService','close',
    function($scope,usSpinnerService,close){

        $scope.close = function(result){
            log('fermer');
            close(result,200);
        };

        $scope.send = function(postulant,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;

            close(postulant,200);


            $scope.formSubmit = false;
        };


}]);