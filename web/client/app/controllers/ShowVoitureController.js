/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ShowVoitureController',['$scope','$stateParams','usSpinnerService','$rootScope','VoitureService','$state',
    function($scope,$stateParams,usSpinnerService,$rootScope,VoitureService,$state){

            usSpinnerService.spin('nt-spinner');
        VoitureService.get($stateParams.voitureId).then(function(response){
            $scope.voiture = response;
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

        $scope.editVoiture = function(voitureId){
            $state.go('editVoiture',{voitureId:voitureId});
        };

        $scope.isAuthorizedEdit = function(userId){
            return $rootScope.user.id === userId;
        };

    }]);