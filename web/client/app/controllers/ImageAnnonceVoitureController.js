/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ImageAnnonceVoitureController',['$scope','FileUploader','VoitureService','$stateParams','$rootScope',
    '$q','usSpinnerService','$state',
    function($scope,FileUploader,VoitureService,$stateParams,$rootScope,$q,usSpinnerService,$state){

        VoitureService.get($stateParams.voitureId).then(function(response){
            $scope.voiture = response;
        });

        uploader=$scope.uploader = new FileUploader({
            url : Routing.generate('nicetruc_image',{id:$stateParams.voitureId})
        });

        $scope.uploadImage = function(uploader){
            usSpinnerService.spin('nt-spinner');
            uploader.uploadAll();
        };

        uploader.onCompleteAll = function() {
            usSpinnerService.stop('nt-spinner');
            var response={};
            response.data = [{texte:"Telechargement effectué avec succès",'typeAlert':'success'}];
            successRequest(response,$scope);
            $state.go('showVoiture',{voitureId:$stateParams.voitureId});
        };

        uploader.onBeforeUploadItem = function(item) {
            item.formData.push({isImagePrincipale: item.isImagePrincipale});
        };

        $scope.selectImagePrincipale = function(item){
            item.isImagePrincipale=true;
            angular.forEach($scope.uploader.queue,function(value){
                if(!_.isEqual(item,value)){
                    value.isImagePrincipale=false;
                }
            });

        };

        uploader.onAfterAddingFile = function(item){
            if($scope.uploader.queue.length===1){
                item.isImagePrincipale=true;
            }
            else{
                item.isImagePrincipale=false;
            }
        };

    }]);