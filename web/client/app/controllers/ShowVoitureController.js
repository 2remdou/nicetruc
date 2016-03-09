/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ShowVoitureController',['$scope','$stateParams','usSpinnerService','$rootScope',
    'VoitureService','$state','ModalService','PostulantService',
    function($scope,$stateParams,usSpinnerService,$rootScope,VoitureService,$state,ModalService,PostulantService){

        $scope.finishedLoading = false;

        if(!isDefined($stateParams.voitureId) || $stateParams.voitureId.length===0){
            displayAlert('Voiture invalide','danger',$scope);
            return;
        }
        usSpinnerService.spin('nt-spinner');
        VoitureService.get($stateParams.voitureId).then(function(response){
            $scope.voiture = response;
            $scope.finishedLoading = true;
            usSpinnerService.stop('nt-spinner');
        },function(error){
            $rootScope.$broadcast('show.error',{alert:error.data});
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


        $scope.editVoiture = function(voitureId){
            $state.go('editVoiture',{voitureId:voitureId});
        };

        $scope.isAuthorizedEdit = function(userId){
            if(!$rootScope.user) return false;
            return $rootScope.user.id === userId;
        };

        $scope.manifesterInteret = function(){
            PostulantService.manifesterInteret($scope.voiture);
        };

        $scope.listePostulant = function(postulants){
            if(postulants.length===0){
                displayAlert('Aucun postulant pour cette annonce encore','info',$scope);
                return;
            }
            PostulantService.listePostulant(postulants);
        };

        $scope.$on('added.postulant',function(event,args){
            displayAlert(args.alert.textAlert,args.alert.typeAlert,$scope);
            usSpinnerService.stop('nt-spinner');
        });

    }]);