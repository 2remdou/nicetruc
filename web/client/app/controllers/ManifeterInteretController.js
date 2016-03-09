/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ManifesterInteretController',['$scope','postulant','usSpinnerService','$element','close',
    function($scope,postulant,usSpinnerService,$element,close){

        $scope.postulant = postulant;
        $scope.close = function(result){
            $element.modal('hide');
            close(result,500);
        };

        $scope.send = function(postulant,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;
            $element.modal('hide');
            close(postulant,500);


            $scope.formSubmit = false;
        };


}]);