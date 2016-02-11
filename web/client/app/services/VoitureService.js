/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('VoitureService',['$rootScope','Restangular','InfoParametersService',
    function($rootScope,Restangular,InfoParametersService){
        var _voitureService = Restangular.all('voitures/');
        var voituresEnVedette=[];
        var zoneDeRecherche=[];
        var that = this;
        var nextPage=1;
        this.list = function(){
            return _voitureService.customGET(""); //Response for getList SHOULD be an array and not an object or something else
        };

        this.listWithPagination = function(){
            return _voitureService.one('page',nextPage).get();
        };

        this.paging = function(page){
            return _voitureService.one('page',page).get();
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
        this.getZoneDeRecherche = function(){
            return that.zoneDeRecherche;
        };

        this.setZoneDeRecherche = function(zoneDeRecherche){
            that.zoneDeRecherche = zoneDeRecherche;
        };

        this.listVedette = function(){
            return _voitureService.one('voituresEnVedette').customGET("");
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

        this.getNextPage = function(){
            return  nextPage;
        };

        this.setNextPage = function($nextPage){
            nextPage=parseInt($nextPage);
        };

        this.simpleSearch = function(keySearch){
            return _voitureService.one('search').customGET(keySearch);
        };

        this.advancedSearch = function(search){
            return _voitureService.one('advancedSearch').customPOST(search);
        };


    }]);