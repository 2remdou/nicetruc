/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceVoitureController',['$scope','FileUploader','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','ImageService','VoitureService','$rootScope',
    '$state','CategorieService','Restangular','$q',
    function($scope,FileUploader,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService,
             ImageService,VoitureService,$rootScope,$state,CategorieService,Restangular,$q){

        if(!$rootScope.hasAuthorized()){
            $state.go('nicetruc.login');
            return;
        }

        uploader=$scope.uploader = new FileUploader({
            //url : Routing.generate('nicetruc_image')
        });


        $scope.marques = MarqueService.list().$object;
        $scope.modeleMarques = ModeleMarqueService.list().$object;
        $scope.carburants = CarburantService.list().$object;
        $scope.boitiers = BoitierService.list().$object;


        $scope.selectMarque = function(marque){
            $scope.marque=marque;
            $scope.modeles=[];

            angular.forEach($scope.modeleMarques,function(modeleMarque){
                if(modeleMarque.marque.id===marque.id){
                    $scope.modeles.push(modeleMarque.modele);
                }
            })
        };

        $scope.selectModele = function(modele){
            if(!modele){
                return;
            }
            $scope.modeleMarque = false;
            angular.forEach($scope.modeleMarques,function(modeleMarque){
                if(modeleMarque.marque.id===$scope.marque.id && modeleMarque.modele.id===modele.id){
                    $scope.modeleMarque=modeleMarque;
                }
            });
            if(!$scope.modeleMarque){
                message = [{texte:"Ce modele de voiture est invalide",'typeAlert':'danger'}];
                scope.$emit('showMessage',message);
                return;
            }
        };


        $scope.create = function(voiture){
            //var deferred = $q.defer();
            voiture.modeleMarque=$scope.modeleMarque;
            voiture.user = $rootScope.user.id;
            voiture.categorie = 1; //voiture
            VoitureService.create(voiture).then(function(response){

                var idVoiture = response.id;
                angular.forEach($scope.uploader.queue,function(value){
                   value.url= Routing.generate('nicetruc_image',idVoiture);
                });
                $scope.uploader.uploadAll();
                voiture={};
                response.data = [{texte:"Votre annonce a été ajouté avec succes",'typeAlert':'success'}];
                successRequest(response,$scope);
            });

        };

        $scope.uploadTest = function(uploader){
            angular.forEach($scope.uploader.queue,function(value){
                console.log(value);
            });
        };

    }]);