/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('SearchService',['$rootScope','Restangular',
    function($rootScope,Restangular){
        var _searchService = Restangular.all('search/');
        var that = this;
        var listeResult = [];

        this.searchWord = function(keySearch){
            return _searchService.one('word').customGET(keySearch);
        };

        this.advancedSearch = function(search){
            return _searchService.one('advancedSearch').customPOST(search);
        };

        this.getListResult = function(){
            return that.listeResult;
        };

        this.setListResult = function(listeResult){
            that.listeResult  = listeResult;
        };


    }]);