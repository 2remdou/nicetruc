/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('NavController',['$scope','AuthService','$state','$rootScope','usSpinnerService','VoitureService','SearchService',
                    function($scope,AuthService,$state,$rootScope,usSpinnerService,VoitureService,SearchService)
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
        $scope.voitures=[];
        if(!keySearch){
               keySearch=''
            }

        SearchService.searchWord(keySearch).then(function(response){

                $scope.voitures=VoitureService.defineImagePrincipale(response.data.voitures);
                SearchService.setListResult($scope.voitures);
                usSpinnerService.stop('nt-spinner');
                $state.go('searchVoiture');
            },function(error){
                if(error.status === 404){
                    displayAlert('Aucune voiture ne correspond à votre recherche','info',$scope);
                }
                SearchService.setListResult([]);
                usSpinnerService.stop('nt-spinner');
            })
    }


    //$state.go('nicetruc.main');
}]);