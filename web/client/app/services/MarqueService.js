/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('MarqueService',['$rootScope','Restangular','InfoParametersService',
    function($rootScope,Restangular,InfoParametersService){

    var _marqueService = Restangular.all('marques/');
    var marques=[];
    var load=false;
    that=this;

    this.list = function(){
        return _marqueService.getList();
    };

    this.setLoad = function(load){
        that.load=load;
    };

    this.isLoad = function(){
        return that.load;
    };

    this.getMarques = function(){
        if(InfoParametersService.isLoad())
            return that.marques;
        else{
            InfoParametersService.loadParameters();
        }
    };

    this.setMarques = function(marques){
        that.marques = marques;
    };

    this.getModeleByMarque = function(id){
        if($rootScope.marques){
            angular.forEach($rootScope.marques, function(marque){
                if(marque.id==id){
                    log(id+"et"+marque.id);
                    log(marque);
                    return marque.modeles;
                }
            });
            return;
        }
    };

    this.create = function(marque){
        _marqueService.post(marque).then(function(){
            $rootScope.$broadcast('marque.create');
        });
    };

    this.update = function(marque){
        marque.put().then(function(){
           $rootScope.$broadcast('marque.update');
        });
    };

    this.delete = function(marque){
        marque.remove().then(function(){
            $rootScope.$broadcast('marque.delete');
        })
    }
}]);