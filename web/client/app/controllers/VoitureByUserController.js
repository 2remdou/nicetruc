/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoitureByUserController',
    ['$scope','usSpinnerService','VoitureService','$state','$stateParams','$rootScope',
    function($scope,usSpinnerService,VoitureService,$state,$stateParams,$rootScope){

        var idUser;
        if(!isDefined($stateParams.idUser)){//si idUser n'est passé en parametre
            if(!isDefined($rootScope.user)){ // si l'utilisateur n'est pas connecté
                return;
            }
            else{
                idUser=$rootScope.user.id;//liste des voitures du user connecté
            }
        }
        else{
            idUser=$stateParams.idUser;//liste des voitures d'un autre user
        }
        usSpinnerService.spin('nt-spinner');

        $scope.$emit('started.load.listvoiturebyuser',{idUser:idUser});

        $scope.$on('completed.load.listvoiturebyuser',function(event,args){
            $scope.voitures=args.voitures;
            if($scope.voitures.length===0){
                displayAlert("Aucune Annonce pour le moment pour cet utilisateur",'info',$scope);
            }else{
                $scope.user = args.user;
            }
            usSpinnerService.stop('nt-spinner');
        });

        $scope.showVoiture = function(voitureId){
            $state.go('showVoiture',{voitureId:voitureId});
        };

        $scope.disabled = function(voiture){
            usSpinnerService.spin('nt-spinner');
          VoitureService.disabledVoiture(voiture).then(function(response){
              voiture.isPublish=false;
              displayAlert('Votre annonce a été desactivé','success',$scope);
              usSpinnerService.stop('nt-spinner');
          },function(error){
              log(error);
          });
        };

    }]);

