/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ModalConfirmationController',['$scope','close',
    function($scope,close){
        $scope.close = function(result) {
            close(result, 500);
        };
    }]);

