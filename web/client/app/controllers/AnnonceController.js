/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('AnnonceController',['$scope','CategorieService',function($scope,CategorieService){
    $scope.categories = CategorieService.list().$object;

}]);