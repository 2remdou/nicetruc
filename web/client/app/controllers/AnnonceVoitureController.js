/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','FileUploader','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','ImageService',
    function($scope,FileUploader,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService,ImageService){

    $scope.marques = MarqueService.list().$object;
    $scope.modeleMarques = ModeleMarqueService.list().$object;
    $scope.carburants = CarburantService.list().$object;
    $scope.boitiers = BoitierService.list().$object;

    var uploader = $scope.uploader = new FileUploader({
        url:'http://127.0.0.1:8000/app_dev.php/images/'
    });


    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

        $scope.loadModele = function(marque){
            $scope.modeles=[];

            angular.forEach($scope.modeleMarques,function(modeleMarque){
                if(modeleMarque.marque.id===marque.id){
                    $scope.modeles.push(modeleMarque.modele);
                }
            })
        };

        $scope.create = function(voiture){
            uploader.uploadAll();
        }


    }]);