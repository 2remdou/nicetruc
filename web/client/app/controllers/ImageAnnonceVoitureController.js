/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ImageAnnonceVoitureController',['$scope','FileUploader','VoitureService','$stateParams','$rootScope',
    '$q','usSpinnerService','$state',
    function($scope,FileUploader,VoitureService,$stateParams,$rootScope,$q,usSpinnerService,$state){

        var errorItems=[];
        var successItems=[];

        VoitureService.get($stateParams.voitureId).then(function(response){
            $scope.voiture = response;
        });

        uploader=$scope.uploader = new FileUploader({
            url : Routing.generate('nicetruc_image',{id:$stateParams.voitureId})
        });

        $scope.uploadImage = function(uploader){
            errorItems=[];
            success=[];
            usSpinnerService.spin('nt-spinner');
            uploader.uploadAll();
        };

        uploader.onCompleteItem = function(item, response, status, headers){
            if(item.isError){
                errorItems.push(item);
            }
            else{
                successItems.push(item);
            }
        };

        uploader.onCompleteAll = function() {
            if(errorItems.length === 0){
                displayAlert("Telechargement effectué avec succès",'success',$scope);
                $state.go('showVoiture',{voitureId:$stateParams.voitureId});
            }

            usSpinnerService.stop('nt-spinner');
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