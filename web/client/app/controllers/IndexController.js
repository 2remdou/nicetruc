/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('IndexController',['$scope','TokenHandler','$state','$rootScope',
                    function($scope,TokenHandler,$state,$rootScope)
{
    $scope.logout=function(){
        TokenHandler.clearCredentials();
        delete $rootScope.user;
        $state.go('nicetruc');
    };

    //$state.go('nicetruc.main');
}]);