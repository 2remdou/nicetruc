/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('BoitierService',['$rootScope','Restangular','InfoParametersService',
    function($rootScope,Restangular,InfoParametersService){

    var _boitierService = Restangular.all('boitiers/');
    var boitiers=[];


    this.getBoitiers = function(){
        if(InfoParametersService.isLoad())
            return that.boitiers;
        else{
            InfoParametersService.loadParameters();
        }
    };

    this.setBoitiers = function(boitiers){
        that.boitiers = boitiers;
    };

    this.list = function(){
        $rootScope.$broadcast('boitier.list');
        return _boitierService.getList();
    }

    this.create = function(boitier){
        return _boitierService.post(boitier).then(function(){
            $rootScope.$broadcast('boitier.create');
        });
    };

    this.update = function(boitier){
        boitier.put().then(function(){
           $rootScope.$broadcast('boitier.update');
        });
    };

    this.delete = function(boitier){
        boitier.remove().then(function(){
            $rootScope.$broadcast('boitier.delete');
        })
    }
}]);