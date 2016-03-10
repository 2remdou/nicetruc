/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ListePostulantController',['$scope','postulants','usSpinnerService','$element','close',
    function($scope,postulants,usSpinnerService,$element,close){

        $scope.postulants = postulants;
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

        $scope.disabled = function(postulant){

        }


}]);