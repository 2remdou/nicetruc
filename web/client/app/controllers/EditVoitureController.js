/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('EditVoitureController',['$scope','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','VoitureService','$rootScope',
    '$state','usSpinnerService','$stateParams','FileUploader','ImageService',
    function($scope,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService
        ,VoitureService,$rootScope,$state,usSpinnerService,$stateParams,FileUploader,ImageService){

        $scope.marques= MarqueService.list().$object;
        $scope.modeleMarques = ModeleMarqueService.list().$object;
        $scope.carburants= CarburantService.list().$object;
        $scope.boitiers = BoitierService.list().$object;

        var imagesASupprimer = []; //les images à supprimer

        uploader=$scope.uploader = new FileUploader({
            url : Routing.generate('nicetruc_image',{id:$stateParams.voitureId})
        });

        usSpinnerService.spin('nt-spinner');

        $scope.modeles = [];
        VoitureService.get($stateParams.voitureId).then(function(responseVoiture){
            $scope.voiture = responseVoiture;

            if(responseVoiture.user.id !== $rootScope.user.id){
                displayAlert("Vous ne disposez des autorisations neccessaires pour modifier cette annonce",'danger',$scope);
                $state.go('nicetruc.showVoiture',{voitureId:$stateParams.voitureId});
            }

            //definition de l'image principale
            angular.forEach($scope.voiture.images,function(value){
               if(_.isEqual($scope.voiture.imagePrincipale,value)){
                   value.isImagePrincipale=true;
               }
               else{
                   value.isImagePrincipale=false;
               }
            });

            $scope.voiture.marque = $scope.voiture.modeleMarque.marque;
            $scope.modeles=$scope.voiture.modeleMarque.marque.modeles;
            $scope.voiture.modele = $scope.voiture.modeleMarque.modele;

            usSpinnerService.stop('nt-spinner');
        });



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


        $scope.update = function(voiture){
            usSpinnerService.stop('nt-spinner');
            usSpinnerService.spin('nt-spinner');
            voiture.modeleMarque= typeof $scope.modeleMarque=="undefined"? voiture.modeleMarque:$scope.modeleMarque;
            voiture.categorie = 1; //voiture

            voiture.route=""; // enlever l'id de la voiture dans l'url pour eviter (/api/voitures/11/11)
            VoitureService.update(voiture).then(function(){

                var idVoiture = $stateParams.voitureId;

                //suppression des images
                angular.forEach(imagesASupprimer,function(value){
                   ImageService.delete(value);
                });


                uploader.uploadAll(); //upload des nouvelles images

                if(uploader.queue.length===0){ // pas de nouvelles images, sinon on attend onCompleteAll
                    var response={};
                    response.data = [{texte:"Votre annonce a été modifié",'typeAlert':'success'}];
                    successRequest(response,$scope);
                    usSpinnerService.stop('nt-spinner');
                    $state.go('nicetruc.showVoiture',{voitureId:idVoiture});
                }
            },function(error){
                var response={};
                response.data = [{texte:"Erreur lors de la modification de l'annonce",'typeAlert':'danger'}];
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
            });

        };

        $scope.selectImagePrincipale = function(image){
            image.isImagePrincipale=true;
            $scope.voiture.imagePrincipale=image;
            
            angular.forEach($scope.uploader.queue,function(value){
                if(!_.isEqual(image,value)){
                    value.isImagePrincipale=false;
                }
            });
            angular.forEach($scope.voiture.images,function(value){
                if(!_.isEqual(image,value)){
                    value.isImagePrincipale=false;
                }
            });

        };

        $scope.removeImage = function(image){
            imagesASupprimer.push(image);
        };

        uploader.onAfterAddingFile = function(item){
            if($scope.uploader.queue.length===1 && !$scope.voiture.imagePrincipale){
                item.isImagePrincipale=true;
            }
            else{
                item.isImagePrincipale=false;
            }
        };

        uploader.onBeforeUploadItem = function(item) {
            if(item.isImagePrincipale) item.formData.push({isImagePrincipale: item.isImagePrincipale});
        };

        uploader.onCompleteAll = function() {
            usSpinnerService.stop('nt-spinner');
            var response={};
            response.data = [{texte:"Votre annonce a été modifié",'typeAlert':'success'}];
            successRequest(response,$scope);
            $state.go('nicetruc.showVoiture',{voitureId:$stateParams.voitureId});
        };

        $scope.isAuthorized = function(){
            log("ddd");
            if(!$rootScope.isAuthenticated()) return false;
            return $scope.voiture.user.id === $rootScope.user.id;
        }



    }]);