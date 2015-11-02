/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ImageAnnonceVoitureController',['$scope','FileUploader','VoitureService','$stateParams','$rootScope',
    '$q','usSpinnerService','$state',
    function($scope,FileUploader,VoitureService,$stateParams,$rootScope,$q,usSpinnerService,$state){

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
            usSpinnerService.spin('nt-spinner');
            uploader.uploadAll();
        };

        uploader.onCompleteAll = function() {
            usSpinnerService.stop('nt-spinner');
            var response={};
            response.data = [{texte:"Telechargement effectué avec succès",'typeAlert':'success'}];
            successRequest(response,$scope);
            $state.go('nicetruc.editVoiture',{voitureId:$stateParams.voitureId});
        };

    }]);