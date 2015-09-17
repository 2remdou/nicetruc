/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MarqueController',['$scope','MarqueService',function($scope,MarqueService){
    $scope.marques = MarqueService.list().$object;
    $scope.marque = {};

    $scope.create = function(marque){
        MarqueService.create(marque);
        $scope.marque = {};
    };

    $scope.update = function(marque){
        marque.visible = !marque.visible;

    };

    $scope.valideUpdate = function(marque){
        marque.visible = !marque.visible;
        MarqueService.update(marque);

    };

    $scope.delete = function(marque){
      MarqueService.delete(marque);
    };


    $scope.$on('marque.create',function(){
       refreshList();
    });

    $scope.$on('marque.update',function(){
       refreshList();
    });

    $scope.$on('marque.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.marques = MarqueService.list().$object;
    }
}]);