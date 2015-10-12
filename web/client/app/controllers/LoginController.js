/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('LoginController',['$scope','BoitierService',function($scope,BoitierService){
    $scope.boitiers = BoitierService.list().$object;
    $scope.boitier = {};

    $scope.create = function(boitier){
        BoitierService.create(boitier);
        $scope.boitier = {};
    };

    $scope.update = function(boitier){
        boitier.visible = !boitier.visible;

    };

    $scope.valideUpdate = function(boitier){
        boitier.visible = !boitier.visible;
        BoitierService.update(boitier);

    };

    $scope.delete = function(boitier){
      BoitierService.delete(boitier);
    };


    $scope.$on('boitier.create',function(){
       refreshList();
    });

    $scope.$on('boitier.update',function(){
       refreshList();
    });

    $scope.$on('boitier.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.boitiers = BoitierService.list().$object;
    }
}]);