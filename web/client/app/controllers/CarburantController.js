/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('CarburantController',['$scope','CarburantService',function($scope,CarburantService){
    $scope.carburants = CarburantService.list().$object;
    $scope.carburant = {};

    $scope.create = function(carburant){
        CarburantService.create(carburant);
        $scope.carburant = {};
    };

    $scope.update = function(carburant){
        carburant.visible = !carburant.visible;

    };

    $scope.valideUpdate = function(carburant){
        carburant.visible = !carburant.visible;
        CarburantService.update(carburant);

    };

    $scope.delete = function(carburant){
      CarburantService.delete(carburant);
    };


    $scope.$on('carburant.create',function(){
       refreshList();
    });

    $scope.$on('carburant.update',function(){
       refreshList();
    });

    $scope.$on('carburant.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.carburants = CarburantService.list().$object;
    }
}]);