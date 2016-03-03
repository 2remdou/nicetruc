/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ManifesterInteretController',['$scope','usSpinnerService','$element','close',
    function($scope,usSpinnerService,$element,close){

        $scope.close = function(result){
            close(result,200);
        };

        $scope.send = function(postulant,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;
            $element.modal('hide');
            close(postulant,200);


            $scope.formSubmit = false;
        };


}]);