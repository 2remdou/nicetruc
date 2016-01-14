/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('NavController',['$scope','AuthService','$state','$rootScope',
                    function($scope,AuthService,$state,$rootScope)
{
    $scope.logout=function(){
        AuthService.logout();
        $state.go('nicetruc');
    };

    $scope.isEnabled = function(){
    	if($rootScope.user){
    		return $rootScope.user.enabled;
    	}
    	return true;
    };

    //$state.go('nicetruc.main');
}]);