/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('CarburantService',['$rootScope','Restangular','InfoParametersService',
    function($rootScope,Restangular,InfoParametersService){

    var _carburantService = Restangular.all('carburants/');
    var carburants=[];
    var load=false;
    var that=this;


    this.setLoad = function(load){
        that.load=load;
    };

    this.isLoad = function(){
        return that.load;
    };

    this.getCarburants = function(){
        if(InfoParametersService.isLoad())
            return that.carburants;
        else{
            InfoParametersService.loadParameters();
        }
    };

    this.setCarburants = function(carburants){
        that.carburants = carburants;
    };

    this.list = function(){
        $rootScope.$broadcast('carburant.list');
        return _carburantService.getList();
    }

    this.create = function(carburant){
        _carburantService.post(carburant).then(function(){
            $rootScope.$broadcast('carburant.create');
        });
    };

    this.update = function(carburant){
        carburant.put().then(function(){
           $rootScope.$broadcast('carburant.update');
        });
    };

    this.delete = function(carburant){
        carburant.remove().then(function(){
            $rootScope.$broadcast('carburant.delete');
        })
    }
}]);