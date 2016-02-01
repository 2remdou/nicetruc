/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('InfoParametersService',['Restangular','$rootScope','$injector',
    function(Restangular,$rootScope,$injector){

        var that=this;
        var _infoParametersService = Restangular.all('parameters');
        var load=false;
        var parameters={};

    this.setLoad = function(load){
        that.load=load;
    };

    this.isLoad = function(){
        return that.load;
    };

    this.loadParameters = function(){
        if(!that.load){
            MarqueService = $injector.get('MarqueService');
            ModeleService = $injector.get('ModeleService');
            BoitierService = $injector.get('BoitierService');
            CarburantService = $injector.get('CarburantService');
            that.load=true;
            return _infoParametersService.customGET().then(function(response){
                var data = response.data;

                angular.forEach(data.voituresEnVedette,function(voiture){
                    if(!voiture.imagePrincipale){
                        voiture.imagePrincipale = {downloadUrl: voiture.defaultPathImagePrincipale,imageName: "defaultVoiture.jpg"};
                    }
                });
                $rootScope.marques = Restangular.restangularizeCollection(null,data.marques,'marques/');
                MarqueService.setMarques($rootScope.marques);

                $rootScope.modeles=Restangular.restangularizeCollection(null,data.modeles,'modeles/');
                ModeleService.setModeles($rootScope.modeles);

                $rootScope.boitiers=Restangular.restangularizeCollection(null,data.boitiers,'boitiers/');
                BoitierService.setBoitiers($rootScope.boitiers);

                $rootScope.carburants=Restangular.restangularizeCollection(null,data.carburants,'carburants/');
                CarburantService.setCarburants($rootScope.carburants);
                
                $rootScope.voituresEnVedette=data.voituresEnVedette;
                $rootScope.$broadcast('parameters.completed.load');
            });
        }
        else{
            //actualisation de la liste de voitures en vedette
            VoitureService = $injector.get('VoitureService');
            VoitureService.listVedette().then(function(response){
                $rootScope.voituresEnVedette=response.data;
                $rootScope.$broadcast('parameters.completed.load');
            },function(error){
                log(error);
            })
        }

    };

    $rootScope.$on('parameters.started.load',function(){
        that.loadParameters();
    });

}]);