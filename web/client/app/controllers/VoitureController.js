/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoitureController',['$scope','MarqueService','ModeleService','CarburantService','BoitierService','ModeleMarqueService',
                function($scope,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService){

    $scope.marques = MarqueService.list().$object;
    $scope.modeleMarques = ModeleMarqueService.list().$object;
    $scope.carburants = CarburantService.list().$object;
    $scope.boitiers = BoitierService.list().$object;


    $scope.loadModele = function(marque){
        var res= _.find($scope.modeleMarques,function(modeleMarque){
            if(modeleMarque.marque.hasOwnProperty('id')){
                return modeleMarque.marque.id === marque.id;
            }
        });
        console.log(res);
    };

    }]);