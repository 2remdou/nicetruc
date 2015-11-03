/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('IndexController',['$scope','TokenHandler','$state',
                    function($scope,TokenHandler,$state)
{
    $scope.logout=function(){
        TokenHandler.clearCredentials();
        $state.go('nicetruc');
    };

    //$state.go('nicetruc.main');
}]);