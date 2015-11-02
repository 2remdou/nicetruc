/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ImageAnnonceVoitureController',['$scope','FileUploader','VoitureService','$stateParams','$rootScope','$q','usSpinnerService',
    function($scope,FileUploader,VoitureService,$stateParams,$rootScope,$q,usSpinnerService){

        if(!$rootScope.hasAuthorized()){
            $state.go('nicetruc.login');
            return;
        }

        VoitureService.get($stateParams.voitureId).then(function(response){
            $scope.voiture = response;
        });

        uploader=$scope.uploader = new FileUploader({
            url : Routing.generate('nicetruc_image',{id:$stateParams.voitureId})
        });

        $scope.uploadImage = function(uploader){
            uploader.uploadAll();
        };

        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };


        $scope.start = function(){
            console.log("start");
            usSpinnerService.spin('nt-spinner')
        };

        $scope.stop = function(){
            usSpinnerService.stop('nt-spinner')
        };


    }]);