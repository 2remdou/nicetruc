/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','FileUploader','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','ImageService','Upload',
    function($scope,FileUploader,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService,
             ImageService,Upload){

    $scope.marques = MarqueService.list().$object;
    $scope.modeleMarques = ModeleMarqueService.list().$object;
    $scope.carburants = CarburantService.list().$object;
    $scope.boitiers = BoitierService.list().$object;


    $scope.loadModele = function(marque){
        $scope.modeles=[];

        angular.forEach($scope.modeleMarques,function(modeleMarque){
            if(modeleMarque.marque.id===marque.id){
                $scope.modeles.push(modeleMarque.modele);
            }
        })
    };

    $scope.uploadFiles = function(files){
        $scope.files = files;

    };

    $scope.create = function(files,voiture){

        Upload.upload({
           url:'http://127.0.0.1:8000/app_dev.php/images',
            method: 'POST',
            file: files
        });
    };



    }]);