/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','$rootScropt','AuthHandler',function($scope,$rootScope,AuthHandler){

    $rootScope.isAuthenticated = function(){
      return typeof AuthHandler.email() != 'undefined';
    };
}]);