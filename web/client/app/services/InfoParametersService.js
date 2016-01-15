/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('InfoParametersService',['Restangular','$injector','$rootScope',
    function(Restangular,$injector,$rootScope){

    var _infoParametersService = Restangular.all('parameters');
    var load=false;

    var that=this;

    this.setLoad = function(load){
        that.load=load;
    };

    this.isLoad = function(){
        return that.load;
    };

    this.loadParameters = function(){
        var MarqueService = $injector.get('MarqueService');
        if(that.isLoad()){
            $rootScope.$broadcast('parameters.already.load');
        }
        else{
            that.load=true;
            return _infoParametersService.customGET().then(function(response){
                var data = response.data;
                //var MarqueService = $injector.get('MarqueService');
                MarqueService.setMarques(data.marques);

                var BoitierService = $injector.get('BoitierService'); 
                BoitierService.setBoitiers(data.boitiers);

                var CarburantService = $injector.get('CarburantService');
                CarburantService.setCarburants(data.carburants);

                angular.forEach(data.voituresEnVedette,function(voiture){
                    if(!voiture.imagePrincipale){
                        voiture.imagePrincipale = {downloadUrl: voiture.defaultPathImagePrincipale,imageName: "defaultVoiture.jpg"};
                    }
                });
                var VoitureService = $injector.get('VoitureService');
                VoitureService.setVoituresEnVedette(data.voituresEnVedette);

                $rootScope.$broadcast('parameters.completed.load');
            });
        }
    };

    $rootScope.$on('parameters.started.load',function(){
        that.loadParameters();          
    });

}]);