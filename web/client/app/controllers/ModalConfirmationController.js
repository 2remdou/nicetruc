/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ModalConfirmationController',['$scope','texte','close',
    function($scope,texte,close){
        $scope.texte = texte;
        $scope.close = function(result) {
            close(result, 500);
        };
    }]);

