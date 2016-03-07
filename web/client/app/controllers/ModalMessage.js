/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ModalMessageController',['$scope','texte','title','close',
    function($scope,texte,title,close){
        $scope.texte = texte;
        $scope.title = title;
        $scope.valider = function(result) {
            close(result, 500);
        };
    }]);

