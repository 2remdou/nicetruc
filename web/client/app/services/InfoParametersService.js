/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('InfoParametersService',['Restangular','$rootScope',
    function(Restangular,$rootScope){

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
        if(!load){
            load=true;
            return _infoParametersService.customGET().then(function(response){

                var data = response.data;

                angular.forEach(data.voituresEnVedette,function(voiture){
                    if(!voiture.imagePrincipale){
                        voiture.imagePrincipale = {downloadUrl: voiture.defaultPathImagePrincipale,imageName: "defaultVoiture.jpg"};
                    }
                });

                $rootScope.marques=data.marques;
                $rootScope.modeles=data.modeles;
                $rootScope.boitiers=data.boitiers;
                $rootScope.carburants=data.carburants;
                $rootScope.voituresEnVedette=data.voituresEnVedette;
                $rootScope.$broadcast('parameters.completed.load');
            });
        }
        else{
            $rootScope.$broadcast('parameters.completed.load');
        }

    };

    $rootScope.$on('parameters.started.load',function(){
        that.loadParameters();
    });

}]);