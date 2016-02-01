/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('MarqueService',['$rootScope','Restangular','InfoParametersService',
    function($rootScope,Restangular,InfoParametersService){
    var _marqueService = Restangular.all('marques/');
    var that=this;
    var marques=[];
    var load=false;
    var nextPage=1;

    this.list = function(){
        return _marqueService.getList();
    };

    this.listWithPagination = function(){
        return _marqueService.one('page',nextPage).get();
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
        if(that.marques){
            return that.marques.filter(function(marque){
                return marque.id == id;
            })[0].modeles
                ;
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
    };

    this.getNextPage = function(){
        return  nextPage;
    };

    this.setNextPage = function($nextPage){
        nextPage=parseInt($nextPage);
    };
}]);