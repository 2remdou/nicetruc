/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('EditVoitureController',['$scope','MarqueService','ModeleService',
    'CarburantService','BoitierService','ModeleMarqueService','VoitureService','$rootScope',
    '$state','usSpinnerService','$stateParams','FileUploader','ImageService','InfoParametersService',
    function($scope,MarqueService,ModeleService,CarburantService,BoitierService,ModeleMarqueService
        ,VoitureService,$rootScope,$state,usSpinnerService,$stateParams,FileUploader,ImageService,InfoParametersService){

        $scope.$emit('parameters.started.load');


        $scope.$on('parameters.completed.load',function(){
            $scope.marques = $rootScope.marques;
            $scope.modeles = $rootScope.modeles;
            $scope.boitiers = $rootScope.boitiers;
            $scope.carburants = $rootScope.carburants;
            $scope.voituresEnVedette = $rootScope.voituresEnVedette;
            usSpinnerService.stop('nt-spinner');
        });

        var imagesASupprimer = []; //les images à supprimer

        uploader=$scope.uploader = new FileUploader({
            url : Routing.generate('nicetruc_image',{id:$stateParams.voitureId})
        });

        usSpinnerService.spin('nt-spinner');

        VoitureService.get($stateParams.voitureId).then(function(responseVoiture){
            $scope.voiture = responseVoiture;

            if(responseVoiture.user.id !== $rootScope.user.id){
                displayAlert("Vous ne disposez des autorisations neccessaires pour modifier cette annonce",'danger',$scope);
                $state.go('showVoiture',{voitureId:$stateParams.voitureId});
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
            $scope.voiture.modele = $scope.voiture.modeleMarque.modele;

            usSpinnerService.stop('nt-spinner');
        });



        $scope.selectMarque = function(marque){
            if(!marque) return;
            $scope.modeles=marque.modeles;
        };

        

        $scope.update = function(voiture,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;
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
                    $state.go('showVoiture',{voitureId:idVoiture});
                }
            },function(error){
                var response={};
                response.data = [{texte:"Erreur lors de la modification de l'annonce",'typeAlert':'danger'}];
                successRequest(response,$scope);
                usSpinnerService.stop('nt-spinner');
            });
            $scope.formSubmit = false;
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
            $state.go('showVoiture',{voitureId:$stateParams.voitureId});
        };

        $scope.isAuthorized = function(){
            if(!$rootScope.isAuthenticated()) return false;
            return $scope.voiture.user.id === $rootScope.user.id;
        }
    }]);