/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('VoitureService',['$rootScope','Restangular','InfoParametersService',
    function($rootScope,Restangular,InfoParametersService){

    var _voitureService = Restangular.all('voitures');
    var voituresEnVedette=[];
    var that = this;

    this.list = function(){
        return _voitureService.customGET(""); //Response for getList SHOULD be an array and not an object or something else
    };

    this.setVoituresEnVedette = function(voituresEnVedette){
        that.voituresEnVedette = voituresEnVedette;
        
    };

    this.getVoituresEnVedette = function(){
        if(InfoParametersService.isLoad())
            return that.voituresEnVedette;
        else{
            InfoParametersService.loadParameters();
        }
    };

    this.listVedette = function(){

        if(InfoParametersService.isLoad())
            return that.voituresEnVedette;
        else{
            InfoParametersService.loadParameters();
        }
    };

    this.listByUser= function(userId){
        return _voitureService.one('users',userId).get();
    };

    this.get = function(id){
        return _voitureService.one(id).get();
    }

    this.create = function(voiture){
        return _voitureService.post(voiture);
    };

    this.update = function(voiture){
        return voiture.put();
    };

    this.delete = function(voiture){
        voiture.remove().then(function(){
            $rootScope.$broadcast('voiture.delete');
        })
    };

    this.defineImagePrincipale  = function(voitures){
        angular.forEach(voitures,function(voiture){
            if(!voiture.imagePrincipale){
                voiture.imagePrincipale = {downloadUrl: voiture.defaultPathImagePrincipale,imageName: "defaultVoiture.jpg"};
            }
        });
        return voitures;
    };

    this.getIdVoituresEnVedette = function(voitures){
        var liste=[];
        angular.forEach(voitures,function(voiture){
            if(voiture.isVedette){
                liste.push(voiture);
            }
        });
        return liste;
    };

    this.postVoitureEnVedette = function(voiture){

        return _voitureService.customPUT({isVedette:voiture.isVedette},'vedette/'+voiture.id);
    };

}]);