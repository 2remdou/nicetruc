/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ShowVoitureController',['$scope','$stateParams','usSpinnerService','$rootScope',
    'VoitureService','$state','ModalService','PostulantService',
    function($scope,$stateParams,usSpinnerService,$rootScope,VoitureService,$state,ModalService,PostulantService){

            
        if(!isDefined($stateParams.voitureId)){
            displayAlert('Voiture invalide','danger',$scope);
            return;
        }
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


        $scope.editVoiture = function(voitureId){
            $state.go('editVoiture',{voitureId:voitureId});
        };

        $scope.isAuthorizedEdit = function(userId){
            if(!$rootScope.user) return false;
            return $rootScope.user.id === userId;
        };

        $scope.manifesterInteret = function(){
            ModalService.showModal({
                templateUrl: 'client/app/views/manifesterInteret.html',
                controller: 'ManifesterInteretController'
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    usSpinnerService.spin('nt-spinner');
                   if(typeof  result === "object"){
                       var postulant = result;
                       postulant.idVoiture=$stateParams.voitureId;
                       PostulantService.add(postulant);
                   }
                });
            })
        };

        $scope.$on('added.postulant',function(event,args){
            displayAlert(args.message,'success',$scope);
            usSpinnerService.stop('nt-spinner');
        });

    }]);