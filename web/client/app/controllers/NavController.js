/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('NavController',['$scope','AuthService','$state','$rootScope','usSpinnerService','VoitureService',
                    function($scope,AuthService,$state,$rootScope,usSpinnerService,VoitureService)
{
    $scope.logout=function(){
        AuthService.clear();
        $state.go('nicetruc');
    };

    $scope.isEnabled = function(){
    	if($rootScope.user){
    		return $rootScope.user.enabled;
    	}
    	return true;
    };

    $scope.searchVoiture = function(keySearch){
        usSpinnerService.spin('nt-spinner');
            if(!keySearch){
               keySearch=''
            }

            VoitureService.search(keySearch).then(function(response){
                log(response);
                $scope.voitures=VoitureService.defineImagePrincipale(response.data.voitures);
                usSpinnerService.stop('nt-spinner');
            },function(error){
                if(error.status === 404){
                    displayAlert('Aucune voiture ne correspond à votre recherche','info',$scope);
                }
                $scope.voitures=[];
                usSpinnerService.stop('nt-spinner');
            })
    }


    //$state.go('nicetruc.main');
}]);