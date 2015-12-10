/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('NavController',['$scope','TokenHandler','$state','$rootScope',
                    function($scope,TokenHandler,$state,$rootScope)
{
    $scope.logout=function(){
        TokenHandler.clearCredentials();
        delete $rootScope.user;
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